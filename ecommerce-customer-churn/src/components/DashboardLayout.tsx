import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { type ReactNode } from "react";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b-[3px] border-foreground bg-card sticky top-0 z-30 px-1">
            <SidebarTrigger className="ml-2" />
            <span className="ml-3 text-base font-display tracking-tight text-foreground">CHURN·IQ</span>
            <span className="stamp ml-3 text-[9px] py-0.5 px-2">v1.0</span>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
