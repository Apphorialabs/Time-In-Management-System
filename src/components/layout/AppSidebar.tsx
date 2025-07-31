import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Camera,
  Bell,
  Settings,
  Shield,
  LogOut,
  User
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Logs", url: "/logs", icon: FileText },
  { title: "User Management", url: "/users", icon: Users },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Selfie Gallery", url: "/gallery", icon: Camera },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavClasses = (path: string) => {
    const baseClasses = "w-full justify-start gap-3 h-11 transition-smooth rounded-lg relative overflow-hidden";
    const activeClasses = "glass-nav text-white font-medium shadow-medium";
    const inactiveClasses = "text-white/80 hover:text-white hover:bg-white/20";
    
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <Sidebar
      className={`transition-smooth ${collapsed ? "w-16" : "w-64"}`}
      style={{ backgroundColor: "#3D99C0" }}
      collapsible="icon"
    >
      <SidebarHeader className="p-4 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-bold text-white">
                City Hall
              </h2>
              <p className="text-xs text-white/70">
                Attendance System
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/60 text-xs font-semibold mb-3">
            {!collapsed ? "NAVIGATION" : "NAV"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={getNavClasses(item.url)}
                      end={item.url === "/"}
                    >
                      <item.icon className={`h-5 w-5 transition-smooth ${
                        isActive(item.url) ? "text-white" : "text-white/80"
                      }`} />
                      {!collapsed && (
                        <span className="animate-fade-in font-medium">
                          {item.title}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/20">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/api/placeholder/32/32" />
            <AvatarFallback className="bg-white/20 text-white text-xs">
              AD
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 animate-fade-in">
              <p className="text-sm font-medium text-white">
                Admin User
              </p>
              <p className="text-xs text-white/70">
                Super Administrator
              </p>
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className={`${
            collapsed ? "w-8 h-8 p-0" : "w-full"
          } text-white/70 hover:text-white hover:bg-white/20 transition-smooth`}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}