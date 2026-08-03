import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

interface Props {
  data: { name: string; total: number; churned: number; retained: number; churnRate: number }[];
}

export function RecencyChart({ data }: Props) {
  return (
    <div className="brutal-panel p-6">
      <h3 className="font-display text-lg text-foreground mb-1">Churn by Recency Bucket</h3>
      <p className="text-xs font-mono text-muted-foreground mb-4">Days since last purchase segmentation</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
          <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
          <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontFamily: "IBM Plex Mono" }} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "2px solid hsl(var(--foreground))",
              borderRadius: 0,
              color: "hsl(var(--foreground))",
              fontFamily: "IBM Plex Mono",
            }}
            formatter={(value: number, name: string) => [value, name]}
          />
          <Legend wrapperStyle={{ fontFamily: "IBM Plex Mono", fontSize: 12 }} />
          <Bar dataKey="retained" stackId="a" fill="hsl(var(--accent))" name="Retained" />
          <Bar dataKey="churned" stackId="a" fill="hsl(var(--destructive))" name="Churned" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
