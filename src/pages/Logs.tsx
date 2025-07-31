import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  Clock,
  User,
  Building,
  FileText,
  AlertCircle
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const logsData = [
  {
    id: "EMP001",
    name: "John Smith",
    department: "Administration",
    timeIn: "09:00 AM",
    timeOut: "05:30 PM",
    date: "2024-01-15",
    status: "on-time",
    selfieUrl: "/api/placeholder/64/64",
    notes: "Normal working day"
  },
  {
    id: "EMP002", 
    name: "Sarah Johnson",
    department: "Finance",
    timeIn: "09:15 AM",
    timeOut: "05:45 PM",
    date: "2024-01-15",
    status: "late",
    selfieUrl: "/api/placeholder/64/64",
    notes: "15 minutes late - traffic"
  },
  {
    id: "EMP003",
    name: "Mike Davis",
    department: "IT",
    timeIn: "08:45 AM",
    timeOut: "05:30 PM", 
    date: "2024-01-15",
    status: "early",
    selfieUrl: "/api/placeholder/64/64",
    notes: "Early arrival"
  },
  {
    id: "EMP004",
    name: "Emily Brown",
    department: "HR",
    timeIn: "09:30 AM",
    timeOut: "--",
    date: "2024-01-15", 
    status: "warning",
    selfieUrl: null,
    notes: "Missing selfie verification"
  },
  {
    id: "EMP005",
    name: "David Wilson",
    department: "Legal",
    timeIn: "09:05 AM",
    timeOut: "05:35 PM",
    date: "2024-01-15",
    status: "on-time",
    selfieUrl: "/api/placeholder/64/64",
    notes: "Standard attendance"
  }
];

const Logs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const filteredLogs = logsData.filter(log => {
    const matchesSearch = log.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || log.department === selectedDepartment;
    const matchesStatus = selectedStatus === "all" || log.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on-time":
        return <Badge variant="default" className="bg-success text-success-foreground">On Time</Badge>;
      case "late":
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">Late</Badge>;
      case "early":
        return <Badge variant="outline" className="border-primary text-primary">Early</Badge>;
      case "warning":
        return <Badge variant="destructive">Warning</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const SelfieModal = ({ employee }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Selfie Verification</DialogTitle>
          <DialogDescription>
            {employee.name} - {employee.date} {employee.timeIn}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center p-4">
          {employee.selfieUrl ? (
            <img 
              src={employee.selfieUrl} 
              alt={`${employee.name} selfie`}
              className="rounded-lg shadow-medium max-w-full h-auto"
            />
          ) : (
            <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No selfie captured</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Logs</h1>
          <p className="text-muted-foreground mt-1">
            Track and monitor employee attendance records
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="transition-smooth hover:bg-accent">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button className="bg-gradient-primary transition-smooth hover:shadow-medium">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-success/10 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">On Time</p>
                <p className="text-xl font-bold text-success">
                  {filteredLogs.filter(log => log.status === 'on-time').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-warning/10 p-2 rounded-lg">
                <AlertCircle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Late</p>
                <p className="text-xl font-bold text-warning">
                  {filteredLogs.filter(log => log.status === 'late').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Early</p>
                <p className="text-xl font-bold text-primary">
                  {filteredLogs.filter(log => log.status === 'early').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-destructive/10 p-2 rounded-lg">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-xl font-bold text-destructive">
                  {filteredLogs.filter(log => log.status === 'warning').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
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

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="on-time">On Time</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="early">Early</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
              </SelectContent>
            </Select>

            <CalendarDateRangePicker />
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Attendance Records
          </CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} of {logsData.length} records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Time In</TableHead>
                  <TableHead>Time Out</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Selfie</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} className="transition-smooth hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/api/placeholder/32/32" />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {log.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{log.name}</p>
                          <p className="text-sm text-muted-foreground">{log.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {log.department}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{log.timeIn}</TableCell>
                    <TableCell className="font-mono text-sm">{log.timeOut}</TableCell>
                    <TableCell className="text-sm">{log.date}</TableCell>
                    <TableCell>{getStatusBadge(log.status)}</TableCell>
                    <TableCell>
                      {log.selfieUrl ? (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={log.selfieUrl} />
                          <AvatarFallback>✓</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-8 w-8 bg-destructive/10 rounded-full flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 text-destructive" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <SelfieModal employee={log} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Logs;