import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ActivityPage from "@/pages/ActivityPage";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import ActivityDetailPage from "@/pages/ActivityDetailPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/activities" component={ActivityPage} />
      <Route path="/activities/:id" component={ActivityDetailPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;

