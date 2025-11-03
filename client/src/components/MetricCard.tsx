import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
}

export default function MetricCard({ label, value, change, icon: Icon }: MetricCardProps) {
  return (
    <Card className="p-6" data-testid={`metric-${label.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold mb-1" data-testid="text-metric-value">{value}</h2>
      {change && (
        <p className="text-xs text-muted-foreground" data-testid="text-metric-change">
          {change}
        </p>
      )}
    </Card>
  );
}
