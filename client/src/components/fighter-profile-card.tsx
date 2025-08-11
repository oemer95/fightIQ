import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Fighter } from "@shared/schema";

interface FighterProfileCardProps {
  fighter: Fighter;
}

export default function FighterProfileCard({ fighter }: FighterProfileCardProps) {
  const { toast } = useToast();

  const generateAnalysisMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/fighters/${fighter.id}/analyze`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/fighters", fighter.id, "analysis/latest"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      toast({ title: "New analysis generated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to generate analysis", variant: "destructive" });
    },
  });

  return (
    <Card className="border border-gray-200" data-testid="card-fighter-profile">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900" data-testid="text-card-title">
            Current Fighter Analysis
          </h2>
          <Button
            onClick={() => generateAnalysisMutation.mutate()}
            disabled={generateAnalysisMutation.isPending}
            className="bg-primary text-white hover:bg-primary-dark"
            data-testid="button-new-analysis"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${generateAnalysisMutation.isPending ? "animate-spin" : ""}`} />
            {generateAnalysisMutation.isPending ? "Analyzing..." : "New Analysis"}
          </Button>
        </div>

        <div className="flex items-start space-x-6">
          <img
            src={fighter.imageUrl || "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120"}
            alt={fighter.name}
            className="w-20 h-20 rounded-lg object-cover"
            data-testid="img-fighter"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900" data-testid="text-fighter-name">
              {fighter.name} {fighter.nickname && `"${fighter.nickname}"`}
            </h3>
            <p className="text-sm text-gray-600 mb-2" data-testid="text-weight-class">
              {fighter.weightClass} ({fighter.weight} lbs)
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Record:</span>
                <span className="font-medium ml-1" data-testid="text-record">
                  {fighter.record}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Style:</span>
                <span className="font-medium ml-1" data-testid="text-style">
                  {fighter.fightingStyle}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Reach:</span>
                <span className="font-medium ml-1" data-testid="text-reach">
                  {fighter.reach}"
                </span>
              </div>
              <div>
                <span className="text-gray-600">Age:</span>
                <span className="font-medium ml-1" data-testid="text-age">
                  {fighter.age}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
