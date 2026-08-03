
-- ============================================================
--  E-Commerce Churn Analytics — PostgreSQL Schema
--  Generated automatically from the ML notebook
-- ============================================================

-- Drop & recreate
DROP TABLE IF EXISTS model_predictions CASCADE;
DROP TABLE IF EXISTS customer_clusters  CASCADE;
DROP TABLE IF EXISTS customers          CASCADE;

-- ── Core customer table ──────────────────────────────────────
CREATE TABLE customers (
    customer_id                UUID         PRIMARY KEY,
    account_age_months         INTEGER      NOT NULL CHECK (account_age_months >= 0),
    avg_order_value            NUMERIC(10,2) NOT NULL,
    total_orders               INTEGER      NOT NULL CHECK (total_orders >= 0),
    days_since_last_purchase   INTEGER      NOT NULL CHECK (days_since_last_purchase >= 0),
    discount_usage_rate        NUMERIC(5,4) NOT NULL CHECK (discount_usage_rate BETWEEN 0 AND 1),
    return_rate                NUMERIC(5,4) NOT NULL CHECK (return_rate BETWEEN 0 AND 1),
    customer_support_tickets   INTEGER      NOT NULL DEFAULT 0,
    loyalty_member             BOOLEAN      NOT NULL DEFAULT FALSE,
    browsing_frequency_per_week NUMERIC(5,2) NOT NULL,
    cart_abandonment_rate      NUMERIC(5,4) NOT NULL CHECK (cart_abandonment_rate BETWEEN 0 AND 1),
    product_review_score_avg   NUMERIC(4,2),
    engagement_score           NUMERIC(5,2),
    satisfaction_score         NUMERIC(5,2),
    price_sensitivity_index    NUMERIC(4,2),
    -- Engineered features
    orders_per_month           NUMERIC(8,4) GENERATED ALWAYS AS
                                 (total_orders::NUMERIC / NULLIF(account_age_months,0)) STORED,
    engagement_x_satisfaction  NUMERIC(8,4) GENERATED ALWAYS AS
                                 (engagement_score * satisfaction_score) STORED,
    -- Target
    churned                    BOOLEAN      NOT NULL DEFAULT FALSE,
    -- Metadata
    created_at                 TIMESTAMPTZ  DEFAULT NOW(),
    updated_at                 TIMESTAMPTZ  DEFAULT NOW()
);

-- ── Customer segments / clusters ─────────────────────────────
CREATE TABLE customer_clusters (
    customer_id   UUID     PRIMARY KEY REFERENCES customers(customer_id) ON DELETE CASCADE,
    cluster_id    SMALLINT NOT NULL CHECK (cluster_id BETWEEN 0 AND 9),
    recency_bucket VARCHAR(10) CHECK (recency_bucket IN ('Hot','Warm','Cold','Dormant')),
    value_segment  VARCHAR(10) CHECK (value_segment   IN ('Low','Mid','High','Premium')),
    assigned_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── ML model predictions ─────────────────────────────────────
CREATE TABLE model_predictions (
    prediction_id    BIGSERIAL PRIMARY KEY,
    customer_id      UUID         NOT NULL REFERENCES customers(customer_id),
    model_name       VARCHAR(64)  NOT NULL,
    model_version    VARCHAR(32)  NOT NULL DEFAULT '1.0.0',
    churn_probability NUMERIC(6,5) NOT NULL CHECK (churn_probability BETWEEN 0 AND 1),
    predicted_churn  BOOLEAN      NOT NULL,
    threshold_used   NUMERIC(4,3) NOT NULL DEFAULT 0.500,
    predicted_at     TIMESTAMPTZ  DEFAULT NOW()
);

-- ── Indexes ──────────────────────────────────────────────────
CREATE INDEX idx_customers_churned         ON customers (churned);
CREATE INDEX idx_customers_loyalty         ON customers (loyalty_member);
CREATE INDEX idx_customers_satisfaction    ON customers (satisfaction_score);
CREATE INDEX idx_clusters_cluster_id       ON customer_clusters (cluster_id);
CREATE INDEX idx_predictions_customer      ON model_predictions (customer_id);
CREATE INDEX idx_predictions_model         ON model_predictions (model_name, predicted_at);
CREATE INDEX idx_predictions_churn_prob    ON model_predictions (churn_probability DESC);

-- ── Auto-update updated_at ───────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_customers_updated_at
    BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Dashboard Views ──────────────────────────────────────────
CREATE OR REPLACE VIEW vw_churn_kpis AS
SELECT
    COUNT(*)                                   AS total_customers,
    SUM(churned::INT)                          AS total_churned,
    ROUND(AVG(churned::INT) * 100, 2)          AS churn_rate_pct,
    ROUND(AVG(avg_order_value), 2)             AS avg_order_value,
    ROUND(AVG(satisfaction_score), 2)          AS avg_satisfaction,
    SUM(loyalty_member::INT)                   AS loyalty_members,
    ROUND(AVG(loyalty_member::INT) * 100, 2)   AS loyalty_pct
FROM customers;

CREATE OR REPLACE VIEW vw_churn_by_segment AS
SELECT
    cc.value_segment,
    cc.recency_bucket,
    COUNT(*)                                   AS n_customers,
    SUM(c.churned::INT)                        AS n_churned,
    ROUND(AVG(c.churned::INT) * 100, 2)        AS churn_rate_pct,
    ROUND(AVG(c.avg_order_value), 2)           AS avg_order_value,
    ROUND(AVG(c.satisfaction_score), 2)        AS avg_satisfaction
FROM customers c
JOIN customer_clusters cc USING (customer_id)
GROUP BY cc.value_segment, cc.recency_bucket
ORDER BY churn_rate_pct DESC;

CREATE OR REPLACE VIEW vw_high_risk_customers AS
SELECT
    c.customer_id,
    c.satisfaction_score,
    c.engagement_score,
    c.days_since_last_purchase,
    c.cart_abandonment_rate,
    p.churn_probability,
    cc.recency_bucket,
    cc.value_segment
FROM customers c
JOIN model_predictions p USING (customer_id)
JOIN customer_clusters cc USING (customer_id)
WHERE p.churn_probability >= 0.7
  AND p.model_name = 'random_forest'
ORDER BY p.churn_probability DESC;

CREATE OR REPLACE VIEW vw_cluster_summary AS
SELECT
    cc.cluster_id,
    COUNT(*)                             AS n_customers,
    ROUND(AVG(c.churned::INT)*100, 2)    AS churn_rate_pct,
    ROUND(AVG(c.avg_order_value), 2)     AS avg_order_value,
    ROUND(AVG(c.satisfaction_score), 2)  AS avg_satisfaction,
    ROUND(AVG(c.engagement_score), 2)    AS avg_engagement
FROM customers c
JOIN customer_clusters cc USING (customer_id)
GROUP BY cc.cluster_id
ORDER BY churn_rate_pct DESC;
