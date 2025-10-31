import { ActivityCard } from "./ActivityCard";
import { Activity } from "@/types/activity";
import { Search } from "lucide-react";

interface ActivityListProps {
  activities: Activity[];
  onActivityAction?: (activity: Activity) => void;
}

export function ActivityList({ activities, onActivityAction }: ActivityListProps) {
  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6">
        <div className="bg-muted/50 rounded-full p-6 mb-6">
          <Search className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-medium text-foreground mb-2">No activities found</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Try adjusting your filters or search term to find the activities you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:gap-6 md:p-6">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          onAction={onActivityAction}
        />
      ))}
    </div>
  );
}
