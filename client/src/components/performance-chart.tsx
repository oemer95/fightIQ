import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PerformanceChartProps {
  fighterId: string;
}

export default function PerformanceChart({ fighterId }: PerformanceChartProps) {
  const { data: performanceData, isLoading } = useQuery({
    queryKey: ["/api/fighters", fighterId, "performance"],
  });

  if (isLoading) {
    return (
      <Card className="border border-gray-200" data-testid="card-performance-loading">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Trends</h2>
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  if (!performanceData || performanceData.length === 0) {
    return (
      <Card className="border border-gray-200" data-testid="card-performance-empty">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Trends</h2>
          <div className="text-center py-8 text-gray-500">
            <p>No performance data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = performanceData.map((data: any) => ({
    fight: `Fight ${data.fightNumber}`,
    performance: data.performanceScore,
    striking: data.striking,
    grappling: data.grappling,
    cardio: data.cardio,
    defense: data.defense,
  }));

  return (
    <Card className="border border-gray-200" data-testid="card-performance">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6" data-testid="text-chart-title">
          Performance Trends
        </h2>
        <div className="h-64" data-testid="chart-performance">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fight" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="performance"
                stroke="var(--primary)"
                strokeWidth={3}
                dot={{ fill: "var(--primary)", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
