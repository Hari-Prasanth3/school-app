"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeasurementChart } from "@/components/dashboard/measurement-chart";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-provider";
import { 
  Users, 
  Ruler, 
  Weight, 
  CalendarClock, 
  ArrowUpRight,
  ArrowDownRight,
  FileBarChart
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">246</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +2.5%
              </span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Height</CardTitle>
            <Ruler className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">138.5 cm</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +0.8%
              </span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Weight</CardTitle>
            <Weight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.3 kg</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center gap-1">
                <ArrowDownRight className="h-3 w-3" />
                -0.2%
              </span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Update</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
            <p className="text-xs text-muted-foreground">11:23 AM</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Growth Measurements</CardTitle>
            <CardDescription>
              Average height and weight trends over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="3-months">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="1-month">1M</TabsTrigger>
                  <TabsTrigger value="3-months">3M</TabsTrigger>
                  <TabsTrigger value="6-months">6M</TabsTrigger>
                  <TabsTrigger value="1-year">1Y</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm" className="text-xs gap-1">
                  <FileBarChart className="h-3 w-3" />
                  Export
                </Button>
              </div>
              <TabsContent value="1-month" className="mt-4">
                <MeasurementChart timeRange="1month" />
              </TabsContent>
              <TabsContent value="3-months" className="mt-4">
                <MeasurementChart timeRange="3months" />
              </TabsContent>
              <TabsContent value="6-months" className="mt-4">
                <MeasurementChart timeRange="6months" />
              </TabsContent>
              <TabsContent value="1-year" className="mt-4">
                <MeasurementChart timeRange="1year" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Health Status</CardTitle>
            <CardDescription>
              Overall student health statistics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm">Healthy Weight (67%)</div>
                <div className="text-sm font-medium">164 students</div>
              </div>
              <Progress value={67} className="h-2 bg-secondary" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm">Underweight (18%)</div>
                <div className="text-sm font-medium">44 students</div>
              </div>
              <Progress value={18} className="h-2 bg-secondary" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm">Overweight (15%)</div>
                <div className="text-sm font-medium">38 students</div>
              </div>
              <Progress value={15} className="h-2 bg-secondary" />
            </div>
            <div className="pt-4">
              <Button variant="outline" className="w-full">View Detailed Report</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}