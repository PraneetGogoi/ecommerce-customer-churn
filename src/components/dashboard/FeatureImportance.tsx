import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const importanceData = [
  { feature: "engagement_score", importance: 0.168 },
  { feature: "days_since_purchase", importance: 0.152 },
  { feature: "satisfaction_score", importance: 0.131 },
  { feature: "cart_abandonment", importance: 0.098 },
  { feature: "total_orders", importance: 0.089 },
  { feature: "avg_order_value", importance: 0.082 },
  { feature: "discount_usage", importance: 0.071 },
  { feature: "price_sensitivity", importance: 0.068 },
  { feature: "browsing_freq", importance: 0.055 },
  { feature: "return_rate", importance: 0.042 },
].sort((a, b) => a.importance - b.importance);

export function FeatureImportance() {
  return (
    <div className="brutal-panel p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-display text-lg text-foreground">Feature Importance</h3>
        <span className="stamp text-[9px] py-0.5 px-2" style={{ color: "hsl(var(--accent))" }}>
          RF model
        </span>
      </div>
      <p className="text-xs font-mono text-muted-foreground mb-4">Random Forest permutation importance</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={importanceData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
          <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontFamily: "IBM Plex Mono" }} />
          <YAxis dataKey="feature" type="category" width={120} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontFamily: "IBM Plex Mono" }} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "2px solid hsl(var(--foreground))",
              borderRadius: 0,
              color: "hsl(var(--foreground))",
              fontFamily: "IBM Plex Mono",
            }}
            formatter={(v: number) => v.toFixed(3)}
          />
          <Bar dataKey="importance" fill="hsl(var(--primary))" name="Importance" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
