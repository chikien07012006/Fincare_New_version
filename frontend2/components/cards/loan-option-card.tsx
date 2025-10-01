import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, TrendingUp, Clock, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

interface LoanOptionCardProps {
  bankName: string
  productName: string
  interestRate: string
  tenor: string
  maxAmount: string
  estimatedScore: number
  requiredDocs: string[]
  features: string[]
  rank: number
}

export function LoanOptionCard({
  bankName,
  productName,
  interestRate,
  tenor,
  maxAmount,
  estimatedScore,
  requiredDocs,
  features,
  rank,
}: LoanOptionCardProps) {
  const getScoreBadge = (score: number) => {
    if (score >= 80) return { label: "Excellent Match", variant: "default" as const }
    if (score >= 60) return { label: "Good Match", variant: "secondary" as const }
    if (score >= 40) return { label: "Fair Match", variant: "outline" as const }
    return { label: "Low Match", variant: "outline" as const }
  }

  const scoreBadge = getScoreBadge(estimatedScore)

  return (
    <Card className="hover:shadow-lg transition-shadow relative">
      {rank === 1 && (
        <div className="absolute -top-3 left-6">
          <Badge className="bg-primary text-primary-foreground">Best Match</Badge>
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl">{bankName}</CardTitle>
                <CardDescription>{productName}</CardDescription>
              </div>
            </div>
          </div>
          <Badge variant={scoreBadge.variant}>{scoreBadge.label}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Key Details */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">Interest Rate</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{interestRate}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-medium">Tenor</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{tenor}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span className="text-xs font-medium">Max Amount</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{maxAmount}</p>
          </div>
        </div>

        {/* Estimated Score */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Estimated Approval Score</span>
          <Badge variant="secondary" className="text-base font-semibold px-3 py-1">
            {estimatedScore}/100
          </Badge>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Key Features</p>
          <ul className="space-y-1.5">
            {features.map((feature, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Required Documents */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Required Documents ({requiredDocs.length})</p>
          <div className="flex flex-wrap gap-2">
            {requiredDocs.slice(0, 3).map((doc, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {doc}
              </Badge>
            ))}
            {requiredDocs.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{requiredDocs.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Link href="/dashboard/analysis" className="flex-1">
          <Button variant="outline" className="w-full bg-transparent">
            View Analysis
          </Button>
        </Link>
        <Link href="/dashboard/documents" className="flex-1">
          <Button className="w-full">
            Apply Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
