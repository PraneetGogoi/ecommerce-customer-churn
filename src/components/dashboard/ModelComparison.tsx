import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";

const modelData = [
  { name: "Random Forest", accuracy: 93.2, f1: 78.4, precision: 82.1, recall: 75.0 },
  { name: "Gradient Boost", accuracy: 92.8, f1: 77.5, precision: 80.8, recall: 74.5 },
  { name: "Voting Ensemble", accuracy: 92.5, f1: 76.8, precision: 81.2, recall: 72.9 },
  { name: "Logistic Reg", accuracy: 88.4, f1: 62.3, precision: 70.1, recall: 56.2 },
  { name: "SVM", accuracy: 89.1, f1: 65.1, precision: 72.3, recall: 59.2 },
  { name: "KNN", accuracy: 87.2, f1: 58.7, precision: 68.5, recall: 51.3 },
  { name: "Naive Bayes", accuracy: 82.1, f1: 52.1, precision: 55.8, recall: 48.8 },
];

export function ModelComparison() {
  return (
    <div className="brutal-panel p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-display text-lg text-foreground">Model Performance Comparison</h3>
        <span className="stamp text-[9px] py-0.5 px-2">7 tried</span>
      </div>
      <p className="text-xs font-mono text-muted-foreground mb-4">Accuracy &amp; F1-Score across 7 classifiers</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={modelData} layout="vertical" barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
          <XAxis type="number" domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontFamily: "IBM Plex Mono" }} />
          <YAxis dataKey="name" type="category" width={100} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontFamily: "IBM Plex Mono" }} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "2px solid hsl(var(--foreground))",
              borderRadius: 0,
              color: "hsl(var(--foreground))",
              fontFamily: "IBM Plex Mono",
            }}
            formatter={(v: number) => `${v}%`}
          />
          <Legend wrapperStyle={{ fontFamily: "IBM Plex Mono", fontSize: 12 }} />
          <Bar dataKey="accuracy" fill="hsl(var(--primary))" name="Accuracy %" />
          <Bar dataKey="f1" fill="hsl(var(--accent))" name="F1-Score %" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
