import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  Camera
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const dailyLoginData = [
  { day: 'Mon', logins: 45 },
  { day: 'Tue', logins: 52 },
  { day: 'Wed', logins: 49 },
  { day: 'Thu', logins: 61 },
  { day: 'Fri', logins: 55 },
  { day: 'Sat', logins: 12 },
  { day: 'Sun', logins: 8 },
];

const departmentData = [
  { name: 'Administration', value: 35, color: '#3D99C0' },
  { name: 'Finance', value: 25, color: '#5BADD1' },
  { name: 'HR', value: 20, color: '#7BC1E2' },
  { name: 'IT', value: 15, color: '#9BD5F3' },
  { name: 'Legal', value: 5, color: '#BBE9FF' },
];

const recentActivity = [
  { employee: 'John Smith', action: 'Logged in', time: '09:00 AM', status: 'on-time' },
  { employee: 'Sarah Johnson', action: 'Logged in', time: '09:15 AM', status: 'late' },
  { employee: 'Mike Davis', action: 'Logged out', time: '05:30 PM', status: 'on-time' },
  { employee: 'Emily Brown', action: 'Missing selfie', time: '09:30 AM', status: 'warning' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening at City Hall today.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Today</p>
          <p className="text-lg font-semibold text-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-soft transition-smooth hover:shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Logins Today</CardTitle>
            <UserCheck className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">86</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success font-medium">+12%</span> from yesterday
            </p>
            <Progress value={86} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft transition-smooth hover:shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">73</div>
            <p className="text-xs text-muted-foreground">
              Currently in the building
            </p>
            <Progress value={73} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft transition-smooth hover:shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">8</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive font-medium">+2</span> more than usual
            </p>
            <Progress value={15} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft transition-smooth hover:shadow-medium">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
            <div className="flex gap-1 mt-2">
              <Badge variant="destructive" className="text-xs">Missing Selfie</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Logins Chart */}
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Daily Login Trends
            </CardTitle>
            <CardDescription>
              Login activity over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyLoginData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-medium)'
                  }} 
                />
                <Bar dataKey="logins" fill="#3D99C0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Department Distribution
            </CardTitle>
            <CardDescription>
              Employee distribution by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-medium)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {departmentData.map((dept, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: dept.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {dept.name} ({dept.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Latest employee activities and alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 transition-smooth hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'on-time' ? 'bg-success' :
                    activity.status === 'late' ? 'bg-warning' : 'bg-destructive'
                  }`} />
                  <div>
                    <p className="font-medium text-foreground">{activity.employee}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{activity.time}</p>
                  <Badge 
                    variant={
                      activity.status === 'on-time' ? 'default' :
                      activity.status === 'late' ? 'secondary' : 'destructive'
                    }
                    className="text-xs"
                  >
                    {activity.status === 'on-time' ? 'On Time' :
                     activity.status === 'late' ? 'Late' : 'Warning'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;