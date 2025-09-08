"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  PiggyBank,
  Settings,
  LogOut
} from "lucide-react"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FileText
  },
  {
    title: "Loan Options",
    href: "/dashboard/loan-options",
    icon: PiggyBank
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      {/* Logo and title */}
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-bold">FinCare</span>
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {sidebarLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{link.title}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t p-4">
        <button className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  )
} 