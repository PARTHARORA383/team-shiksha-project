import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/protected-route";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>

    <SidebarProvider>

      <AppSidebar/>
      <div className="lg:hidden">
        <SidebarTrigger/>
      </div>
    <div className="w-full">
      {children}
    </div>
    </SidebarProvider>
    </ProtectedRoute>

  );
}
