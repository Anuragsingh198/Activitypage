import { useEffect } from "react";
import { FilterBar } from "@/components/FilterBar";
import { ActivityList } from "@/components/ActivityList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useActivityStore } from "@/lib/activity-store";
import activitiesData from "@/data/activities.json";
import { Activity } from "@shared/schema";
import { GraduationCap } from "lucide-react";

export default function ActivityPage() {
  const { setActivities, getFilteredActivities } = useActivityStore();
  const filteredActivities = getFilteredActivities();

  useEffect(() => {
    setActivities(activitiesData as Activity[]);
  }, [setActivities]);

  const handleActivityAction = (activity: Activity) => {
    console.log(`${activity.status === "Completed" ? "Reviewing" : "Starting"} activity:`, activity.title);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-medium text-card-foreground" data-testid="text-page-title">
                Activity Hub
              </h1>
              <p className="text-sm text-muted-foreground">
                Track your learning journey
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        <FilterBar />
        <ActivityList 
          activities={filteredActivities}
          onActivityAction={handleActivityAction}
        />
      </div>
    </div>
  );
}
