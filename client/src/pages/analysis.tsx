import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StyleAnalysisChart from "@/components/style-analysis-chart";
import PerformanceChart from "@/components/performance-chart";
import RecommendationsPanel from "@/components/recommendations-panel";
import type { Fighter } from "@shared/schema";

export default function Analysis() {
  const [selectedFighterId, setSelectedFighterId] = useState<string>("");

  const { data: fighters, isLoading: fightersLoading } = useQuery({
    queryKey: ["/api/fighters"],
  });

  const { data: analysis, isLoading: analysisLoading } = useQuery({
    queryKey: ["/api/fighters", selectedFighterId, "analysis/latest"],
    enabled: !!selectedFighterId,
  });

  const selectedFighter = fighters?.find((f: Fighter) => f.id === selectedFighterId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-page-title">
          Fighter Analysis
        </h1>
        <p className="text-gray-600" data-testid="text-page-description">
          Detailed performance analysis and insights
        </p>
      </div>

      {/* Fighter Selection */}
      <Card className="mb-8" data-testid="card-fighter-selection">
        <CardHeader>
          <CardTitle>Select Fighter</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedFighterId} onValueChange={setSelectedFighterId} data-testid="select-fighter">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a fighter to analyze" />
            </SelectTrigger>
            <SelectContent>
              {fighters?.map((fighter: Fighter) => (
                <SelectItem key={fighter.id} value={fighter.id} data-testid={`option-fighter-${fighter.id}`}>
                  {fighter.name} {fighter.nickname && `"${fighter.nickname}"`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedFighter && (
        <>
          {/* Fighter Profile */}
          <Card className="mb-8" data-testid="card-fighter-profile">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-6">
                <img
                  src={selectedFighter.imageUrl || "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120"}
                  alt={selectedFighter.name}
                  className="w-20 h-20 rounded-lg object-cover"
                  data-testid="img-fighter-profile"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900" data-testid="text-fighter-name">
                    {selectedFighter.name} {selectedFighter.nickname && `"${selectedFighter.nickname}"`}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2" data-testid="text-fighter-weight-class">
                    {selectedFighter.weightClass} ({selectedFighter.weight} lbs)
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Record:</span>
                      <span className="font-medium ml-1" data-testid="text-fighter-record">
                        {selectedFighter.record}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Style:</span>
                      <span className="font-medium ml-1" data-testid="text-fighter-style">
                        {selectedFighter.fightingStyle}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Reach:</span>
                      <span className="font-medium ml-1" data-testid="text-fighter-reach">
                        {selectedFighter.reach}"
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium ml-1" data-testid="text-fighter-age">
                        {selectedFighter.age}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysisLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              <div className="space-y-8">
                <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          ) : analysis ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                <StyleAnalysisChart fighterId={selectedFighterId} />
                <PerformanceChart fighterId={selectedFighterId} />
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <RecommendationsPanel fighterId={selectedFighterId} />
              </div>
            </div>
          ) : (
            <Card data-testid="card-no-analysis">
              <CardContent className="pt-6">
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg font-medium mb-2">No Analysis Available</p>
                  <p className="text-sm">
                    This fighter hasn't been analyzed yet. Start an analysis from the dashboard.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {!selectedFighter && !fightersLoading && (
        <Card data-testid="card-select-fighter">
          <CardContent className="pt-6">
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg font-medium mb-2">Select a Fighter</p>
              <p className="text-sm">Choose a fighter from the dropdown above to view their analysis.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
