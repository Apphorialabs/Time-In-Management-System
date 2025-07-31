import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { 
  FileText, 
  Download, 
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  Clock,
  Users,
  Building,
  AlertTriangle,
  Printer,
  Mail
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as PieChartRecharts, Pie, Cell } from 'recharts';

const attendanceData = [
  { date: '2024-01-01', onTime: 45, late: 8, absent: 2 },
  { date: '2024-01-02', onTime: 48, late: 5, absent: 2 },
  { date: '2024-01-03', onTime: 52, late: 3, absent: 0 },
  { date: '2024-01-04', onTime: 49, late: 6, absent: 0 },
  { date: '2024-01-05', onTime: 51, late: 4, absent: 0 },
  { date: '2024-01-08', onTime: 47, late: 7, absent: 1 },
  { date: '2024-01-09', onTime: 53, late: 2, absent: 0 },
];

const departmentData = [
  { name: 'Administration', attendance: 95, color: '#3D99C0' },
  { name: 'Finance', attendance: 88, color: '#5BADD1' },
  { name: 'HR', attendance: 92, color: '#7BC1E2' },
  { name: 'IT', attendance: 97, color: '#9BD5F3' },
  { name: 'Legal', attendance: 85, color: '#BBE9FF' },
];

const punctualityData = [
  { name: 'On Time', value: 82, color: '#22c55e' },
  { name: 'Late (1-15 min)', value: 12, color: '#f59e0b' },
  { name: 'Late (15+ min)', value: 4, color: '#ef4444' },
  { name: 'Absent', value: 2, color: '#6b7280' },
];

const reportTemplates = [
  {
    id: 'daily',
    title: 'Daily Attendance Report',
    description: 'Detailed daily attendance with login/logout times',
    icon: Calendar,
    color: 'primary'
  },
  {
    id: 'weekly',
    title: 'Weekly Summary Report',
    description: 'Weekly attendance patterns and trends',
    icon: BarChart3,
    color: 'success'
  },
  {
    id: 'monthly',
    title: 'Monthly Analytics Report',
    description: 'Comprehensive monthly attendance analytics',
    icon: TrendingUp,
    color: 'warning'
  },
  {
    id: 'department',
    title: 'Department Performance Report',
    description: 'Department-wise attendance comparison',
    icon: Building,
    color: 'destructive'
  }
];

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('daily');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [reportFormat, setReportFormat] = useState('pdf');

  const generateReport = () => {
    console.log('Generating report:', { selectedReport, selectedDepartment, reportFormat });
    // Report generation logic here
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Generate comprehensive attendance reports and analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="transition-smooth hover:bg-accent">
            <Printer className="h-4 w-4 mr-2" />
            Print Preview
          </Button>
          <Button variant="outline" className="transition-smooth hover:bg-accent">
            <Mail className="h-4 w-4 mr-2" />
            Email Report
          </Button>
        </div>
      </div>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTemplates.map((template) => (
          <Card 
            key={template.id}
            className={`bg-gradient-card shadow-soft transition-smooth hover:shadow-medium cursor-pointer ${
              selectedReport === template.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedReport(template.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`bg-${template.color}/10 p-2 rounded-lg`}>
                  <template.icon className={`h-5 w-5 text-${template.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{template.title}</h3>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{template.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Configuration */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Report Configuration
          </CardTitle>
          <CardDescription>
            Configure your report parameters and download options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <CalendarDateRangePicker />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Administration">Administration</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Format</label>
              <Select value={reportFormat} onValueChange={setReportFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="csv">CSV File</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={generateReport}
                className="w-full bg-gradient-primary transition-smooth hover:shadow-medium"
              >
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trends */}
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Attendance Trends
            </CardTitle>
            <CardDescription>
              Daily attendance patterns over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-medium)'
                  }} 
                />
                <Line type="monotone" dataKey="onTime" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="late" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Punctuality Distribution */}
        <Card className="bg-gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Punctuality Distribution
            </CardTitle>
            <CardDescription>
              Employee punctuality breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChartRecharts>
                <Pie
                  data={punctualityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {punctualityData.map((entry, index) => (
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
              </PieChartRecharts>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {punctualityData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            Department Performance
          </CardTitle>
          <CardDescription>
            Attendance rates by department
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-medium)'
                }} 
              />
              <Bar dataKey="attendance" fill="#3D99C0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Daily Attendance</p>
                <p className="text-xl font-bold text-primary">94.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-success/10 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Punctuality Rate</p>
                <p className="text-xl font-bold text-success">87.5%</p>
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
                <p className="text-sm text-muted-foreground">Late Arrivals</p>
                <p className="text-xl font-bold text-warning">12.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-destructive/10 p-2 rounded-lg">
                <Users className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Absenteeism Rate</p>
                <p className="text-xl font-bold text-destructive">2.1%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;