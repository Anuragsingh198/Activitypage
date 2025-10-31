import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Home as HomeIcon, ListChecks } from "lucide-react";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { activities as mockActivities } from "@/data/dummyData";
import { Calendar, Clock } from "lucide-react";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
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

      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <div className="pointer-events-none absolute inset-0 bg-[url('/hero-bg.svg')] bg-no-repeat bg-right-top opacity-90" aria-hidden="true"></div>
          <div className="max-w-7xl mx-auto px-6 py-14 relative">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight mb-4">Stay organized. Learn faster.</h2>
              <p className="text-muted-foreground mb-6">Browse classes, assignments, and quizzes in one streamlined dashboard. Filter by type, status, or search instantly.</p>
              <div className="flex gap-3">
                <Link href="/activities"><Button size="lg">Get Started</Button></Link>
                <a href="#features" className="text-primary hover:underline self-center">Learn more</a>
              </div>
              {/* Added feature checklist and trust row to balance layout */}
              <div className="mt-6 space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /><span>Job‑ready skills with real projects</span></li>
                  <li className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 text-primary mt-0.5" /><span>Personalized feedback and progress tracking</span></li>
                  <li className="flex items-start gap-2"><Sparkles className="h-4 w-4 text-primary mt-0.5" /><span>Clean, distraction‑free learning experience</span></li>
                </ul>
                <div className="flex items-center gap-4">
                  <div className="rounded-md px-3 py-1 text-xs bg-accent text-accent-foreground">Popular this week</div>
                  <div className="text-xs text-muted-foreground">1000+ learners active now</div>
                </div>
              </div>
            </div>
            <Card className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-medium">Upcoming preview</div>
                <Link href="/activities"><a className="text-xs text-primary hover:underline">View all</a></Link>
              </div>
              <div className="space-y-3">
                {mockActivities.slice(0, 3).map((a) => {
                  const displayDate = a.date || a.dueDate;
                  const dateLabel = a.date ? "Date" : "Due";
                  return (
                    <div key={a.id} className="rounded-md border p-3 hover:bg-muted/50 transition">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary">{a.type}</Badge>
                            <span className="text-xs text-muted-foreground">{a.status}</span>
                          </div>
                          <div className="text-sm font-medium text-foreground line-clamp-1">{a.title}</div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        {displayDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{dateLabel}: {displayDate}</span>
                          </div>
                        )}
                        {a.duration && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{a.duration}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="max-w-7xl mx-auto px-6 pb-14 grid md:grid-cols-3 gap-6">
          <Card className="p-5">
            <h3 className="font-medium mb-2">Powerful Filters</h3>
            <p className="text-sm text-muted-foreground">Drill down by type, status, or search to find what matters.</p>
          </Card>
          <Card className="p-5">
            <h3 className="font-medium mb-2">Clean UI</h3>
            <p className="text-sm text-muted-foreground">Modern, responsive components for a delightful experience.</p>
          </Card>
          <Card className="p-5">
            <h3 className="font-medium mb-2">Instant Setup</h3>
            <p className="text-sm text-muted-foreground">No backend required. All data is local and fast.</p>
          </Card>
        </section>

        {/* Quick links to activity types */}
        <section className="max-w-7xl mx-auto px-6 pb-14">
          <h3 className="text-lg font-medium mb-4">Explore by type</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/activities">
              <Card className="p-5 hover:bg-muted/50 transition cursor-pointer"><div className="font-medium">Online Classes</div><div className="text-sm text-muted-foreground">Join or watch recordings</div></Card>
            </Link>
            <Link href="/activities">
              <Card className="p-5 hover:bg-muted/50 transition cursor-pointer"><div className="font-medium">Quizzes</div><div className="text-sm text-muted-foreground">Start or continue</div></Card>
            </Link>
            <Link href="/activities">
              <Card className="p-5 hover:bg-muted/50 transition cursor-pointer"><div className="font-medium">Assignments</div><div className="text-sm text-muted-foreground">View or submit</div></Card>
            </Link>
            <Link href="/activities">
              <Card className="p-5 hover:bg-muted/50 transition cursor-pointer"><div className="font-medium">Discussions</div><div className="text-sm text-muted-foreground">Open threads</div></Card>
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-6 pb-14">
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="p-5 text-center"><div className="text-3xl font-semibold">12</div><div className="text-sm text-muted-foreground">Active items</div></Card>
            <Card className="p-5 text-center"><div className="text-3xl font-semibold">4</div><div className="text-sm text-muted-foreground">Completed</div></Card>
            <Card className="p-5 text-center"><div className="text-3xl font-semibold">3</div><div className="text-sm text-muted-foreground">Due this week</div></Card>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <Card className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xl font-medium">Ready to dive in?</div>
              <div className="text-sm text-muted-foreground">Start tracking your learning activities now.</div>
            </div>
            <Link href="/activities"><Button size="lg">Go to Activities</Button></Link>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}

