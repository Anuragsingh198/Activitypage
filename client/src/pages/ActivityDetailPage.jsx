import { useEffect, useMemo } from "react";
import { useRoute, Link } from "wouter";
import { useSelector, useDispatch } from "react-redux";
import { selectActivities, setActivities } from "@/store/slices/activitiesSlice";
import { activities as dummy } from "@/data/dummyData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, GraduationCap, Gauge, FileText, Link2, Home as HomeIcon, ListChecks } from "lucide-react";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function ActivityDetailPage() {
  const [match, params] = useRoute("/activities/:id");
  const dispatch = useDispatch();
  const items = useSelector(selectActivities);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(setActivities(dummy));
    }
  }, [items.length, dispatch]);

  const activityId = Number(params?.id);
  const activity = useMemo(() => items.find(a => a.id === activityId), [items, activityId]);

  if (!match) return null;

  if (!activity) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Link href="/activities"><Button variant="outline"><ArrowLeft className="h-4 w-4 mr-2" />Back</Button></Link>
        <div className="mt-6 text-muted-foreground">Activity not found.</div>
      </div>
    );
  }

  const displayDate = activity.date
    ? { label: "Date", value: format(new Date(activity.date), "MMM dd, yyyy") }
    : activity.dueDate
    ? { label: "Due Date", value: format(new Date(activity.dueDate), "MMM dd, yyyy") }
    : null;

  const renderPrimaryAction = () => {
    if (activity.type === "Online Class") {
      if (activity.status === "Completed" && activity.recordingUrl) {
        return <Button asChild><a href={activity.recordingUrl} target="_blank" rel="noreferrer">Watch Recording</a></Button>;
      }
      return <Button asChild><a href={activity.joinUrl || "#"} target="_blank" rel="noreferrer">Join Class</a></Button>;
    }
    if (activity.type === "Quiz") {
      const label = activity.status === "Not Started" ? "Start Quiz" : activity.status === "In Progress" ? "Continue Quiz" : "Review Quiz";
      return <Button asChild><a href={activity.quizUrl || "#"} target="_blank" rel="noreferrer">{label}</a></Button>;
    }
    if (activity.type === "Assignment") {
      const primaryLabel = activity.status === "Completed" ? "View Assignment" : activity.status === "In Progress" ? "Submit Now" : "View Assignment";
      const url = primaryLabel === "Submit Now" ? (activity.submitUrl || activity.assignmentUrl || "#") : (activity.assignmentUrl || "#");
      return <Button asChild><a href={url} target="_blank" rel="noreferrer">{primaryLabel}</a></Button>;
    }
    if (activity.type === "Discussion") {
      return <Button asChild><a href={activity.discussionUrl || "#"} target="_blank" rel="noreferrer">Open Discussion</a></Button>;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="w-full px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/favicon.svg" alt="Activity Hub" className="h-8 w-8 md:h-10 md:w-10 rounded-lg" />
            <div className="leading-tight">
              <h1 className="text-xl font-medium text-card-foreground">Activity Hub</h1>
              <p className="text-xs text-muted-foreground">Track your learning journey</p>
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

      <main className="max-w-5xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column broken into small cards */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-5">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary">{activity.type}</Badge>
                  <span>•</span>
                  <span>{activity.status}</span>
                </div>
                <h2 className="text-xl font-semibold text-card-foreground">{activity.title}</h2>
                {activity.instructorName && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    <span>Instructor: <span className="text-foreground font-medium">{activity.instructorName}</span></span>
                  </div>
                )}
              </div>
            </Card>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {displayDate && (
                <Card className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4" />
                    <div>
                      <div className="text-xs">{displayDate.label}</div>
                      <div className="font-medium text-foreground">{displayDate.value}</div>
                    </div>
                  </div>
                </Card>
              )}
              {activity.duration && (
                <Card className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Clock className="h-4 w-4" />
                    <div>
                      <div className="text-xs">Duration</div>
                      <div className="font-medium text-foreground">{activity.duration}</div>
                    </div>
                  </div>
                </Card>
              )}
              {activity.difficulty && (
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">
                    <div className="text-xs">Difficulty</div>
                    <div className="font-medium text-foreground">{activity.difficulty}</div>
                  </div>
                </Card>
              )}
              {activity.points !== undefined && (
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">
                    <div className="text-xs">Points</div>
                    <div className="font-medium text-foreground">{activity.points}</div>
                  </div>
                </Card>
              )}
              {activity.program && (
                <Card className="p-4 sm:col-span-2 xl:col-span-3">
                  <div className="text-sm text-muted-foreground">
                    <div className="text-xs">Program</div>
                    <div className="font-medium text-foreground">{activity.program} {activity.week && `• ${activity.week}`}</div>
                  </div>
                </Card>
              )}
            </div>

            {typeof activity.progress === "number" && (
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Gauge className="h-4 w-4" />
                    <span>Progress</span>
                  </div>
                  <div className="text-sm text-foreground font-medium">{activity.progress}%</div>
                </div>
                <div className="mt-3"><Progress value={activity.progress} /></div>
              </Card>
            )}

            {activity.description && (
              <Card className="p-5">
                <div className="text-base font-medium mb-2">Description</div>
                {activity.description.length > 220 ? (
                  <details>
                    <summary className="cursor-pointer text-sm text-muted-foreground list-none marker:hidden select-none">Show description</summary>
                    <p className="mt-2 text-foreground leading-relaxed">{activity.description}</p>
                  </details>
                ) : (
                  <p className="text-foreground leading-relaxed text-sm">{activity.description}</p>
                )}
              </Card>
            )}

            {activity.resources && activity.resources.length > 0 && (
              <Card className="p-5">
                <div className="text-base font-medium mb-3">Resources</div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {activity.resources.map((r, idx) => (
                    <a key={idx} href={r.url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/50 transition">
                      <div className="flex items-center gap-3">
                        {r.type === "PDF" ? <FileText className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
                        <span className="text-sm text-foreground">{r.title}</span>
                      </div>
                      <Badge variant="outline">{r.type}</Badge>
                    </a>
                  ))}
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-4 flex gap-3 items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Primary Action</div>
                {activity.lastAccessed && (
                  <div className="text-xs text-muted-foreground mt-1">Last accessed: {format(new Date(activity.lastAccessed), "MMM dd, yyyy")}</div>
                )}
              </div>
              {renderPrimaryAction()}
            </Card>

            {activity.type === "Assignment" && activity.submitUrl && activity.status !== "Completed" && (
              <Card className="p-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Ready to submit?</div>
                <Button asChild variant="secondary"><a href={activity.submitUrl} target="_blank" rel="noreferrer">Submit Now</a></Button>
              </Card>
            )}

            {/* Optional comments/discussion section */}
            <Card className="p-4">
              <div className="text-sm font-medium mb-2">Comments</div>
              <div className="text-sm text-muted-foreground">Coming soon...</div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

