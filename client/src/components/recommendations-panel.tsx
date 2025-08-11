import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, AlertTriangle, CheckCircle, FileText } from "lucide-react";

interface RecommendationsPanelProps {
  fighterId: string;
}

export default function RecommendationsPanel({ fighterId }: RecommendationsPanelProps) {
  const { data: analysis, isLoading } = useQuery({
    queryKey: ["/api/fighters", fighterId, "analysis/latest"],
  });

  if (isLoading) {
    return (
      <Card className="border border-gray-200" data-testid="card-recommendations-loading">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Recommendations</h2>
          <div className="space-y-4 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="border border-gray-200" data-testid="card-recommendations-empty">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Recommendations</h2>
          <div className="text-center py-8 text-gray-500">
            <p>No recommendations available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getRecommendationIcon = (index: number) => {
    if (index === 0) return <Lightbulb className="text-primary mt-1 h-5 w-5" />;
    if (index === 1) return <AlertTriangle className="text-warning mt-1 h-5 w-5" />;
    return <CheckCircle className="text-success mt-1 h-5 w-5" />;
  };

  const getRecommendationStyle = (index: number) => {
    if (index === 0) return "bg-blue-50 border-blue-200";
    if (index === 1) return "bg-yellow-50 border-yellow-200";
    return "bg-green-50 border-green-200";
  };

  return (
    <Card className="border border-gray-200" data-testid="card-recommendations">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4" data-testid="text-panel-title">
          AI Recommendations
        </h2>
        <div className="space-y-4">
          {analysis.recommendations?.map((recommendation: string, index: number) => (
            <div
              key={index}
              className={`border rounded-lg p-4 ${getRecommendationStyle(index)}`}
              data-testid={`recommendation-${index}`}
            >
              <div className="flex items-start space-x-3">
                {getRecommendationIcon(index)}
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    {index === 0 && "Improvement Focus"}
                    {index === 1 && "Training Adjustment"}
                    {index >= 2 && "Strength Enhancement"}
                  </h4>
                  <p className="text-sm text-gray-600">{recommendation}</p>
                </div>
              </div>
            </div>
          ))}

          {analysis.strengths?.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4" data-testid="strengths-section">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-success mt-1 h-5 w-5" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Key Strengths</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {analysis.strengths.map((strength: string, index: number) => (
                      <li key={index} data-testid={`strength-${index}`}>
                        • {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {analysis.weaknesses?.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4" data-testid="weaknesses-section">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="text-secondary mt-1 h-5 w-5" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Areas for Improvement</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {analysis.weaknesses.map((weakness: string, index: number) => (
                      <li key={index} data-testid={`weakness-${index}`}>
                        • {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <Button
          className="w-full mt-6 bg-primary text-white hover:bg-primary-dark"
          data-testid="button-generate-report"
        >
          <FileText className="mr-2 h-4 w-4" />
          Generate Full Report
        </Button>
      </CardContent>
    </Card>
  );
}
