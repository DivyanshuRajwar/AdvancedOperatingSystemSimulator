import {
  Timer,
  Activity,
  Cpu,
  BarChart3,
  Clock
} from "lucide-react";

export default function PerformanceMetrics({ Performance }) {

  if (!Performance) {
    return (
      <div className="mt-2 glass-panel p-6 text-muted-foreground">
        Run the algorithm to see performance metrics
      </div>
    );
  }

  const metrics = [
    {
      label: "Avg Waiting Time",
      value: Performance.averageWaitingTime,
      unit: "ms",
      icon: Timer,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Avg Turnaround Time",
      value: Performance.averageTurnaroundTime,
      unit: "ms",
      icon: Activity,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "CPU Utilization",
      value: Performance.cpuUtilization,
      unit: "%",
      icon: Cpu,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Throughput",
      value: Performance.throughput,
      unit: "proc/unit",
      icon: BarChart3,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      label: "Idle Time",
      value: Performance.totalIdleTime,
      unit: "ms",
      icon: Clock,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
  ];

  return (
    <div className="mt-2 glass-panel p-6">
      <h2 className="text-lg font-semibold mb-6 text-foreground">
        Performance Metrics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {metrics.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-start gap-4"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg}`}
              >
                <Icon className={`w-6 h-6 ${item.color}`} />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {item.label}
                </p>
                <p className={`text-2xl font-bold ${item.color}`}>
                  {item.value}
                  <span className="text-sm font-medium text-muted-foreground">
                    {" "}{item.unit}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
