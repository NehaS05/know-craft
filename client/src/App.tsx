import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import LoginForm from "@/components/LoginForm";
import ChatPage from "@/pages/ChatPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import AuditPage from "@/pages/AuditPage";
import KnowledgeBasePage from "@/pages/KnowledgeBasePage";
import NotFound from "@/pages/not-found";
import { useState } from "react";

function Router({ userType, onNavigate, currentPage }: { userType: "internal" | "client", onNavigate: (page: string) => void, currentPage: string }) {
  return (
    <Switch>
      <Route path="/" component={() => <ChatPage userType={userType} />} />
      <Route path="/chat" component={() => <ChatPage userType={userType} />} />
      <Route path="/history" component={() => <ChatPage userType={userType} />} />
      {userType === "internal" && (
        <>
          <Route path="/analytics" component={AnalyticsPage} />
          <Route path="/audit" component={AuditPage} />
          <Route path="/knowledge" component={KnowledgeBasePage} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<"internal" | "client">("client");
  const [userName, setUserName] = useState("");
  const [currentPage, setCurrentPage] = useState("chat");

  const handleLogin = (username: string, password: string, type: "internal" | "client") => {
    console.log("Login:", { username, password, type });
    setUserName(username);
    setUserType(type);
    setIsAuthenticated(true);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
  };

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <LoginForm onLogin={handleLogin} />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar
              userType={userType}
              userName={userName}
              currentPage={currentPage}
              onNavigate={handleNavigate}
            />
            <div className="flex flex-col flex-1">
              <header className="flex items-center justify-between p-2 border-b">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <ThemeToggle />
              </header>
              <main className="flex-1 overflow-hidden">
                <Router userType={userType} onNavigate={handleNavigate} currentPage={currentPage} />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
