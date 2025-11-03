import AppSidebar from "../AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";

export default function AppSidebarExample() {
  const [currentPage, setCurrentPage] = useState("chat");

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar
          userType="internal"
          userName="John Doe"
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />
        <div className="flex-1 p-6 bg-background">
          <p className="text-muted-foreground">Current page: {currentPage}</p>
        </div>
      </div>
    </SidebarProvider>
  );
}
