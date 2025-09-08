import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, FileText, Lightbulb, CheckCircle2, AlertCircle, BarChart3 } from "lucide-react"

export default function SBAInsightsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/loan-options">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">SBA Loan Insights</h2>
          <p className="text-muted-foreground">Personalized insights to improve your SBA loan application</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Match Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Current Score</span>
                <span className="font-medium">85%</span>
              </div>
              <Progress value={85} className="h-1.5" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Potential: 95% with improvements</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missing Documents</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Critical documents needed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Strengths</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Strong qualification areas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improvement Areas</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Areas needing attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requirements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requirements" className="flex gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Requirements
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="improvements" className="flex gap-2">
            <Lightbulb className="h-4 w-4" />
            Improvements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requirements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SBA Loan Requirements</CardTitle>
              <CardDescription>Key requirements and your current status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start justify-between border-b pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <p className="font-medium">Business Age</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Requirement: 2+ years in business</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">Met</p>
                    <p className="text-sm text-muted-foreground">Your business: 3 years</p>
                  </div>
                </div>

                <div className="flex items-start justify-between border-b pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <p className="font-medium">Personal Credit Score</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Requirement: 680+ credit score</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">Met</p>
                    <p className="text-sm text-muted-foreground">Your score: 710</p>
                  </div>
                </div>

                <div className="flex items-start justify-between border-b pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <p className="font-medium">Annual Revenue</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Requirement: $100,000+ annual revenue</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">Met</p>
                    <p className="text-sm text-muted-foreground">Your revenue: $350,000</p>
                  </div>
                </div>

                <div className="flex items-start justify-between border-b pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                      <p className="font-medium">Debt-to-Income Ratio</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Requirement: Below 43%</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-amber-600">Needs Improvement</p>
                    <p className="text-sm text-muted-foreground">Your ratio: 45%</p>
                  </div>
                </div>

                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <p className="font-medium">Business Plan</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Requirement: Detailed business plan</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">Met</p>
                    <p className="text-sm text-muted-foreground">Plan uploaded</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
              <CardDescription>Documents needed for SBA loan application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start justify-between border-b pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <p className="font-medium">Business Registration</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Certificate of incorporation</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">Uploaded</p>
                    <p className="text-sm text-muted-foreground">May 10, 2023</p>
                  </div>
                </div>

                <div className="flex items-start justify-between border-b pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <p className="font-medium">Business License</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Current business operating license</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">Uploaded</p>
                    <p className="text-sm text-muted-foreground">May 10, 2023</p>
                  </div>
                </div>

                <div className="flex items-start justify-between border-b pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <p className="font-medium">Business Tax Returns</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Last 2 years of business tax returns</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">Missing</p>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/dashboard/documents">Upload</Link>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start justify-between border-b pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <p className="font-medium">Financial Statements</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Balance sheet and income statements</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">Uploaded</p>
                    <p className="text-sm text-muted-foreground">Mar 20, 2023</p>
                  </div>
                </div>

                <div className="flex items-start justify-between border-b pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <p className="font-medium">Bank Statements</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Last 6 months of business bank statements</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">Uploaded</p>
                    <p className="text-sm text-muted-foreground">Apr 15, 2023</p>
                  </div>
                </div>

                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <p className="font-medium">Collateral Documentation</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Property deeds or equipment ownership proof</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">Missing</p>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/dashboard/documents">Upload</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="improvements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Improvement Recommendations</CardTitle>
              <CardDescription>Personalized suggestions to improve your SBA loan application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Upload Missing Tax Returns</h3>
                    <p className="text-sm text-muted-foreground">
                      SBA loans require at least 2 years of business tax returns. Upload your 2021 and 2022 tax returns
                      to significantly improve your application strength.
                    </p>
                    <div className="pt-2">
                      <Button size="sm" asChild>
                        <Link href="/dashboard/documents">Upload Tax Returns</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Add Collateral Documentation</h3>
                    <p className="text-sm text-muted-foreground">
                      SBA loans typically require collateral. Document your business property, equipment, or other
                      assets that can serve as collateral for the loan.
                    </p>
                    <div className="pt-2">
                      <Button size="sm" asChild>
                        <Link href="/dashboard/documents">Upload Collateral Documents</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Improve Debt-to-Income Ratio</h3>
                    <p className="text-sm text-muted-foreground">
                      Your current debt-to-income ratio is 45%, slightly above the preferred maximum of 43%. Consider
                      paying down some existing debt or increasing your business income to improve this ratio.
                    </p>
                    <div className="pt-2">
                      <Button size="sm" variant="outline">
                        View Debt Reduction Strategies
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/dashboard/loan-options">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Loan Options
          </Link>
        </Button>
      </div>
    </div>
  )
}
