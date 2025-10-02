"use client"

import { useEffect, useState } from "react"
import { LoanOptionCard } from "@/components/cards/loan-option-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Filter, SlidersHorizontal, Grid3x3, TableIcon } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

const mockIndividualLoanOptions = [
  {
    id: 1,
    bankName: "Vietcombank",
    productName: "Personal Loan Plus",
    loanType: "car",
    interestRate: "12% - 15%",
    tenor: "1-5 years",
    maxAmount: "500M VND",
    estimatedScore: 0,
    requiredDocs: ["ID Card", "Income Proof", "Bank Statements"],
    keyRequirement: "Min. Income: 25M VND",
    averageProcessingTime: "Avg. 7-10 working days",
    features: ["No collateral required", "Quick approval in 24 hours", "Flexible repayment", "Competitive rates"],
  },
  {
    id: 2,
    bankName: "Techcombank",
    productName: "Vehicle Financing",
    loanType: "car",
    interestRate: "10% - 13%",
    tenor: "2-7 years",
    maxAmount: "2B VND",
    estimatedScore: 0,
    requiredDocs: ["ID Card", "Income Proof", "Vehicle Documents"],
    keyRequirement: "Min. Income: 20M VND",
    averageProcessingTime: "Avg. 5-7 working days",
    features: ["Up to 80% financing", "Fast disbursement", "Competitive interest rates", "Flexible down payment"],
  },
  {
    id: 3,
    bankName: "BIDV",
    productName: "Home Loan",
    loanType: "real_estate",
    interestRate: "8% - 11%",
    tenor: "5-20 years",
    maxAmount: "5B VND",
    estimatedScore: 0,
    requiredDocs: ["ID Card", "Income Proof", "Property Documents", "Collateral Appraisal"],
    keyRequirement: "Min. Income: 30M VND",
    averageProcessingTime: "Avg. 10-15 working days",
    features: ["Long repayment terms", "Low interest rates", "Up to 70% LTV", "Grace period available"],
  },
  {
    id: 4,
    bankName: "VPBank",
    productName: "Quick Cash Loan",
    loanType: "car",
    interestRate: "15% - 18%",
    tenor: "6 months - 3 years",
    maxAmount: "200M VND",
    estimatedScore: 0,
    requiredDocs: ["ID Card", "Income Proof"],
    keyRequirement: "Min. Income: 15M VND",
    averageProcessingTime: "Avg. 3-5 working days",
    features: ["Instant approval", "Minimal documentation", "No collateral", "Online application"],
  },
]

export default function IndividualLoanOptionsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem("loanFormData")
    if (data) {
      setFormData(JSON.parse(data))
    }
  }, [])

  const handleApply = async (loan: typeof mockIndividualLoanOptions[0]) => {
    setIsSubmitting(true)
    try {
      // Chuẩn bị dữ liệu loan option
      const loanOption = {
        bank_name: loan.bankName,
        loan_type: loan.loanType,
        title: loan.productName,
        exclusive_interest_rate: loan.interestRate,
        estimated_term: loan.tenor,
        key_requirement: loan.keyRequirement,
        average_processing_time: loan.averageProcessingTime,
      }

      // Tổng hợp dữ liệu
      const updatedData = {
        loan_application: formData,
        loan_option: loanOption,
      }

      // In dữ liệu để debug
      console.log("Submitting loan option:", updatedData)

      // Lưu vào localStorage
      localStorage.setItem("loanFormData", JSON.stringify(updatedData))

      // Giả định gửi đến backend hoặc Gemini API
      const response = await fetch("http://localhost:8000/api/loan_options/gemini/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add Authorization header if required
          // "Authorization": "Bearer your-token-here",
        },
        body: JSON.stringify(updatedData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit to Gemini API")
      }

      // Get analysis result from API response
      const analysisResult = await response.json()

      // Format analysis result to ensure all expected fields are present
      const formattedAnalysisResult = {
        loan_readiness_score: analysisResult.loan_readiness_score || 0,
        dti: analysisResult.dti || 0,
        ltv: analysisResult.ltv || null,
        breakdown_scores: {
          credit_score: analysisResult.breakdown_scores?.credit_score || 0,
          income_stability: analysisResult.breakdown_scores?.income_stability || 0,
          debt_to_income: analysisResult.breakdown_scores?.debt_to_income || 0,
          employment_history: analysisResult.breakdown_scores?.employment_history || 0,
          credit_utilization: analysisResult.breakdown_scores?.credit_utilization || 0,
          payment_history: analysisResult.breakdown_scores?.payment_history || 0,
        },
        reasoning: analysisResult.reasoning || "",
        improvement_advice: analysisResult.improvement_advice || [],
      }

      // Save to localStorage with analysis result
      localStorage.setItem(
        "loanFormData",
        JSON.stringify({
          ...updatedData,
          analysis_result: formattedAnalysisResult,
        })
      )

      // Navigate to analysis page
      router.push("/dashboard-individual/analysis")
    } catch (error) {
      console.error("Error submitting loan option:", error)
      alert("Error submitting loan option. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { label: "Excellent", variant: "default" as const, color: "bg-primary" }
    if (score >= 60) return { label: "Good", variant: "secondary" as const, color: "bg-secondary" }
    return { label: "Fair", variant: "outline" as const, color: "bg-muted" }
  }

  // Lọc loan options theo loan_type nếu formData tồn tại
  const filteredLoanOptions = formData?.loan_type
    ? mockIndividualLoanOptions.filter((loan) => loan.loanType === formData.loan_type)
    : mockIndividualLoanOptions

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">Your Loan Matches</h1>
              <p className="text-lg text-muted-foreground mt-2">
                We found {filteredLoanOptions.length} loan options based on your profile
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
                  <p className="text-sm text-muted-foreground mb-1">Applicant</p>
                  <p className="font-semibold text-foreground">{formData.fullName || "Individual"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Loan Amount</p>
                  <p className="font-semibold text-foreground">
                    {Number(formData.loan_amount || 0).toLocaleString()} VND
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Loan Type</p>
                  <p className="font-semibold text-foreground capitalize">
                    {formData.loan_type?.replace("_", " ") || "Personal"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredLoanOptions.map((loan, index) => (
              <LoanOptionCard
                key={loan.id}
                id={loan.id}
                bankName={loan.bankName}
                productName={loan.productName}
                loanType={loan.loanType}
                interestRate={loan.interestRate}
                tenor={loan.tenor}
                maxAmount={loan.maxAmount}
                estimatedScore={loan.estimatedScore}
                requiredDocs={loan.requiredDocs}
                keyRequirement={loan.keyRequirement}
                averageProcessingTime={loan.averageProcessingTime}
                features={loan.features}
                rank={index + 1}
                onApply={() => handleApply(loan)}
                isSubmitting={isSubmitting}
              />
            ))}
          </div>
        ) : (
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
                  {filteredLoanOptions.map((loan, index) => {
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
                          <Button
                            size="sm"
                            onClick={() => handleApply(loan)}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Apply now"}
                          </Button>
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
              Apply for a loan option to view detailed analysis and understand your approval chances.
            </p>
            <Button variant="outline" disabled>
              View Detailed Analysis (Available after applying)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
