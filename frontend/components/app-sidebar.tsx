"use client";

import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token"); // Remove JWT
    router.push("/Login"); // Redirect to login
  }

  return (
    <Sidebar className="">
      <SidebarHeader />
      <SidebarContent>

        <div className="flex items-center gap-3 pl-2 pt-6">
        <div className="bg-gradient-to-br from-sky-500 rounded-full to-sky-700 w-6 h-6"></div>
        <h2 className="text-lg font-medium  ">
          Team Shiksha</h2>
        </div>

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem key="Dashboard">
              <SidebarMenuButton asChild>
                <a href="/Dashboard">
                  <span className="text-[17px] font-medium">Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <button
          onClick={handleLogout}
          className="w-full border text-foreground hover:border-red-500 py-2 rounded-md font-medium transition"
        >
          Logout
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
