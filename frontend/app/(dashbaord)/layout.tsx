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

        <SidebarTrigger className="lg:hidden fixed left-3 top-2"/>
 
    <div className="w-full p-2 lg:px-8">
      {children}
    </div>
    </SidebarProvider>
    </ProtectedRoute>

  );
}
