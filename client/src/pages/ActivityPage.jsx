import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActivityFilters from "@/components/ActivityFilters";
import { ActivityList } from "@/components/ActivityList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { activities as activitiesData } from "@/data/dummyData";
import { setActivities, selectFilteredActivities } from "@/store/slices/activitiesSlice";
import { useLocation } from "wouter";
import { GraduationCap, Home as HomeIcon, ListChecks } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function ActivityPage() {
  const dispatch = useDispatch();
  const filteredActivities = useSelector(selectFilteredActivities);
  const [, navigate] = useLocation();

  useEffect(() => {
    dispatch(setActivities(activitiesData));
  }, [dispatch]);

  const handleActivityAction = (activity) => {
    navigate(`/activities/${activity.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/favicon.svg" alt="Activity Hub" className="h-8 w-8 md:h-10 md:w-10 rounded-lg" />
            <div className="leading-tight">
              <h1 className="text-xl font-medium text-card-foreground" data-testid="text-page-title">
                Activity Hub
              </h1>
              <p className="text-xs text-muted-foreground">
                Track your learning journey
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="secondary" size="icon" className="md:hidden" aria-label="Home">
                <HomeIcon className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" size="sm" className="hidden md:inline-flex">
                <HomeIcon className="h-4 w-4 md:mr-2" />
                <span>Home</span>
              </Button>
            </Link>
            <Link href="/activities">
              <Button size="icon" className="md:hidden" aria-label="Activities">
                <ListChecks className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/activities">
              <Button size="sm" className="hidden md:inline-flex">
                <ListChecks className="h-4 w-4 md:mr-2" />
                <span>View Activities</span>
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        <ActivityFilters />
        <ActivityList 
          activities={filteredActivities}
          onActivityAction={handleActivityAction}
        />
      </div>
    </div>
  );
}

