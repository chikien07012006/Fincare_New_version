"use client"
import { redirect } from "next/navigation"

export default function NewApplicationPage() {
  redirect("/dashboard/documents")
  return null

  // const router = useRouter()
  // const [activeTab, setActiveTab] = useState("details")
  // const [loading, setLoading] = useState(false)

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setLoading(true)

  //   // Simulate submission
  //   setTimeout(() => {
  //     setLoading(false)
  //     router.push("/dashboard/applications")
  //   }, 2000)
  // }

  // return (
  //   <div className="space-y-6">
  //     <div className="flex items-center gap-4">
  //       <Button variant="ghost" size="icon" asChild>
  //         <Link href="/dashboard/applications">
  //           <ArrowLeft className="h-4 w-4" />
  //           <span className="sr-only">Back</span>
  //         </Link>
  //       </Button>
  //       <div>
  //         <h2 className="text-2xl font-bold tracking-tight">New Loan Application</h2>
  //         <p className="text-muted-foreground">Complete the form to submit a new loan application</p>
  //       </div>
  //     </div>

  //     <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
  //       <TabsList className="grid w-full grid-cols-3">
  //         <TabsTrigger value="details">Loan Details</TabsTrigger>
  //         <TabsTrigger value="documents">Documents</TabsTrigger>
  //         <TabsTrigger value="review">Review & Submit</TabsTrigger>
  //       </TabsList>

  //       <TabsContent value="details">
  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Loan Details</CardTitle>
  //             <CardDescription>Provide information about the loan you're applying for</CardDescription>
  //           </CardHeader>
  //           <CardContent className="space-y-4">
  //             <div className="space-y-2">
  //               <Label htmlFor="loan-type">Loan Type</Label>
  //               <Select defaultValue="working-capital">
  //                 <SelectTrigger id="loan-type">
  //                   <SelectValue placeholder="Select loan type" />
  //                 </SelectTrigger>
  //                 <SelectContent>
  //                   <SelectItem value="working-capital">Working Capital Loan</SelectItem>
  //                   <SelectItem value="equipment">Equipment Financing</SelectItem>
  //                   <SelectItem value="expansion">Business Expansion Loan</SelectItem>
  //                   <SelectItem value="line-of-credit">Line of Credit</SelectItem>
  //                   <SelectItem value="sba">SBA Loan</SelectItem>
  //                 </SelectContent>
  //               </Select>
  //             </div>

  //             <div className="space-y-2">
  //               <Label htmlFor="amount">Loan Amount ($)</Label>
  //               <Input id="amount" type="number" placeholder="50000" />
  //             </div>

  //             <div className="space-y-2">
  //               <Label htmlFor="term">Loan Term (months)</Label>
  //               <Select defaultValue="36">
  //                 <SelectTrigger id="term">
  //                   <SelectValue placeholder="Select loan term" />
  //                 </SelectTrigger>
  //                 <SelectContent>
  //                   <SelectItem value="12">12 months</SelectItem>
  //                   <SelectItem value="24">24 months</SelectItem>
  //                   <SelectItem value="36">36 months</SelectItem>
  //                   <SelectItem value="48">48 months</SelectItem>
  //                   <SelectItem value="60">60 months</SelectItem>
  //                 </SelectContent>
  //               </Select>
  //             </div>

  //             <div className="space-y-2">
  //               <Label htmlFor="purpose">Loan Purpose</Label>
  //               <Textarea id="purpose" placeholder="Describe how you plan to use the funds..." rows={4} />
  //             </div>
  //           </CardContent>
  //           <CardFooter className="flex justify-between">
  //             <Button variant="outline" asChild>
  //               <Link href="/dashboard/applications">Cancel</Link>
  //             </Button>
  //             <Button onClick={() => setActiveTab("documents")}>Continue to Documents</Button>
  //           </CardFooter>
  //         </Card>
  //       </TabsContent>

  //       <TabsContent value="documents">
  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Required Documents</CardTitle>
  //             <CardDescription>Upload the necessary documents for your loan application</CardDescription>
  //           </CardHeader>
  //           <CardContent className="space-y-6">
  //             <div className="space-y-4">
  //               <h3 className="text-lg font-medium">Profile Documents</h3>
  //               <div className="grid gap-4 md:grid-cols-2">
  //                 <FileUploader
  //                   label="Business Registration"
  //                   description="Certificate of incorporation or business registration"
  //                   icon={<FileText className="h-4 w-4" />}
  //                 />
  //                 <FileUploader
  //                   label="Business License"
  //                   description="Current business operating license"
  //                   icon={<FileText className="h-4 w-4" />}
  //                 />
  //                 <FileUploader
  //                   label="Tax ID Documentation"
  //                   description="EIN or tax identification documents"
  //                   icon={<FileText className="h-4 w-4" />}
  //                 />
  //                 <FileUploader
  //                   label="Business Plan"
  //                   description="Current business plan (optional)"
  //                   icon={<FileText className="h-4 w-4" />}
  //                 />
  //               </div>
  //             </div>

  //             <div className="space-y-4">
  //               <h3 className="text-lg font-medium">Financial Documents</h3>
  //               <div className="grid gap-4 md:grid-cols-2">
  //                 <FileUploader
  //                   label="Bank Statements"
  //                   description="Last 6 months of business bank statements"
  //                   icon={<FileText className="h-4 w-4" />}
  //                 />
  //                 <FileUploader
  //                   label="Financial Statements"
  //                   description="Balance sheet and income statements"
  //                   icon={<FileText className="h-4 w-4" />}
  //                 />
  //                 <FileUploader
  //                   label="Tax Returns"
  //                   description="Last 2 years of business tax returns"
  //                   icon={<FileText className="h-4 w-4" />}
  //                 />
  //                 <FileUploader
  //                   label="Cash Flow Projections"
  //                   description="Projected cash flow for next 12 months"
  //                   icon={<FileText className="h-4 w-4" />}
  //                 />
  //               </div>
  //             </div>

  //             <div className="space-y-4">
  //               <h3 className="text-lg font-medium">Collateral Documents (if applicable)</h3>
  //               <div className="grid gap-4 md:grid-cols-2">
  //                 <FileUploader
  //                   label="Property Documents"
  //                   description="Deeds, titles, or leases for business property"
  //                   icon={<FileText className="h-4 w-4" />}
  //                 />
  //                 <FileUploader
  //                   label="Equipment Documentation"
  //                   description="Proof of ownership for major equipment"
  //                   icon={<FileText className="h-4 w-4" />}
  //                 />
  //               </div>
  //             </div>
  //           </CardContent>
  //           <CardFooter className="flex justify-between">
  //             <Button variant="outline" onClick={() => setActiveTab("details")}>
  //               Back to Details
  //             </Button>
  //             <Button onClick={() => setActiveTab("review")}>Continue to Review</Button>
  //           </CardFooter>
  //         </Card>
  //       </TabsContent>

  //       <TabsContent value="review">
  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Review & Submit</CardTitle>
  //             <CardDescription>Review your application details before submission</CardDescription>
  //           </CardHeader>
  //           <CardContent className="space-y-6">
  //             <div className="space-y-4">
  //               <h3 className="text-lg font-medium">Loan Details</h3>
  //               <div className="grid gap-4 md:grid-cols-2">
  //                 <div className="space-y-1">
  //                   <p className="text-sm text-muted-foreground">Loan Type</p>
  //                   <p className="font-medium">Working Capital Loan</p>
  //                 </div>
  //                 <div className="space-y-1">
  //                   <p className="text-sm text-muted-foreground">Loan Amount</p>
  //                   <p className="font-medium">$50,000</p>
  //                 </div>
  //                 <div className="space-y-1">
  //                   <p className="text-sm text-muted-foreground">Loan Term</p>
  //                   <p className="font-medium">36 months</p>
  //                 </div>
  //                 <div className="space-y-1">
  //                   <p className="text-sm text-muted-foreground">Estimated Interest Rate</p>
  //                   <p className="font-medium">8.5% - 10.25% APR</p>
  //                 </div>
  //               </div>
  //             </div>

  //             <div className="space-y-4">
  //               <h3 className="text-lg font-medium">Document Checklist</h3>
  //               <div className="grid gap-4 md:grid-cols-2">
  //                 <div className="flex items-center gap-2">
  //                   <div className="h-2 w-2 rounded-full bg-green-500"></div>
  //                   <p>Business Registration</p>
  //                 </div>
  //                 <div className="flex items-center gap-2">
  //                   <div className="h-2 w-2 rounded-full bg-green-500"></div>
  //                   <p>Business License</p>
  //                 </div>
  //                 <div className="flex items-center gap-2">
  //                   <div className="h-2 w-2 rounded-full bg-green-500"></div>
  //                   <p>Tax ID Documentation</p>
  //                 </div>
  //                 <div className="flex items-center gap-2">
  //                   <div className="h-2 w-2 rounded-full bg-green-500"></div>
  //                   <p>Bank Statements</p>
  //                 </div>
  //                 <div className="flex items-center gap-2">
  //                   <div className="h-2 w-2 rounded-full bg-green-500"></div>
  //                   <p>Financial Statements</p>
  //                 </div>
  //                 <div className="flex items-center gap-2">
  //                   <div className="h-2 w-2 rounded-full bg-red-500"></div>
  //                   <p>Tax Returns</p>
  //                 </div>
  //                 <div className="flex items-center gap-2">
  //                   <div className="h-2 w-2 rounded-full bg-red-500"></div>
  //                   <p>Cash Flow Projections</p>
  //                 </div>
  //                 <div className="flex items-center gap-2">
  //                   <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
  //                   <p>Property Documents</p>
  //                 </div>
  //               </div>
  //             </div>

  //             <Alert variant="destructive">
  //               <AlertCircle className="h-4 w-4" />
  //               <AlertTitle>Missing Documents</AlertTitle>
  //               <AlertDescription>
  //                 Please upload your tax returns and cash flow projections to improve your application's chances of
  //                 approval.
  //               </AlertDescription>
  //             </Alert>

  //             <div className="space-y-4">
  //               <h3 className="text-lg font-medium">Preliminary Assessment</h3>
  //               <div className="space-y-2">
  //                 <div className="flex justify-between">
  //                   <span>Application Completeness</span>
  //                   <span className="font-medium">75%</span>
  //                 </div>
  //                 <div className="flex justify-between">
  //                   <span>Estimated Approval Chance</span>
  //                   <span className="font-medium">Medium</span>
  //                 </div>
  //                 <div className="flex justify-between">
  //                   <span>Suggested Improvements</span>
  //                   <span className="font-medium text-primary">2 items</span>
  //                 </div>
  //               </div>
  //             </div>
  //           </CardContent>
  //           <CardFooter className="flex flex-col gap-4">
  //             <div className="text-sm text-muted-foreground">
  //               By submitting this application, you confirm that all information provided is accurate and complete to
  //               the best of your knowledge.
  //             </div>
  //             <div className="flex w-full justify-between">
  //               <Button variant="outline" onClick={() => setActiveTab("documents")}>
  //                 Back to Documents
  //               </Button>
  //               <Button onClick={handleSubmit} disabled={loading}>
  //                 {loading ? "Submitting..." : "Submit Application"}
  //               </Button>
  //             </div>
  //           </CardFooter>
  //         </Card>
  //       </TabsContent>
  //     </Tabs>
  //   </div>
  // )
}
