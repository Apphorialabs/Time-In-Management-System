import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
import { useToast } from "@/hooks/use-toast";

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
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavClasses = (path: string) => {
    const baseClasses = "w-full justify-start gap-3 h-11 transition-smooth rounded-lg relative overflow-hidden";
    const activeClasses = "bg-white/20 text-white font-medium shadow-medium";
    const inactiveClasses = "text-white hover:text-white hover:bg-white/10";
    
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  const handleLogout = () => {
    // Show logout toast
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    
    // Redirect to login page
    navigate("/login");
  };

  return (
    <Sidebar
      className="sidebar-custom transition-all duration-300 ease-in-out"
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
              <p className="text-xs text-white/80">
                Attendance System
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/80 text-xs font-semibold mb-3">
            {!collapsed ? "NAVIGATION" : ""}
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
                        isActive(item.url) ? "text-white" : "text-white/90"
                      }`} />
                      {!collapsed && (
                        <span className="animate-fade-in font-medium text-white">
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
              <p className="text-xs text-white/80">
                Super Administrator
              </p>
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className={`${
            collapsed ? "w-8 h-8 p-0" : "w-full"
          } text-white hover:text-white hover:bg-white/20 transition-smooth`}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}