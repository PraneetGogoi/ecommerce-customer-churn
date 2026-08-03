import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Props {
  data: { segment: string; total: number; churned: number; retained: number; churnRate: number }[];
}

export function ChurnBySegmentChart({ data }: Props) {
  return (
    <div className="brutal-panel p-6">
      <h3 className="font-display text-lg text-foreground mb-1">Churn by Value Segment</h3>
      <p className="text-xs font-mono text-muted-foreground mb-4">Customer distribution across spending tiers</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
          <XAxis dataKey="segment" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontFamily: "IBM Plex Mono" }} />
          <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontFamily: "IBM Plex Mono" }} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "2px solid hsl(var(--foreground))",
              borderRadius: 0,
              color: "hsl(var(--foreground))",
              fontFamily: "IBM Plex Mono",
            }}
          />
          <Legend wrapperStyle={{ fontFamily: "IBM Plex Mono", fontSize: 12 }} />
          <Bar dataKey="retained" fill="hsl(var(--accent))" name="Retained" />
          <Bar dataKey="churned" fill="hsl(var(--destructive))" name="Churned" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
