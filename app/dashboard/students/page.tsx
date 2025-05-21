"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/dashboard/data-table";
import { StudentForm } from "@/components/dashboard/student-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, Search, Filter } from "lucide-react";
import Link from "next/link";

// Sample data - would come from API in a real app
const students = [
  {
    id: "1",
    name: "Emma Johnson",
    classGroup: "Grade 5-A",
    age: 10,
    gender: "Female",
    height: 142.5,
    weight: 35.2,
    lastUpdated: "2023-04-15T09:30:00",
  },
  {
    id: "2",
    name: "Michael Chen",
    classGroup: "Grade 5-B",
    age: 11,
    gender: "Male",
    height: 145.8,
    weight: 38.1,
    lastUpdated: "2023-04-14T10:45:00",
  },
  {
    id: "3",
    name: "Sophia Garcia",
    classGroup: "Grade 5-A",
    age: 10,
    gender: "Female",
    height: 138.4,
    weight: 33.6,
    lastUpdated: "2023-04-15T11:15:00",
  },
  {
    id: "4",
    name: "Liam Wilson",
    classGroup: "Grade 6-A",
    age: 12,
    gender: "Male",
    height: 151.2,
    weight: 42.3,
    lastUpdated: "2023-04-13T09:00:00",
  },
  {
    id: "5",
    name: "Olivia Martinez",
    classGroup: "Grade 6-B",
    age: 11,
    gender: "Female",
    height: 147.6,
    weight: 39.8,
    lastUpdated: "2023-04-14T14:30:00",
  },
  {
    id: "6",
    name: "Noah Lee",
    classGroup: "Grade 6-A",
    age: 12,
    gender: "Male",
    height: 152.8,
    weight: 43.5,
    lastUpdated: "2023-04-15T10:00:00",
  },
  {
    id: "7",
    name: "Ava Williams",
    classGroup: "Grade 5-B",
    age: 10,
    gender: "Female",
    height: 140.1,
    weight: 34.9,
    lastUpdated: "2023-04-15T13:45:00",
  },
  {
    id: "8",
    name: "Ethan Brown",
    classGroup: "Grade 6-B",
    age: 11,
    gender: "Male",
    height: 149.4,
    weight: 41.2,
    lastUpdated: "2023-04-13T11:30:00",
  },
];

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }: any) => {
      return (
        <Link href={`/dashboard/students/${row.original.id}`} className="font-medium hover:underline">
          {row.original.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "classGroup",
    header: "Class",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "height",
    header: "Height (cm)",
  },
  {
    accessorKey: "weight",
    header: "Weight (kg)",
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
    cell: ({ row }: any) => {
      return new Date(row.original.lastUpdated).toLocaleDateString();
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/students/${row.original.id}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/students/${row.original.id}/edit`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">Manage student records and health data</p>
        </div>
        
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Fill in the student information and click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <StudentForm onSuccess={() => setOpenDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Student List</CardTitle>
          <CardDescription>
            Displaying all students with their latest measurements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all-grades">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-grades">All Classes</SelectItem>
                  <SelectItem value="grade-5a">Grade 5-A</SelectItem>
                  <SelectItem value="grade-5b">Grade 5-B</SelectItem>
                  <SelectItem value="grade-6a">Grade 6-A</SelectItem>
                  <SelectItem value="grade-6b">Grade 6-B</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <DataTable 
            columns={columns} 
            data={students.filter(student => 
              student.name.toLowerCase().includes(search.toLowerCase())
            )} 
          />
        </CardContent>
      </Card>
    </div>
  );
}