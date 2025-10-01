"use client"

import { useEffect, useState } from "react"
import { LoanOptionCard } from "@/components/cards/loan-option-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Filter, SlidersHorizontal, Grid3x3, TableIcon } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const mockLoanOptions = [
  {
    id: 1,
    bankName: "Vietcombank",
    productName: "SME Business Loan",
    interestRate: "8.5% - 10%",
    tenor: "1-5 years",
    maxAmount: "5B VND",
    estimatedScore: 85,
    requiredDocs: ["Business License", "Financial Statements", "Tax Returns", "Collateral Documents"],
    features: [
      "No early repayment penalty",
      "Flexible repayment schedule",
      "Quick approval in 5-7 days",
      "Competitive interest rates",
    ],
  },
  {
    id: 2,
    bankName: "BIDV",
    productName: "Working Capital Loan",
    interestRate: "9% - 11%",
    tenor: "6 months - 3 years",
    maxAmount: "3B VND",
    estimatedScore: 78,
    requiredDocs: ["Business License", "Financial Statements", "Bank Statements", "Business Plan"],
    features: [
      "Fast disbursement",
      "Minimal documentation",
      "Revolving credit facility",
      "Online application available",
    ],
  },
  {
    id: 3,
    bankName: "Techcombank",
    productName: "Growth Financing",
    interestRate: "8% - 9.5%",
    tenor: "1-7 years",
    maxAmount: "10B VND",
    estimatedScore: 72,
    requiredDocs: ["Business License", "Financial Statements", "Tax Returns", "Collateral Documents", "Business Plan"],
    features: ["Higher loan amounts", "Longer repayment terms", "Dedicated relationship manager", "Customizable terms"],
  },
  {
    id: 4,
    bankName: "VPBank",
    productName: "SME Express Loan",
    interestRate: "10% - 12%",
    tenor: "6 months - 2 years",
    maxAmount: "2B VND",
    estimatedScore: 65,
    requiredDocs: ["Business License", "Financial Statements", "Bank Statements"],
    features: ["Quick approval in 24-48 hours", "Minimal collateral required", "Simple application process"],
  },
  {
    id: 5,
    bankName: "ACB",
    productName: "Business Expansion Loan",
    interestRate: "9.5% - 11.5%",
    tenor: "1-5 years",
    maxAmount: "4B VND",
    estimatedScore: 58,
    requiredDocs: ["Business License", "Financial Statements", "Tax Returns", "Business Plan", "Collateral Documents"],
    features: ["Flexible use of funds", "Grace period available", "Competitive rates for existing customers"],
  },
]

export default function LoanOptionsPage() {
  const [formData, setFormData] = useState<any>(null)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

  useEffect(() => {
    const data = localStorage.getItem("loanFormData")
    if (data) {
      setFormData(JSON.parse(data))
    }
  }, [])

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { label: "Excellent", variant: "default" as const, color: "bg-primary" }
    if (score >= 60) return { label: "Good", variant: "secondary" as const, color: "bg-secondary" }
    return { label: "Fair", variant: "outline" as const, color: "bg-muted" }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">Your Loan Matches</h1>
              <p className="text-lg text-muted-foreground mt-2">
                We found {mockLoanOptions.length} loan options based on your requirements
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="gap-2"
                >
                  <Grid3x3 className="h-4 w-4" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === "table" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className="gap-2"
                >
                  <TableIcon className="h-4 w-4" />
                  Table
                </Button>
              </div>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <SlidersHorizontal className="h-4 w-4" />
                Sort
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        {formData && (
          <Card className="bg-secondary/50 border-primary/20">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Business Type</p>
                  <p className="font-semibold text-foreground capitalize">{formData.userType?.replace("-", " ")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Loan Amount</p>
                  <p className="font-semibold text-foreground">{Number(formData.loanAmount).toLocaleString()} VND</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Purpose</p>
                  <p className="font-semibold text-foreground capitalize">{formData.loanPurpose?.replace("-", " ")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {viewMode === "grid" ? (
          // Grid View - multiple columns
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockLoanOptions.map((loan, index) => (
              <LoanOptionCard key={loan.id} {...loan} rank={index + 1} />
            ))}
          </div>
        ) : (
          // Table View
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Bank & Product</TableHead>
                    <TableHead>Interest Rate</TableHead>
                    <TableHead>Tenor</TableHead>
                    <TableHead>Max Amount</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLoanOptions.map((loan, index) => {
                    const scoreBadge = getScoreBadge(loan.estimatedScore)
                    return (
                      <TableRow key={loan.id}>
                        <TableCell className="font-medium">
                          {index === 0 && <Badge className="bg-primary text-primary-foreground mr-2">Best</Badge>}#
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-semibold text-foreground">{loan.bankName}</p>
                            <p className="text-sm text-muted-foreground">{loan.productName}</p>
                          </div>
                        </TableCell>
                        <TableCell>{loan.interestRate}</TableCell>
                        <TableCell>{loan.tenor}</TableCell>
                        <TableCell>{loan.maxAmount}</TableCell>
                        <TableCell>
                          <Badge variant={scoreBadge.variant}>{loan.estimatedScore}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Link href="/dashboard/analysis">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </Link>
                            <Link href="/dashboard/documents">
                              <Button size="sm">Apply</Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="bg-muted/30">
          <CardContent className="p-6 text-center space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Need Help Choosing?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              View detailed analysis for each loan option to understand your approval chances and get personalized
              recommendations.
            </p>
            <Link href="/dashboard/analysis">
              <Button variant="outline">View Detailed Analysis</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
