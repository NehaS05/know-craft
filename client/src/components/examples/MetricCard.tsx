import MetricCard from "../MetricCard";
import { MessageSquare, Users, TrendingUp, Clock } from "lucide-react";

export default function MetricCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-background">
      <MetricCard label="Total Queries" value="1,284" change="+12% from last month" icon={MessageSquare} />
      <MetricCard label="Active Users" value="342" change="+8% from last month" icon={Users} />
      <MetricCard label="Avg Response Time" value="1.2s" change="-15% from last month" icon={Clock} />
      <MetricCard label="Satisfaction Rate" value="94%" change="+3% from last month" icon={TrendingUp} />
    </div>
  );
}
