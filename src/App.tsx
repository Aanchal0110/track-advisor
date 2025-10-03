import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";
import Tracks from "./pages/Tracks";
import TrackDetail from "./pages/TrackDetail";
import Quiz from "./pages/Quiz";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import CareerAssessment from "./pages/CareerAssessment";
import IndustryIntelligence from "./pages/IndustryIntelligence";
import CommunityMentorship from "./pages/CommunityMentorship";
import CareerTools from "./pages/CareerTools";
import LearningEnhancement from "./pages/LearningEnhancement";
import OpportunityHub from "./pages/OpportunityHub";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/track/:slug" element={<TrackDetail />} />
            <Route path="/track/:slug/quiz" element={<Quiz />} />
            <Route path="/assessments" element={<CareerAssessment />} />
            <Route path="/industry" element={<IndustryIntelligence />} />
            <Route path="/community" element={<CommunityMentorship />} />
            <Route path="/tools" element={<CareerTools />} />
            <Route path="/learning" element={<LearningEnhancement />} />
            <Route path="/opportunities" element={<OpportunityHub />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
