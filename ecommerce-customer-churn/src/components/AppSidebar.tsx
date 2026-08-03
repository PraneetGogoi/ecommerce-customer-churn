import { Home, BarChart3, Sun, Moon, TrendingDown, Users, Layers } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/lib/theme";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Landing Page", url: "/", icon: Home },
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { theme, toggleTheme } = useTheme();

  return (
    <Sidebar collapsible="icon" className="border-r-[3px] border-sidebar-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-display text-sm uppercase tracking-widest px-4 pt-3">
            {!collapsed && "CHURN·IQ"}
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2 mt-2">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="font-mono text-xs uppercase tracking-wider border-[2px] border-transparent hover:border-sidebar-border mb-1"
                      activeClassName="!border-sidebar-border bg-sidebar-primary text-sidebar-primary-foreground font-bold"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3">
        <button
          onClick={toggleTheme}
          className="brutal-btn bg-card flex items-center gap-2 w-full px-3 py-2 font-mono text-xs uppercase tracking-wider"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {!collapsed && <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
