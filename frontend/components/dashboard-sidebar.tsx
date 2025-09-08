"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, LayoutDashboard, FileText, Settings, LogOut, User, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider defaultOpen>
      <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr]">
        <Sidebar>
          <SidebarHeader className="flex h-14 items-center border-b px-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold">
              <Building2 className="h-6 w-6 text-primary" />
              <span>FinCare</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/documents"}>
                  <Link href="/dashboard/documents">
                    <FileText className="h-4 w-4" />
                    <span>Documents</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/loan-options"}>
                  <Link href="/dashboard/loan-options">
                    <CreditCard className="h-4 w-4" />
                    <span>Loan Options</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"}>
                  <Link href="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/profile"}>
                  <Link href="/dashboard/profile">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <LogOut className="h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">FinCare Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/documents">Upload Documents</Link>
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
