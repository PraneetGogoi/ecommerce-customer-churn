import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface BinData {
  bin: number;
  count: number;
}

interface Props {
  data: {
    engagement: { churned: BinData[]; retained: BinData[] };
    satisfaction: { churned: BinData[]; retained: BinData[] };
    orderValue: { churned: BinData[]; retained: BinData[] };
  };
}

const FEATURES = [
  { key: "engagement" as const, label: "Engagement Score" },
  { key: "satisfaction" as const, label: "Satisfaction Score" },
  { key: "orderValue" as const, label: "Avg Order Value" },
];

export function DistributionChart({ data }: Props) {
  const [selected, setSelected] = useState<keyof Props["data"]>("engagement");

  const feat = data[selected];
  const merged = feat.retained.map((r, i) => ({
    bin: r.bin,
    retained: r.count,
    churned: feat.churned[i]?.count || 0,
  }));

  return (
    <div className="brutal-panel p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-display text-lg text-foreground">Feature Distributions</h3>
          <p className="text-xs font-mono text-muted-foreground">Churned vs retained density</p>
        </div>
        <div className="flex gap-2">
          {FEATURES.map((f) => (
            <button
              key={f.key}
              onClick={() => setSelected(f.key)}
              className={`brutal-btn px-3 py-1 text-xs font-mono uppercase tracking-wide ${
                selected === f.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={merged}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
          <XAxis dataKey="bin" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontFamily: "IBM Plex Mono" }} />
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
          <Area type="monotone" dataKey="retained" fill="hsl(var(--accent))" fillOpacity={0.35} stroke="hsl(var(--accent))" strokeWidth={2} name="Retained" />
          <Area type="monotone" dataKey="churned" fill="hsl(var(--destructive))" fillOpacity={0.35} stroke="hsl(var(--destructive))" strokeWidth={2} name="Churned" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
