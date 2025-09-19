"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 text-white backdrop-blur-md supports-[backdrop-filter]:bg-black/30">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-white/20" />
            <Link href="/" className="text-sm font-semibold tracking-tight sm:text-base">
              FinCare
            </Link>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-white/70 sm:flex">
            <Link href="#features" className="hover:text-white">
              Features
            </Link>
            <Link href="#how" className="hover:text-white">
              How it works
            </Link>
            <Link href="#faq" className="hover:text-white">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="#early-access">
              <Button variant="default" className="bg-emerald-700 hover:bg-emerald-600 focus-visible:ring-emerald-700/50">
                Get Early Access
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}


