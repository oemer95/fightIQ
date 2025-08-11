import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface TrainingScheduleProps {
  fighterId: string;
}

export default function TrainingSchedule({ fighterId }: TrainingScheduleProps) {
  const { data: trainingSessions, isLoading } = useQuery({
    queryKey: ["/api/fighters", fighterId, "training"],
  });

  if (isLoading) {
    return (
      <Card className="border border-gray-200" data-testid="card-training-loading">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Training Schedule</h2>
          <div className="space-y-3 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!trainingSessions || trainingSessions.length === 0) {
    return (
      <Card className="border border-gray-200" data-testid="card-training-empty">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Training Schedule</h2>
          <div className="text-center py-8 text-gray-500">
            <p>No training sessions scheduled</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "striking":
        return "bg-primary";
      case "grappling":
        return "bg-success";
      case "cardio":
        return "bg-warning";
      case "technique":
        return "bg-secondary";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="border border-gray-200" data-testid="card-training">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4" data-testid="text-schedule-title">
          Training Schedule
        </h2>
        <div className="space-y-3">
          {trainingSessions.map((session: any) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              data-testid={`session-${session.id}`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${getTypeColor(session.type)}`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900" data-testid={`session-title-${session.id}`}>
                    {session.title}
                  </p>
                  <p className="text-xs text-gray-600" data-testid={`session-time-${session.id}`}>
                    {formatDistanceToNow(new Date(session.scheduledFor), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-500" data-testid={`session-duration-${session.id}`}>
                {session.duration} min
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
