import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Radar, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

interface StyleAnalysisChartProps {
  fighterId: string;
}

export default function StyleAnalysisChart({ fighterId }: StyleAnalysisChartProps) {
  const { data: analysis, isLoading } = useQuery({
    queryKey: ["/api/fighters", fighterId, "analysis/latest"],
  });

  if (isLoading) {
    return (
      <Card className="border border-gray-200" data-testid="card-style-analysis-loading">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Fighting Style Analysis</h2>
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="border border-gray-200" data-testid="card-style-analysis-empty">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Fighting Style Analysis</h2>
          <div className="text-center py-8 text-gray-500">
            <p>No analysis data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = [
    { subject: "Striking", value: analysis.striking, fullMark: 100 },
    { subject: "Grappling", value: analysis.grappling, fullMark: 100 },
    { subject: "Cardio", value: analysis.cardio, fullMark: 100 },
    { subject: "Defense", value: analysis.defense, fullMark: 100 },
    { subject: "Aggression", value: analysis.aggression, fullMark: 100 },
    { subject: "Technique", value: analysis.technique, fullMark: 100 },
  ];

  const getColorForScore = (score: number) => {
    if (score >= 80) return "var(--primary)";
    if (score >= 70) return "var(--success)";
    if (score >= 60) return "var(--warning)";
    return "var(--secondary)";
  };

  return (
    <Card className="border border-gray-200" data-testid="card-style-analysis">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6" data-testid="text-chart-title">
          Fighting Style Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64" data-testid="chart-radar">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar
                  name="Fighter"
                  dataKey="value"
                  stroke="var(--primary)"
                  fill="var(--primary)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {chartData.map((item) => (
              <div key={item.subject}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{item.subject}</span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: getColorForScore(item.value) }}
                    data-testid={`text-score-${item.subject.toLowerCase()}`}
                  >
                    {item.value}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: getColorForScore(item.value),
                    }}
                    data-testid={`progress-${item.subject.toLowerCase()}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
