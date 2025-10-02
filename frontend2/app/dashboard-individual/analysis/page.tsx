"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Bar, Radar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
} from "chart.js"

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
)

export default function AnalysisPage() {
  const router = useRouter()
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const data = localStorage.getItem("loanFormData")
    if (data) {
      try {
        const parsedData = JSON.parse(data)
        setAnalysisData(parsedData.analysis_result)
        setIsLoading(false)
      } catch (err) {
        console.error("Error parsing loanFormData:", err)
        setError("Failed to load analysis data. Please try again.")
        setIsLoading(false)
      }
    } else {
      setError("No analysis data found. Please select a loan option first.")
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-muted-foreground">
        Loading analysis...
      </div>
    )
  }

  if (error || !analysisData) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error || "No analysis data available."}
      </div>
    )
  }

  // Default values
  const breakdownScores = {
    credit_score: analysisData.breakdown_scores?.credit_score || 0,
    income_stability: analysisData.breakdown_scores?.income_stability || 0,
    debt_to_income: analysisData.breakdown_scores?.debt_to_income || 0,
    employment_history: analysisData.breakdown_scores?.employment_history || 0,
    credit_utilization: analysisData.breakdown_scores?.credit_utilization || 0,
    payment_history: analysisData.breakdown_scores?.payment_history || 0,
  }

  // Data for bar chart
  const barData = {
    labels: [
      "Credit Score",
      "Income Stability",
      "Debt-to-Income",
      "Employment History",
      "Credit Utilization",
      "Payment History",
    ],
    datasets: [
      {
        label: "Score Breakdown",
        data: [
          breakdownScores.credit_score,
          breakdownScores.income_stability,
          breakdownScores.debt_to_income,
          breakdownScores.employment_history,
          breakdownScores.credit_utilization,
          breakdownScores.payment_history,
        ],
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        borderColor: "#22c55e",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(34, 197, 94, 0.8)",
      },
    ],
  }

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 20, color: "#6b7280" },
        grid: { color: "rgba(209, 213, 219, 0.2)" },
      },
      x: {
        ticks: { color: "#6b7280" },
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
      } as any,
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuad",
    },
  }

  // Data for radar chart
  const radarData = {
    labels: [
      "Credit Score",
      "Income Stability",
      "Debt-to-Income",
      "Employment History",
      "Credit Utilization",
      "Payment History",
    ],
    datasets: [
      {
        label: "Key Factors",
        data: [
          breakdownScores.credit_score,
          breakdownScores.income_stability,
          breakdownScores.debt_to_income,
          breakdownScores.employment_history,
          breakdownScores.credit_utilization,
          breakdownScores.payment_history,
        ],
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        borderColor: "#22c55e",
        pointBackgroundColor: "#22c55e",
        pointBorderColor: "#ffffff",
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: "#22c55e",
        borderWidth: 2,
      },
    ],
  }

  const radarOptions: ChartOptions<"radar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 20, color: "#6b7280" },
        grid: { color: "rgba(209, 213, 219, 0.2)" },
        pointLabels: {
          font: { size: 12, weight: 500 }, // ✅ FIX: dùng số, không dùng "500"
          color: "#6b7280",
        },
      },
    },
    plugins: {
      legend: { position: "top", labels: { color: "#6b7280" } },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
      } as any,
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuad",
      onComplete: () => {},
    },
  }

  const formatBoldText = (text: string) => {
    return text.split(/(\*\*[^*]+\*\*)/).map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span key={index} className="font-bold">
            {part.slice(2, -2)}
          </span>
        )
      }
      return part
    })
  }

  const reasoningLines: string[] = analysisData.reasoning
    ? analysisData.reasoning
        .split("\n")
        .filter((line: string) => line.trim())
        .map((line: string) => line.trim())
    : ["No reasoning provided."]

  const structuredReasoning = {
    summary: reasoningLines[0] || "Overview not available.",
    strengths: reasoningLines[1] || "Strengths not available.",
    weaknesses: reasoningLines[2] || "Weaknesses not available.",
    matchAnalysis:
      reasoningLines.slice(3).join("\n") ||
      "Match analysis not available.",
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Key Metrics Card */}
        <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
          <CardHeader>
            <CardTitle className="text-2xl">Key Financial Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Debt-to-Income Ratio (DTI)
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {analysisData.dti ? `${analysisData.dti.toFixed(2)}%` : "N/A"}
                  {analysisData.dti && (
                    <span
                      className={`ml-2 text-sm ${
                        analysisData.dti <= 36
                          ? "text-green-600"
                          : analysisData.dti <= 50
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      (
                      {analysisData.dti <= 36
                        ? "Ideal"
                        : analysisData.dti <= 50
                        ? "Moderate"
                        : "High"}
                      )
                    </span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Loan-to-Value Ratio (LTV)
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {analysisData.ltv ? `${analysisData.ltv.toFixed(2)}%` : "N/A"}
                  {analysisData.ltv && (
                    <span
                      className={`ml-2 text-sm ${
                        analysisData.ltv <= 80
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      ({analysisData.ltv <= 80 ? "Ideal" : "High"})
                    </span>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loan Readiness Score + Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader>
              <CardTitle className="text-2xl">Loan-Readiness Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="transparent"
                      stroke="url(#progressGradient)"
                      strokeWidth="10"
                      strokeDasharray={`${
                        2 * Math.PI * 45 *
                        ((analysisData.loan_readiness_score || 0) / 100)
                      } ${2 * Math.PI * 45}`}
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient
                        id="progressGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: "#22c55e", stopOpacity: 1 }}
                        />
                        <stop
                          offset="100%"
                          style={{ stopColor: "#16a34a", stopOpacity: 1 }}
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-4xl font-bold text-foreground">
                      {analysisData.loan_readiness_score || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">out of 100</p>
                  </div>
                </div>
              </div>
              <p className="text-center mt-4 text-muted-foreground">
                Your application shows{" "}
                <span className="font-semibold">
                  {analysisData.loan_readiness_score >= 80
                    ? "excellent"
                    : analysisData.loan_readiness_score >= 60
                    ? "good"
                    : analysisData.loan_readiness_score >= 40
                    ? "fair"
                    : "poor"}
                </span>{" "}
                potential for loan approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Score Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(breakdownScores).map(
                  ([key, value]: [string, number]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <p className="text-sm font-bold text-muted-foreground capitalize">
                        {key.replace("_", " ")} ({value}/100)
                      </p>
                      <div className="w-1/2 bg-muted rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-700 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Key Factors (Radar)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Radar data={radarData} options={radarOptions} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Key Factors (Bar)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Bar data={barData} options={barOptions} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reasoning */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              Analysis Reasoning
              <Badge variant="secondary" className="text-xs">
                Insight
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="group">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Summary
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed pl-4 border-l-2 border-green-500/50 group-hover:border-green-600 transition-colors duration-200">
                  {formatBoldText(structuredReasoning.summary)}
                </p>
              </div>
              <div className="group">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Strengths
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed pl-4 border-l-2 border-green-500/50 group-hover:border-green-600 transition-colors duration-200">
                  {formatBoldText(structuredReasoning.strengths)}
                </p>
              </div>
              <div className="group">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Weaknesses
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed pl-4 border-l-2 border-green-500/50 group-hover:border-green-600 transition-colors duration-200">
                  {formatBoldText(structuredReasoning.weaknesses)}
                </p>
              </div>
              <div className="group">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Match Analysis
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed pl-4 border-l-2 border-green-500/50 group-hover:border-green-600 transition-colors duration-200">
                  {formatBoldText(structuredReasoning.matchAnalysis)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(analysisData.improvement_advice || []).map(
                (advice: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">
                      {index + 1}
                    </Badge>
                    <p className="text-sm text-foreground">
                      {advice || "No advice provided."}
                    </p>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>

        {/* Nav buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Back to Loan Options
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            Apply for Selected Loan
          </Button>
        </div>
      </div>
    </div>
  )
}
