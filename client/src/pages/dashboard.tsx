import { useQuery } from "@tanstack/react-query";
import FighterProfileCard from "@/components/fighter-profile-card";
import StyleAnalysisChart from "@/components/style-analysis-chart";
import PerformanceChart from "@/components/performance-chart";
import RecommendationsPanel from "@/components/recommendations-panel";
import TrainingSchedule from "@/components/training-schedule";
import FighterComparison from "@/components/fighter-comparison";
import { Users, TrendingUp, Brain, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: fighters, isLoading: fightersLoading } = useQuery({
    queryKey: ["/api/fighters"],
  });

  // Get the first fighter for the main dashboard display
  const currentFighter = fighters?.[0];

  if (statsLoading || fightersLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-page-title">
          Fighter Analysis Dashboard
        </h1>
        <p className="text-gray-600" data-testid="text-page-description">
          AI-powered insights and recommendations for optimal performance
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border border-gray-200" data-testid="card-active-fighters">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Fighters</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="text-active-fighters">
                  {stats?.activeFighters || 0}
                </p>
              </div>
              <div className="bg-primary bg-opacity-10 p-3 rounded-lg">
                <Users className="text-primary text-xl h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200" data-testid="card-completed-analyses">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Analyses Complete</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="text-completed-analyses">
                  {stats?.completedAnalyses || 0}
                </p>
              </div>
              <div className="bg-success bg-opacity-10 p-3 rounded-lg">
                <BarChart3 className="text-success text-xl h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200" data-testid="card-avg-improvement">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Improvement</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="text-avg-improvement">
                  {stats?.avgImprovement || "N/A"}
                </p>
              </div>
              <div className="bg-secondary bg-opacity-10 p-3 rounded-lg">
                <TrendingUp className="text-secondary text-xl h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200" data-testid="card-ai-accuracy">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Accuracy</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="text-ai-accuracy">
                  {stats?.aiAccuracy || "N/A"}
                </p>
              </div>
              <div className="bg-warning bg-opacity-10 p-3 rounded-lg">
                <Brain className="text-warning text-xl h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {currentFighter && <FighterProfileCard fighter={currentFighter} />}
          {currentFighter && <StyleAnalysisChart fighterId={currentFighter.id} />}
          {currentFighter && <PerformanceChart fighterId={currentFighter.id} />}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {currentFighter && <RecommendationsPanel fighterId={currentFighter.id} />}
          {currentFighter && <TrainingSchedule fighterId={currentFighter.id} />}
          <FighterComparison fighters={fighters || []} />
        </div>
      </div>
    </div>
  );
}
