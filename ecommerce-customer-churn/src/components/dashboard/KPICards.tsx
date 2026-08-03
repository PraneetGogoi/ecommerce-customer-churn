import { motion } from "framer-motion";
import { Users, TrendingDown, DollarSign, Star, Heart, BarChart3 } from "lucide-react";

interface Props {
  kpis: {
    total: number;
    churned: number;
    churnRate: string;
    avgOrder: string;
    avgSatisfaction: string;
    loyaltyMembers: number;
    loyaltyPct: string;
    avgEngagement: string;
  };
}

export function KPICards({ kpis }: Props) {
  const cards = [
    { label: "Total Customers", value: kpis.total.toLocaleString(), icon: Users, accent: "primary" },
    { label: "Churn Rate", value: `${kpis.churnRate}%`, icon: TrendingDown, accent: "destructive" },
    { label: "Avg Order Value", value: `$${kpis.avgOrder}`, icon: DollarSign, accent: "primary" },
    { label: "Avg Satisfaction", value: kpis.avgSatisfaction, icon: Star, accent: "accent" },
    { label: "Loyalty Members", value: `${kpis.loyaltyPct}%`, icon: Heart, accent: "accent" },
    { label: "Avg Engagement", value: kpis.avgEngagement, icon: BarChart3, accent: "primary" },
  ] as const;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-card border-[3px] border-foreground p-4 relative"
          style={{ borderTopWidth: 6, borderTopColor: `hsl(var(--${card.accent}))` }}
        >
          <card.icon className="h-4 w-4 text-muted-foreground mb-3" />
          <p className="text-2xl font-display text-foreground">{card.value}</p>
          <p className="text-[10px] font-mono uppercase tracking-wide text-muted-foreground mt-1">{card.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
