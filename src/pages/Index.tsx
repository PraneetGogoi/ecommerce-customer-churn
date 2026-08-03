import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowDown, Users, TrendingDown, BarChart3, Shield } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { Moon, Sun } from "lucide-react";

const stats = [
  { tag: "EXHIBIT A", label: "Customers Analyzed", value: "6,000+", icon: Users },
  { tag: "EXHIBIT B", label: "Confirmed Churn Rate", value: "15.5%", icon: TrendingDown },
  { tag: "EXHIBIT C", label: "Models Deployed", value: "7", icon: BarChart3 },
  { tag: "EXHIBIT D", label: "Leading Model Accuracy", value: "93.2%", icon: Shield },
];

const capabilities = [
  {
    tag: "[LIVE FEED]",
    title: "Real-Time Analytics",
    description:
      "Every KPI, segment, and distribution on the dashboard is computed live off the 6,000-row customer set — not a snapshot, not a mockup.",
  },
  {
    tag: "[MODEL BANK]",
    title: "Predictive Modeling",
    description:
      "Random Forest, Gradient Boosting, and 5 other classifiers benchmarked head-to-head on accuracy, precision, recall, and F1.",
  },
  {
    tag: "[CLUSTER MAP]",
    title: "Customer Segmentation",
    description:
      "Spend-tier and recency segmentation exposes exactly where retention breaks down — by value bracket and by days since last purchase.",
  },
];

const RedactedLine = ({
  text,
  marker,
  delay,
}: {
  text: string;
  marker?: boolean;
  delay: number;
}) => (
  <span className="relative inline-block overflow-hidden align-top">
    <span className={marker ? "marker" : ""}>{text}</span>
    <motion.span
      className="absolute inset-0"
      style={{ background: marker ? "hsl(var(--foreground))" : "hsl(var(--primary))", originX: 0 }}
      initial={{ scaleX: 1 }}
      animate={{ scaleX: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.76, 0, 0.24, 1] }}
    />
  </span>
);

export default function LandingPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background relative">
      {/* Blueprint grid backdrop */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ticker */}
      <div className="hazard-stripe sticky top-0 z-50 overflow-hidden border-b-[3px] border-foreground">
        <div className="bg-background/0">
          <div className="marquee-track py-2">
            {[0, 1].map((rep) => (
              <div key={rep} className="flex items-center shrink-0">
                {[
                  "CASE NO. 2026-06000",
                  "6,000 ACCOUNTS UNDER REVIEW",
                  "15.5% CONFIRMED CHURN",
                  "7 MODELS DEPLOYED",
                  "RANDOM FOREST — 93.2% CONFIDENCE",
                  "STATUS: ACTIVE",
                ].map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[11px] sm:text-xs font-bold tracking-widest px-6 whitespace-nowrap"
                    style={{ color: "hsl(var(--stripe-dark))" }}
                  >
                    {item} &nbsp;//
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b-[3px] border-foreground">
        <span className="font-display text-2xl tracking-tight">CHURN·IQ</span>
        <button
          onClick={toggleTheme}
          className="brutal-btn p-2 bg-card"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-6 pt-16 pb-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="stamp mb-8"
        >
          FILE NO. 2026-06000 — STATUS: OPEN
        </motion.div>

        <h1 className="font-display text-[15vw] sm:text-7xl md:text-8xl leading-[0.92] mb-8">
          <RedactedLine text="CUSTOMER CHURN" delay={0.15} />
          <br />
          <RedactedLine text="INTELLIGENCE" marker delay={0.55} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="font-mono text-sm sm:text-base max-w-xl mb-10 leading-relaxed text-muted-foreground border-l-[3px] border-foreground pl-4"
        >
          6,000 customer accounts, cross-examined by 7 classification models.
          Random Forest leads the lineup at 93.2% accuracy. This is who's
          leaving, and the evidence for why.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.4 }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="brutal-btn bg-primary text-primary-foreground px-8 py-4 font-display text-lg tracking-wide flex items-center gap-3"
          >
            OPEN DASHBOARD <ArrowRight className="h-5 w-5" />
          </button>
          <button
            onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" })}
            className="brutal-btn bg-card text-foreground px-8 py-4 font-display text-lg tracking-wide flex items-center gap-3"
          >
            VIEW EVIDENCE <ArrowDown className="h-5 w-5" />
          </button>
        </motion.div>
      </section>

      {/* Stats / exhibits */}
      <section className="relative z-10 px-6 pb-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="brutal-panel p-5"
            >
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3">{stat.tag}</p>
              <stat.icon className="h-5 w-5 mb-3" />
              <p className="font-display text-3xl sm:text-4xl">{stat.value}</p>
              <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hazard divider */}
      <div className="hazard-stripe border-y-[3px] border-foreground h-10 flex items-center justify-center relative z-10">
        <span
          className="font-mono text-xs font-bold tracking-[0.3em] px-4"
          style={{ color: "hsl(var(--stripe-dark))", background: "hsl(var(--stripe-light))" }}
        >
          CAUTION — RETENTION RISK ZONE
        </span>
      </div>

      {/* Capabilities */}
      <section id="capabilities" className="relative z-10 py-20 px-6 max-w-5xl mx-auto">
        <h2 className="font-display text-4xl sm:text-5xl mb-3">THE EVIDENCE</h2>
        <p className="font-mono text-sm text-muted-foreground mb-12 max-w-xl">
          From raw customer records to a deployed model — everything on this
          dashboard traces back to a real computation.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="brutal-panel p-6 flex flex-col"
            >
              <span className="font-mono text-[10px] tracking-widest text-accent mb-4">{cap.tag}</span>
              <h3 className="font-display text-xl mb-3">{cap.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{cap.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center brutal-panel p-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl mb-4">READY TO REVIEW THE FILE?</h2>
          <p className="text-muted-foreground mb-8 font-mono text-sm">
            Interactive charts, correlation matrix, and full model comparison — inside.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="brutal-btn bg-primary text-primary-foreground px-10 py-4 font-display text-lg tracking-wide inline-flex items-center gap-3"
          >
            OPEN DASHBOARD <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>
      </section>

      <footer className="relative z-10 py-6 text-center border-t-[3px] border-foreground">
        <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          ChurnIQ // E-Commerce Customer Intelligence // Case Status: Open
        </p>
      </footer>
    </div>
  );
}
