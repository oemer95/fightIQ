import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3 } from "lucide-react";
import type { Fighter } from "@shared/schema";

interface FighterComparisonProps {
  fighters: Fighter[];
}

export default function FighterComparison({ fighters }: FighterComparisonProps) {
  const [selectedFighterId, setSelectedFighterId] = useState<string>("");

  const selectedFighter = fighters.find((f) => f.id === selectedFighterId);

  return (
    <Card className="border border-gray-200" data-testid="card-fighter-comparison">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4" data-testid="text-comparison-title">
          Fighter Comparison
        </h2>
        <div className="space-y-4">
          <Select value={selectedFighterId} onValueChange={setSelectedFighterId} data-testid="select-comparison-fighter">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select fighter to compare" />
            </SelectTrigger>
            <SelectContent>
              {fighters.map((fighter) => (
                <SelectItem key={fighter.id} value={fighter.id} data-testid={`option-fighter-${fighter.id}`}>
                  {fighter.name} {fighter.nickname && `"${fighter.nickname}"`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedFighter ? (
            <div className="space-y-3" data-testid="comparison-details">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium" data-testid="comparison-name">
                  {selectedFighter.name}
                </span>
                <span className="text-xs text-gray-500" data-testid="comparison-record">
                  {selectedFighter.record}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Weight Class</span>
                <span className="text-sm font-medium" data-testid="comparison-weight-class">
                  {selectedFighter.weightClass}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Fighting Style</span>
                <span className="text-sm font-medium" data-testid="comparison-style">
                  {selectedFighter.fightingStyle}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Reach</span>
                <span className="text-sm font-medium" data-testid="comparison-reach">
                  {selectedFighter.reach}"
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500" data-testid="comparison-placeholder">
              <BarChart3 className="mx-auto h-12 w-12 mb-2" />
              <p className="text-sm">Select a fighter to view comparison</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
