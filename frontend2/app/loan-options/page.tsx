"use client"

import { useEffect, useState } from "react"
import { LoanOptionCard } from "@/components/cards/loan-option-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Filter, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

// Mock loan data
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

  useEffect(() => {
    // Load form data from localStorage
    const data = localStorage.getItem("loanFormData")
    if (data) {
      setFormData(JSON.parse(data))
    }
  }, [])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link href="/loan-form">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Form
            </Button>
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">Your Loan Matches</h1>
              <p className="text-lg text-muted-foreground mt-2">
                We found {mockLoanOptions.length} loan options based on your requirements
              </p>
            </div>

            <div className="flex items-center gap-3">
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

        {/* Loan Options */}
        <div className="space-y-6">
          {mockLoanOptions.map((loan, index) => (
            <LoanOptionCard key={loan.id} {...loan} rank={index + 1} />
          ))}
        </div>

        {/* Help Section */}
        <Card className="bg-muted/30">
          <CardContent className="p-6 text-center space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Need Help Choosing?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              View detailed analysis for each loan option to understand your approval chances and get personalized
              recommendations.
            </p>
            <Link href="/analysis">
              <Button variant="outline">View Detailed Analysis</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
