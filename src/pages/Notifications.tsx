import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  AlertTriangle, 
  Clock, 
  User,
  Check,
  X,
  Settings,
  Plus,
  Search,
  Filter,
  Calendar,
  Mail,
  Smartphone
} from "lucide-react";

const notificationsData = [
  {
    id: "1",
    title: "Missing Selfie Verification",
    message: "Emily Brown (EMP004) logged in without selfie verification at 09:30 AM",
    type: "warning",
    timestamp: "2024-01-15 09:35:00",
    status: "unread",
    employee: "Emily Brown",
    department: "HR"
  },
  {
    id: "2",
    title: "Late Login Alert",
    message: "Sarah Johnson (EMP002) arrived 15 minutes late at 09:15 AM",
    type: "late",
    timestamp: "2024-01-15 09:20:00",
    status: "read",
    employee: "Sarah Johnson",
    department: "Finance"
  },
  {
    id: "3",
    title: "System Alert",
    message: "Face detection service experienced temporary interruption for 5 minutes",
    type: "system",
    timestamp: "2024-01-15 08:45:00",
    status: "resolved",
    employee: null,
    department: null
  },
  {
    id: "4",
    title: "Early Departure",
    message: "Mike Davis (EMP003) logged out at 04:30 PM, 1 hour before scheduled time",
    type: "early",
    timestamp: "2024-01-15 16:35:00",
    status: "unread",
    employee: "Mike Davis",
    department: "IT"
  },
  {
    id: "5",
    title: "Suspicious Activity",
    message: "Multiple failed face verification attempts detected for user EMP007",
    type: "security",
    timestamp: "2024-01-15 10:15:00",
    status: "investigating",
    employee: "Unknown User",
    department: "Unknown"
  }
];

const alertRules = [
  { id: "1", name: "Missing Selfie", description: "Alert when employee logs in without selfie", enabled: true },
  { id: "2", name: "Late Login", description: "Alert when employee is more than 10 minutes late", enabled: true },
  { id: "3", name: "Early Departure", description: "Alert when employee leaves before scheduled time", enabled: false },
  { id: "4", name: "Multiple Failed Verifications", description: "Alert when face detection fails multiple times", enabled: true },
  { id: "5", name: "System Issues", description: "Alert for system malfunctions or downtime", enabled: true },
];

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("notifications");

  const filteredNotifications = notificationsData.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (notification.employee && notification.employee.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "all" || notification.type === selectedType;
    const matchesStatus = selectedStatus === "all" || notification.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "late": return <Clock className="h-5 w-5 text-destructive" />;
      case "system": return <Settings className="h-5 w-5 text-primary" />;
      case "early": return <Clock className="h-5 w-5 text-warning" />;
      case "security": return <AlertTriangle className="h-5 w-5 text-destructive" />;
      default: return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return <Badge variant="destructive">Unread</Badge>;
      case "read":
        return <Badge variant="outline">Read</Badge>;
      case "resolved":
        return <Badge variant="default" className="bg-success text-success-foreground">Resolved</Badge>;
      case "investigating":
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">Investigating</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "warning":
        return <Badge variant="secondary" className="bg-warning/10 text-warning">Warning</Badge>;
      case "late":
        return <Badge variant="destructive">Late</Badge>;
      case "system":
        return <Badge variant="outline" className="border-primary text-primary">System</Badge>;
      case "early":
        return <Badge variant="secondary" className="bg-warning/10 text-warning">Early</Badge>;
      case "security":
        return <Badge variant="destructive">Security</Badge>;
      default:
        return <Badge variant="outline">Info</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications & Alerts</h1>
          <p className="text-muted-foreground mt-1">
            Monitor system alerts and employee attendance notifications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="transition-smooth hover:bg-accent">
            <Mail className="h-4 w-4 mr-2" />
            Email Settings
          </Button>
          <Button className="bg-gradient-primary transition-smooth hover:shadow-medium">
            <Plus className="h-4 w-4 mr-2" />
            Create Alert
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-destructive/10 p-2 rounded-lg">
                <Bell className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unread</p>
                <p className="text-xl font-bold text-destructive">
                  {notificationsData.filter(n => n.status === 'unread').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-warning/10 p-2 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Investigating</p>
                <p className="text-xl font-bold text-warning">
                  {notificationsData.filter(n => n.status === 'investigating').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-success/10 p-2 rounded-lg">
                <Check className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-xl font-bold text-success">
                  {notificationsData.filter(n => n.status === 'resolved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-xl font-bold text-primary">
                  {notificationsData.filter(n => n.timestamp.startsWith('2024-01-15')).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === "notifications" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("notifications")}
          className="transition-smooth"
        >
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </Button>
        <Button
          variant={activeTab === "settings" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("settings")}
          className="transition-smooth"
        >
          <Settings className="h-4 w-4 mr-2" />
          Alert Rules
        </Button>
      </div>

      {activeTab === "notifications" && (
        <>
          {/* Filters */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="early">Early</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Recent Notifications
              </CardTitle>
              <CardDescription>
                Showing {filteredNotifications.length} of {notificationsData.length} notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-smooth hover:shadow-medium ${
                      notification.status === 'unread' ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-foreground">{notification.title}</h4>
                          <div className="flex items-center gap-2">
                            {getTypeBadge(notification.type)}
                            {getStatusBadge(notification.status)}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{new Date(notification.timestamp).toLocaleString()}</span>
                            {notification.employee && (
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {notification.employee}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-7">
                              <Check className="h-3 w-3 mr-1" />
                              Resolve
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === "settings" && (
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Alert Rules Configuration
            </CardTitle>
            <CardDescription>
              Configure automatic alert triggers and notification settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Alert Rules */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Alert Rules</h3>
              {alertRules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium">{rule.name}</h4>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                  </div>
                  <Switch checked={rule.enabled} />
                </div>
              ))}
            </div>

            {/* Notification Channels */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Notification Channels</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <div className="flex items-center gap-2">
                    <Switch id="email-notifications" />
                    <span className="text-sm text-muted-foreground">Send alerts via email</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <div className="flex items-center gap-2">
                    <Switch id="sms-notifications" />
                    <span className="text-sm text-muted-foreground">Send critical alerts via SMS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Email Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input id="admin-email" placeholder="admin@cityhall.gov" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cc-emails">CC Emails</Label>
                  <Input id="cc-emails" placeholder="supervisor@cityhall.gov" />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="bg-gradient-primary">Save Settings</Button>
              <Button variant="outline">Reset to Default</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Notifications;