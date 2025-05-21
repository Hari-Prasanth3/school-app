"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth-provider";
import {
  ActivitySquare,
  BarChart3,
  Menu,
  Users,
  BookOpen,
  Settings,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}

function NavItem({ href, label, icon, isActive }: NavItemProps) {
  return (
    <Link href={href} className="w-full">
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-2 mb-1",
          isActive ? "bg-secondary" : "hover:bg-secondary/50"
        )}
      >
        {icon}
        {label}
      </Button>
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      href: "/dashboard/students",
      label: "Students",
      icon: <Users className="h-4 w-4" />,
    },
    {
      href: "/dashboard/classes",
      label: "Classes",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile top navigation */}
      <div className="flex items-center justify-between border-b md:hidden p-4">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] p-4">
              <div className="flex items-center gap-2 mb-6">
                <ActivitySquare className="h-6 w-6" />
                <h2 className="text-lg font-bold">HealthTrack</h2>
              </div>
              <div className="space-y-1">
                {routes.map((route) => (
                  <NavItem
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    icon={route.icon}
                    isActive={pathname === route.href}
                  />
                ))}
              </div>
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <ActivitySquare className="h-6 w-6" />
          <h1 className="text-lg font-bold">HealthTrack</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - desktop only */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-card border-r">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
            <div className="flex items-center gap-2 px-4 mb-6">
              <ActivitySquare className="h-6 w-6" />
              <h2 className="text-lg font-bold">HealthTrack</h2>
            </div>
            <div className="space-y-1 px-3">
              {routes.map((route) => (
                <NavItem
                  key={route.href}
                  href={route.href}
                  label={route.label}
                  icon={route.icon}
                  isActive={pathname === route.href}
                />
              ))}
            </div>
            <div className="mt-auto p-3 space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 md:pl-64">
          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}