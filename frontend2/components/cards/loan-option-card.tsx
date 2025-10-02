import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LoanOptionCardProps {
  id: number
  bankName: string
  productName: string
  loanType: string
  interestRate: string
  tenor: string
  maxAmount: string
  estimatedScore: number
  requiredDocs: string[]
  keyRequirement: string
  averageProcessingTime: string
  features: string[]
  rank: number
  onApply: () => Promise<void>
  isSubmitting: boolean
}

export function LoanOptionCard({
  bankName,
  productName,
  interestRate,
  tenor,
  maxAmount,
  estimatedScore,
  requiredDocs,
  keyRequirement,
  averageProcessingTime,
  features,
  rank,
  onApply,
  isSubmitting,
}: LoanOptionCardProps) {
  const getScoreBadge = (score: number) => {
    if (score >= 80) return { label: "Excellent", variant: "default" as const }
    if (score >= 60) return { label: "Good", variant: "secondary" as const }
    return { label: "Fair", variant: "outline" as const }
  }

  const scoreBadge = getScoreBadge(estimatedScore)

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{bankName}</CardTitle>
          {rank === 1 && <Badge className="bg-primary text-primary-foreground">Best</Badge>}
        </div>
        <p className="text-sm text-muted-foreground">{productName}</p>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Interest Rate</p>
            <p className="font-semibold">{interestRate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Tenor</p>
            <p className="font-semibold">{tenor}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Max Amount</p>
            <p className="font-semibold">{maxAmount}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Score</p>
            <Badge variant={scoreBadge.variant}>{scoreBadge.label}</Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Key Requirement</p>
            <p className="font-semibold">{keyRequirement}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Processing Time</p>
            <p className="font-semibold">{averageProcessingTime}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Required Documents</p>
          <div className="flex flex-wrap gap-2">
            {requiredDocs.map((doc, index) => (
              <Badge key={index} variant="outline">
                {doc}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Features</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onApply} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Apply now"}
        </Button>
      </CardFooter>
    </Card>
  )
}
