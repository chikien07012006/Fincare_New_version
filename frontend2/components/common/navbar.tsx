"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="font-bold text-xl text-foreground">FinCare</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/loan-form"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Find Loans
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="/how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/loan-form">
              <Button>Get Started</Button>
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/loan-form" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
              Find Loans
            </Link>
            <Link href="/about" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link
              href="/how-it-works"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              How It Works
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Link href="/auth/sign-in">
                <Button variant="ghost" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/loan-form">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
