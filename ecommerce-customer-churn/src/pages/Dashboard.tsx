import { useEffect, useState } from "react";
import { Customer, loadCustomers, getKPIs, getChurnBySegment, getRecencyDistribution, getScatterData, getFeatureDistributions, getFeatureCorrelations } from "@/lib/data";
import { KPICards } from "@/components/dashboard/KPICards";
import { ChurnBySegmentChart } from "@/components/dashboard/ChurnBySegmentChart";
import { RecencyChart } from "@/components/dashboard/RecencyChart";
import { EngagementScatter } from "@/components/dashboard/EngagementScatter";
import { DistributionChart } from "@/components/dashboard/DistributionChart";
import { CorrelationHeatmap } from "@/components/dashboard/CorrelationHeatmap";
import { ModelComparison } from "@/components/dashboard/ModelComparison";
import { FeatureImportance } from "@/components/dashboard/FeatureImportance";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const kpis = getKPIs(data);
  const segments = getChurnBySegment(data);
  const recency = getRecencyDistribution(data);
  const scatter = getScatterData(data);
  const distributions = getFeatureDistributions(data);
  const correlations = getFeatureCorrelations(data);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="border-b-[3px] border-foreground pb-4">
        <h1 className="text-3xl md:text-4xl font-display text-foreground">
          CHURN ANALYTICS DASHBOARD
        </h1>
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-2">
          Real-time customer intelligence · {data.length.toLocaleString()} records on file
        </p>
      </div>

      <KPICards kpis={kpis} />

      <div className="grid lg:grid-cols-2 gap-6">
        <ChurnBySegmentChart data={segments} />
        <RecencyChart data={recency} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <EngagementScatter data={scatter} />
        <DistributionChart data={distributions} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ModelComparison />
        <FeatureImportance />
      </div>

      <CorrelationHeatmap data={correlations} />
    </div>
  );
}
