"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GrowthChart } from "@/components/dashboard/growth-chart";
import { 
  ChevronLeft, 
  Pencil, 
  Trash, 
  InfoIcon, 
  ActivityIcon, 
  LineChart, 
  History 
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StudentForm } from "@/components/dashboard/student-form";

// Sample student data - would come from API in a real app
const studentData = {
  id: "1",
  name: "Emma Johnson",
  classGroup: "Grade 5-A",
  age: 10,
  gender: "Female",
  height: 142.5,
  weight: 35.2,
  bmi: 17.3,
  birthDate: "2013-05-10",
  parentName: "Sarah Johnson",
  parentContact: "+1 (555) 123-4567",
  address: "123 Maple Street, Springfield",
  lastUpdated: "2023-04-15T09:30:00",
  enrollmentDate: "2021-09-01",
  measurements: [
    { date: "2023-04-15", height: 142.5, weight: 35.2 },
    { date: "2023-03-15", height: 141.8, weight: 34.9 },
    { date: "2023-02-15", height: 141.2, weight: 34.5 },
    { date: "2023-01-15", height: 140.6, weight: 34.2 },
    { date: "2022-12-15", height: 140.0, weight: 33.8 },
    { date: "2022-11-15", height: 139.4, weight: 33.5 },
  ],
};

export default function StudentDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const { id } = params;

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }

  // BMI classification for children
  function getBmiClassification(bmi: number, age: number) {
    // Simplified classification for example
    if (bmi < 14) return { label: "Underweight", color: "bg-amber-500" };
    if (bmi < 18) return { label: "Healthy", color: "bg-emerald-500" };
    if (bmi < 24) return { label: "Overweight", color: "bg-orange-500" };
    return { label: "Obese", color: "bg-red-500" };
  }

  const bmiClass = getBmiClassification(studentData.bmi, studentData.age);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/students">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{studentData.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1 h-fit">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                {getInitials(studentData.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{studentData.name}</CardTitle>
              <CardDescription>{studentData.classGroup}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Age</div>
              <div className="font-medium text-right">{studentData.age} years</div>
              <div className="text-muted-foreground">Gender</div>
              <div className="font-medium text-right">{studentData.gender}</div>
              <div className="text-muted-foreground">Height</div>
              <div className="font-medium text-right">{studentData.height} cm</div>
              <div className="text-muted-foreground">Weight</div>
              <div className="font-medium text-right">{studentData.weight} kg</div>
              <div className="text-muted-foreground">BMI</div>
              <div className="font-medium text-right flex items-center justify-end gap-1">
                {studentData.bmi}
                <Badge variant="outline" className={`px-1.5 ${bmiClass.color} text-white`}>
                  {bmiClass.label}
                </Badge>
              </div>
            </div>
            
            <div className="pt-4 space-y-2">
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full gap-1" variant="outline">
                    <Pencil className="h-3.5 w-3.5" />
                    Edit Student
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                  <DialogHeader>
                    <DialogTitle>Edit Student</DialogTitle>
                    <DialogDescription>
                      Update the student information and click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <StudentForm 
                    studentData={studentData} 
                    onSuccess={() => setOpenDialog(false)} 
                  />
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="w-full gap-1 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                <Trash className="h-3.5 w-3.5" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3 space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full md:w-auto grid grid-cols-4 h-auto">
              <TabsTrigger value="overview" className="gap-1.5 py-2">
                <InfoIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="growth" className="gap-1.5 py-2">
                <ActivityIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Growth</span>
              </TabsTrigger>
              <TabsTrigger value="trends" className="gap-1.5 py-2">
                <LineChart className="h-4 w-4" />
                <span className="hidden sm:inline">Trends</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-1.5 py-2">
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Student Information</CardTitle>
                  <CardDescription>Complete profile information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-base">Personal Details</h3>
                      <div className="grid grid-cols-2 gap-y-3 text-sm">
                        <div className="text-muted-foreground">Full Name</div>
                        <div className="font-medium">{studentData.name}</div>
                        <div className="text-muted-foreground">Date of Birth</div>
                        <div className="font-medium">{new Date(studentData.birthDate).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">Gender</div>
                        <div className="font-medium">{studentData.gender}</div>
                        <div className="text-muted-foreground">Class</div>
                        <div className="font-medium">{studentData.classGroup}</div>
                        <div className="text-muted-foreground">Enrollment Date</div>
                        <div className="font-medium">{new Date(studentData.enrollmentDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-base">Contact Information</h3>
                      <div className="grid grid-cols-2 gap-y-3 text-sm">
                        <div className="text-muted-foreground">Parent/Guardian</div>
                        <div className="font-medium">{studentData.parentName}</div>
                        <div className="text-muted-foreground">Contact</div>
                        <div className="font-medium">{studentData.parentContact}</div>
                        <div className="text-muted-foreground">Address</div>
                        <div className="font-medium">{studentData.address}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="growth">
              <Card>
                <CardHeader>
                  <CardTitle>Growth Chart</CardTitle>
                  <CardDescription>
                    Height and weight measurements over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GrowthChart measurements={studentData.measurements} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trends">
              <Card>
                <CardHeader>
                  <CardTitle>Health Trends</CardTitle>
                  <CardDescription>
                    BMI and growth percentiles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 flex items-center justify-center">
                    <p className="text-muted-foreground">Trends visualization will be available soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Measurement History</CardTitle>
                  <CardDescription>
                    Record of all measurements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute h-full w-[1px] bg-muted left-0 md:left-24"></div>
                    <ul className="space-y-4">
                      {studentData.measurements.map((measurement, index) => (
                        <li key={index} className="relative pl-6 md:pl-32">
                          <div className="absolute left-[-8px] md:left-[88px] top-1 h-4 w-4 rounded-full bg-primary"></div>
                          <div className="md:absolute md:left-0 text-sm text-muted-foreground">
                            {new Date(measurement.date).toLocaleDateString()}
                          </div>
                          <div className="bg-card rounded-lg p-3 border">
                            <div className="grid grid-cols-2 gap-y-1 gap-x-4">
                              <div className="text-sm text-muted-foreground">Height</div>
                              <div className="text-sm font-medium">{measurement.height} cm</div>
                              <div className="text-sm text-muted-foreground">Weight</div>
                              <div className="text-sm font-medium">{measurement.weight} kg</div>
                              <div className="text-sm text-muted-foreground">BMI</div>
                              <div className="text-sm font-medium">
                                {(measurement.weight / ((measurement.height / 100) ** 2)).toFixed(1)}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}