import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { 
  Camera, 
  Search, 
  Download, 
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Calendar,
  Filter,
  Grid3X3,
  List
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const selfieData = [
  {
    id: "1",
    employeeId: "EMP001",
    employeeName: "John Smith",
    department: "Administration",
    timestamp: "2024-01-15 09:00:15",
    imageUrl: "/api/placeholder/300/300",
    status: "verified",
    faceDetected: true,
    quality: "good"
  },
  {
    id: "2",
    employeeId: "EMP002",
    employeeName: "Sarah Johnson",
    department: "Finance",
    timestamp: "2024-01-15 09:15:32",
    imageUrl: "/api/placeholder/300/300",
    status: "flagged",
    faceDetected: false,
    quality: "poor"
  },
  {
    id: "3",
    employeeId: "EMP003",
    employeeName: "Mike Davis",
    department: "IT",
    timestamp: "2024-01-15 08:45:28",
    imageUrl: "/api/placeholder/300/300",
    status: "verified",
    faceDetected: true,
    quality: "excellent"
  },
  {
    id: "4",
    employeeId: "EMP004",
    employeeName: "Emily Brown",
    department: "HR",
    timestamp: "2024-01-15 09:30:45",
    imageUrl: "/api/placeholder/300/300",
    status: "review",
    faceDetected: true,
    quality: "blurry"
  },
  {
    id: "5",
    employeeId: "EMP005",
    employeeName: "David Wilson",
    department: "Legal",
    timestamp: "2024-01-15 09:05:12",
    imageUrl: "/api/placeholder/300/300",
    status: "verified",
    faceDetected: true,
    quality: "good"
  },
  {
    id: "6",
    employeeId: "EMP006",
    employeeName: "Lisa Anderson",
    department: "Finance",
    timestamp: "2024-01-15 09:12:38",
    imageUrl: "/api/placeholder/300/300",
    status: "flagged",
    faceDetected: false,
    quality: "poor"
  }
];

const SelfieGallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedSelfie, setSelectedSelfie] = useState(null);

  const filteredSelfies = selfieData.filter(selfie => {
    const matchesSearch = selfie.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         selfie.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || selfie.department === selectedDepartment;
    const matchesStatus = selectedStatus === "all" || selfie.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge variant="default" className="bg-success text-success-foreground">Verified</Badge>;
      case "flagged":
        return <Badge variant="destructive">Flagged</Badge>;
      case "review":
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">Review</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "excellent": return "text-success";
      case "good": return "text-primary";
      case "blurry": return "text-warning";
      case "poor": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const SelfieModal = ({ selfie }) => (
    <Dialog open={!!selfie} onOpenChange={() => setSelectedSelfie(null)}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Selfie Details</DialogTitle>
          <DialogDescription>
            {selfie?.employeeName} - {selfie?.timestamp}
          </DialogDescription>
        </DialogHeader>
        {selfie && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <img 
                src={selfie.imageUrl} 
                alt={`${selfie.employeeName} selfie`}
                className="w-full rounded-lg shadow-medium"
              />
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Employee Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span>{selfie.employeeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID:</span>
                    <span>{selfie.employeeId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Department:</span>
                    <span>{selfie.department}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Verification Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    {getStatusBadge(selfie.status)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Face Detected:</span>
                    <span className={selfie.faceDetected ? "text-success" : "text-destructive"}>
                      {selfie.faceDetected ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quality:</span>
                    <span className={getQualityColor(selfie.quality)}>
                      {selfie.quality.charAt(0).toUpperCase() + selfie.quality.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timestamp:</span>
                    <span>{selfie.timestamp}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Verified
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Flag for Review
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Selfie Gallery</h1>
          <p className="text-muted-foreground mt-1">
            Review and manage employee selfie verifications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="transition-smooth hover:bg-accent">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <div className="flex rounded-lg border border-border p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8 p-0"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Camera className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Selfies</p>
                <p className="text-xl font-bold text-primary">{selfieData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-success/10 p-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Verified</p>
                <p className="text-xl font-bold text-success">
                  {selfieData.filter(s => s.status === 'verified').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-destructive/10 p-2 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Flagged</p>
                <p className="text-xl font-bold text-destructive">
                  {selfieData.filter(s => s.status === 'flagged').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-warning/10 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Need Review</p>
                <p className="text-xl font-bold text-warning">
                  {selfieData.filter(s => s.status === 'review').length}
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
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="review">Review</SelectItem>
              </SelectContent>
            </Select>

            <CalendarDateRangePicker />
          </div>
        </CardContent>
      </Card>

      {/* Selfie Gallery */}
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Selfie Gallery
          </CardTitle>
          <CardDescription>
            Showing {filteredSelfies.length} of {selfieData.length} selfies
          </CardDescription>
        </CardHeader>
        <CardContent>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredSelfies.map((selfie) => (
                <div
                  key={selfie.id}
                  className="group relative bg-card rounded-lg border border-border overflow-hidden transition-smooth hover:shadow-medium cursor-pointer"
                  onClick={() => setSelectedSelfie(selfie)}
                >
                  <div className="aspect-square relative">
                    <img
                      src={selfie.imageUrl}
                      alt={`${selfie.employeeName} selfie`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth" />
                    <div className="absolute top-2 right-2">
                      {getStatusBadge(selfie.status)}
                    </div>
                    {!selfie.faceDetected && (
                      <div className="absolute top-2 left-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold text-sm truncate">{selfie.employeeName}</h4>
                    <p className="text-xs text-muted-foreground">{selfie.employeeId}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(selfie.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredSelfies.map((selfie) => (
                <div
                  key={selfie.id}
                  className="flex items-center gap-4 p-4 border border-border rounded-lg transition-smooth hover:bg-muted/30 cursor-pointer"
                  onClick={() => setSelectedSelfie(selfie)}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selfie.imageUrl} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selfie.employeeName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold">{selfie.employeeName}</h4>
                    <p className="text-sm text-muted-foreground">{selfie.employeeId} • {selfie.department}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm">{new Date(selfie.timestamp).toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(selfie.status)}
                      {!selfie.faceDetected && (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selfie Modal */}
      <SelfieModal selfie={selectedSelfie} />
    </div>
  );
};

export default SelfieGallery;