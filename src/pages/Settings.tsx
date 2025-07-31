import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Camera,
  Clock,
  Mail,
  Save,
  RefreshCw,
  Key,
  Database,
  Bell,
  Eye,
  Lock,
  Smartphone,
  Monitor
} from "lucide-react";

const Settings = () => {
  const [currentTab, setCurrentTab] = useState("general");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure system preferences and security settings
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="transition-smooth hover:bg-accent">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Default
          </Button>
          <Button className="bg-gradient-primary transition-smooth hover:shadow-medium">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="camera" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Camera
          </TabsTrigger>
          <TabsTrigger value="time" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Time
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            System
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-primary" />
                General Configuration
              </CardTitle>
              <CardDescription>
                Basic system configuration and organization details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" defaultValue="City Hall" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="system-name">System Name</Label>
                  <Input id="system-name" defaultValue="Attendance Management System" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Primary Admin Email</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@cityhall.gov" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                      <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                      <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                      <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Organization Description</Label>
                <Textarea 
                  id="description" 
                  defaultValue="Municipal government office managing daily operations and public services."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Admin Profile
              </CardTitle>
              <CardDescription>
                Update administrator account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-name">Full Name</Label>
                  <Input id="admin-name" defaultValue="Admin User" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-phone">Phone Number</Label>
                  <Input id="admin-phone" defaultValue="+1 (555) 123-4567" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-position">Position</Label>
                  <Input id="admin-position" defaultValue="System Administrator" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-department">Department</Label>
                  <Input id="admin-department" defaultValue="IT Department" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Access Control
              </CardTitle>
              <CardDescription>
                Configure user access and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to admin accounts</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Auto-lock Session</Label>
                    <p className="text-sm text-muted-foreground">Automatically lock inactive sessions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Login Notifications</Label>
                    <p className="text-sm text-muted-foreground">Notify admins of new login attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="max-attempts">Max Login Attempts</Label>
                  <Input id="max-attempts" type="number" defaultValue="5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                Password Policy
              </CardTitle>
              <CardDescription>
                Configure password requirements and policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-length">Minimum Password Length</Label>
                  <Input id="min-length" type="number" defaultValue="8" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                  <Input id="password-expiry" type="number" defaultValue="90" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Require Uppercase Letters</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Require Numbers</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Require Special Characters</Label>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Camera Settings */}
        <TabsContent value="camera" className="space-y-6">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Selfie Capture Settings
              </CardTitle>
              <CardDescription>
                Configure camera and face detection parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image-quality">Image Quality</Label>
                  <Select defaultValue="high">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (480p)</SelectItem>
                      <SelectItem value="medium">Medium (720p)</SelectItem>
                      <SelectItem value="high">High (1080p)</SelectItem>
                      <SelectItem value="ultra">Ultra (4K)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="capture-timeout">Capture Timeout (seconds)</Label>
                  <Input id="capture-timeout" type="number" defaultValue="10" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="retry-attempts">Max Retry Attempts</Label>
                  <Input id="retry-attempts" type="number" defaultValue="3" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storage-duration">Storage Duration (days)</Label>
                  <Input id="storage-duration" type="number" defaultValue="90" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Face Detection</Label>
                    <p className="text-sm text-muted-foreground">Verify that a face is present in the selfie</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Quality Check</Label>
                    <p className="text-sm text-muted-foreground">Automatically flag blurry or low-quality images</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Auto Capture</Label>
                    <p className="text-sm text-muted-foreground">Automatically capture when face is detected</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Time Settings */}
        <TabsContent value="time" className="space-y-6">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Working Hours & Schedule
              </CardTitle>
              <CardDescription>
                Configure working hours and attendance rules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="work-start">Work Start Time</Label>
                  <Input id="work-start" type="time" defaultValue="09:00" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="work-end">Work End Time</Label>
                  <Input id="work-end" type="time" defaultValue="17:00" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lunch-start">Lunch Start Time</Label>
                  <Input id="lunch-start" type="time" defaultValue="12:00" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lunch-end">Lunch End Time</Label>
                  <Input id="lunch-end" type="time" defaultValue="13:00" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="late-threshold">Late Threshold (minutes)</Label>
                  <Input id="late-threshold" type="number" defaultValue="15" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="early-threshold">Early Departure Threshold (minutes)</Label>
                  <Input id="early-threshold" type="number" defaultValue="30" />
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Working Days</Label>
                <div className="grid grid-cols-7 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Switch defaultChecked={index < 5} />
                      <Label className="text-sm">{day}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Critical alerts via SMS</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Browser Notifications</Label>
                    <p className="text-sm text-muted-foreground">Show notifications in browser</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email-frequency">Email Frequency</Label>
                  <Select defaultValue="immediate">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly Digest</SelectItem>
                      <SelectItem value="daily">Daily Summary</SelectItem>
                      <SelectItem value="weekly">Weekly Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sms-phone">SMS Phone Number</Label>
                  <Input id="sms-phone" placeholder="+1 (555) 123-4567" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card className="bg-gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                System Configuration
              </CardTitle>
              <CardDescription>
                Advanced system settings and maintenance options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Automatic Backups</Label>
                    <p className="text-sm text-muted-foreground">Enable daily system backups</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Debug Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable detailed error logging</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>System Monitoring</Label>
                    <p className="text-sm text-muted-foreground">Monitor system performance and health</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backup-time">Daily Backup Time</Label>
                  <Input id="backup-time" type="time" defaultValue="02:00" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="retention-days">Data Retention (days)</Label>
                  <Input id="retention-days" type="number" defaultValue="365" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="log-level">Log Level</Label>
                  <Select defaultValue="info">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">Error Only</SelectItem>
                      <SelectItem value="warning">Warning & Error</SelectItem>
                      <SelectItem value="info">Info, Warning & Error</SelectItem>
                      <SelectItem value="debug">All (Debug Mode)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maintenance-window">Maintenance Window</Label>
                  <Input id="maintenance-window" type="time" defaultValue="01:00" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                <Button variant="outline" className="transition-smooth hover:bg-accent">
                  <Database className="h-4 w-4 mr-2" />
                  Backup Now
                </Button>
                
                <Button variant="outline" className="transition-smooth hover:bg-accent">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear Cache
                </Button>
                
                <Button variant="outline" className="transition-smooth hover:bg-accent">
                  <Eye className="h-4 w-4 mr-2" />
                  View Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;