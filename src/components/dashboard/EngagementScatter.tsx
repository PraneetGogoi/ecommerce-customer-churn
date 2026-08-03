import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ZAxis } from "recharts";

interface Props {
  data: { engagement: number; satisfaction: number; orderValue: number; churned: string }[];
}

export function EngagementScatter({ data }: Props) {
  const churned = data.filter((d) => d.churned === "Churned");
  const retained = data.filter((d) => d.churned === "Retained");

  return (
    <div className="brutal-panel p-6">
      <h3 className="font-display text-lg text-foreground mb-1">Engagement vs Satisfaction</h3>
      <p className="text-xs font-mono text-muted-foreground mb-4">Bubble size = average order value</p>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
          <XAxis dataKey="engagement" name="Engagement" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontFamily: "IBM Plex Mono" }} />
          <YAxis dataKey="satisfaction" name="Satisfaction" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontFamily: "IBM Plex Mono" }} />
          <ZAxis dataKey="orderValue" range={[20, 200]} name="Avg Order" />
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
          <Scatter name="Retained" data={retained} fill="hsl(var(--accent))" fillOpacity={0.6} />
          <Scatter name="Churned" data={churned} fill="hsl(var(--destructive))" fillOpacity={0.8} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
