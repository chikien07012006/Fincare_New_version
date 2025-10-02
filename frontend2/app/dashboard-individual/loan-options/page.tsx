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
    logo: "https://hienlaptop.com/wp-content/uploads/2024/12/logo-vietcombank-vector-13.png",
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
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpzDfs9fnFU1jvAmMOxT1K8FZje2LLUliqVQ&s",
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
    logo: "data:image/png;base64,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",
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
    logo: "data:image/png;base64,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",
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
      const loanOption = {
        bank_name: loan.bankName,
        loan_type: loan.loanType,
        title: loan.productName,
        exclusive_interest_rate: loan.interestRate,
        estimated_term: loan.tenor,
        key_requirement: loan.keyRequirement,
        average_processing_time: loan.averageProcessingTime,
      }

      const updatedData = {
        loan_application: formData,
        loan_option: loanOption,
      }

      console.log("Submitting loan option:", updatedData)

      localStorage.setItem("loanFormData", JSON.stringify(updatedData))

      const response = await fetch("http://localhost:8000/api/loan_options/gemini/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit to Gemini API")
      }

      const analysisResult = await response.json()

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

      localStorage.setItem(
        "loanFormData",
        JSON.stringify({
          ...updatedData,
          analysis_result: formattedAnalysisResult,
        })
      )

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

  const filteredLoanOptions = formData?.loan_type
    ? mockIndividualLoanOptions.filter((loan) => loan.loanType === formData.loan_type)
    : mockIndividualLoanOptions

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto space-y-8">
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
                logo={loan.logo}
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
                          {index === 0 && <Badge className="bg-primary text-primary-foreground mr-2">Best</Badge>}#{index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <img src={loan.logo} alt={`${loan.bankName} logo`} className="h-8 w-8 object-contain" />
                            <div>
                              <p className="font-semibold text-foreground">{loan.bankName}</p>
                              <p className="text-sm text-muted-foreground">{loan.productName}</p>
                            </div>
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