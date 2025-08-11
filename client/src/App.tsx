import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Fighters from "@/pages/fighters";
import Analysis from "@/pages/analysis";
import NavigationHeader from "@/components/navigation-header";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/fighters" component={Fighters} />
      <Route path="/analysis" component={Analysis} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <NavigationHeader />
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
