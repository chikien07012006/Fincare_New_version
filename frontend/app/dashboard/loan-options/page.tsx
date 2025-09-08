"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Filter, Search } from "lucide-react"
import { useDocuments } from "@/contexts/document-context"
import LoadingAnalysis from "./loading"

export default function LoanOptionsPage() {
  const { isSubmitted } = useDocuments()

  const [analysis, setAnalysis] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSubmitted) return

    async function fetchAnalysis() {
      // In real scenario, you might fetch from server. For now, use localStorage
      const stored = localStorage.getItem('loan-analysis-data')
      if (stored) {
        setAnalysis(JSON.parse(stored))
      } else {
        // fallback: wait 5s to simulate network
        await new Promise(r => setTimeout(r, 5000))
      }
      setLoading(false)
    }
    fetchAnalysis()
  }, [isSubmitted])

  if (!isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-6 p-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Loan Options Locked</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Please upload and submit your documents first. Once submitted, our AI will analyze them and unlock matching loan options.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/documents">Go to Document Upload</Link>
        </Button>
      </div>
    )
  }

  if (loading) {
    return <LoadingAnalysis />
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Matching Loan Options</h2>
        <p className="text-muted-foreground">
          Based on your profile and documents, here are loan options that match your business
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search loan options..."
            className="w-full rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter Options
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[
          {
            title: "SBA Small Business Loan",
            match: 85,
            amount: "$50k - $150k",
          },
          {
            title: "Business Line of Credit",
            match: 78,
            amount: "$25k - $75k",
          },
          {
            title: "Equipment Financing",
            match: 92,
            amount: "$10k - $50k",
          },
        ].map((opt, idx) => (
          <Card key={idx} className="hover:shadow-sm transition">
            <CardHeader className="pb-2 flex-row items-center justify-between gap-2">
              <CardTitle className="text-base font-semibold flex-1 line-clamp-2">
                {opt.title}
              </CardTitle>
              <Badge className="bg-green-100 text-green-800">{opt.match}% Match</Badge>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1 pb-4">
              <p>Loan Amount: <span className="font-medium text-foreground">{opt.amount}</span></p>
              <Button asChild size="sm" className="mt-2 w-full">
                <Link href={`/dashboard/loan-options/sba-insights`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
              </div>
    </div>
  )
}
