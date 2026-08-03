import { useMemo } from "react";
import { Tooltip as ReactTooltip } from "recharts";

interface Props {
  data: {
    matrix: { x: string; y: string; value: number }[];
    features: string[];
  };
}

function getColor(value: number): string {
  if (value >= 0.7) return "hsl(152, 100%, 30%)";
  if (value >= 0.3) return "hsl(152, 90%, 45%)";
  if (value >= 0) return "hsl(54, 60%, 70%)";
  if (value >= -0.3) return "hsl(30, 70%, 65%)";
  if (value >= -0.7) return "hsl(8, 85%, 55%)";
  return "hsl(8, 100%, 40%)";
}

export function CorrelationHeatmap({ data }: Props) {
  const { matrix, features } = data;
  const size = features.length;
  const cellSize = 48;

  return (
    <div className="brutal-panel p-6">
      <h3 className="font-display text-lg text-foreground mb-1">Feature Correlation Matrix</h3>
      <p className="text-xs font-mono text-muted-foreground mb-4">Pearson correlation between numeric features</p>
      <div className="overflow-x-auto">
        <div className="inline-block">
          <div className="flex">
            <div style={{ width: 140 }} />
            {features.map((f) => (
              <div
                key={f}
                style={{ width: cellSize }}
                className="text-[9px] text-muted-foreground font-mono text-center truncate transform -rotate-45 origin-center h-16 flex items-end justify-center pb-1"
              >
                {f}
              </div>
            ))}
          </div>
          {features.map((fy, yi) => (
            <div key={fy} className="flex items-center">
              <div style={{ width: 140 }} className="text-[10px] text-muted-foreground font-mono truncate pr-2 text-right">
                {fy}
              </div>
              {features.map((fx, xi) => {
                const entry = matrix.find((m) => m.x === fx && m.y === fy);
                const val = entry?.value ?? 0;
                return (
                  <div
                    key={fx}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      backgroundColor: getColor(val),
                      opacity: Math.abs(val) * 0.8 + 0.2,
                    }}
                    className="border-2 border-background flex items-center justify-center text-[9px] font-mono cursor-default hover:ring-2 hover:ring-foreground transition-all"
                    title={`${fx} vs ${fy}: ${val}`}
                  >
                    <span className="text-foreground mix-blend-difference">{val.toFixed(1)}</span>
                  </div>
                );
              })}
            </div>
          ))}
          <div className="flex items-center gap-2 mt-4 ml-36">
            <span className="text-[10px] text-muted-foreground font-mono">-1.0</span>
            <div className="flex h-3 rounded-sm overflow-hidden" style={{ width: 200 }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} style={{ flex: 1, backgroundColor: getColor((i / 19) * 2 - 1) }} />
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">+1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
