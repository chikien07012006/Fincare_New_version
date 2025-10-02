"use client"

import React from "react"
import type { ReactElement } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, ArrowLeft, Upload, Building2, User } from "lucide-react"

// Utility function to format number to Vietnamese currency format
const formatVND = (value: number | string | ""): string => {
  if (value === "" || value === null) return ""
  const num = typeof value === "string" ? parseFloat(value.replace(/[^0-9]/g, "")) : value
  if (isNaN(num)) return ""
  return num.toLocaleString("vi-VN")
}

// Utility function to parse VND string to number
const parseVND = (value: string): number | "" => {
  if (!value) return ""
  const cleaned = value.replace(/[^0-9]/g, "")
  return cleaned ? parseFloat(cleaned) : ""
}

const INDIVIDUAL_STEPS = [
  { id: "income", title: "Income & Employment", section: "Step 1" },
  { id: "credit", title: "Credit & Debt", section: "Step 2" },
  { id: "loan", title: "Loan & Collateral", section: "Step 3" },
  { id: "extras", title: "Additional Information", section: "Step 4" },
]

interface FormData {
  monthlyIncome: number | ""
  monthlyDebtPayments: number | ""
  cicGroup: string
  creditHistoryMonths: number | ""
  creditUtilizationPct: number | ""
  numLatePayments24m: number | ""
  numNewInquiries6m: number | ""
  creditMixTypes: number | ""
  loanType: string
  loanAmount: number | ""
  downPayment: number | ""
  vehicleValue: number | "" | null
  propertyValue: number | "" | null
  employmentType: string
  employmentDurationMonths: number | ""
  salaryPaymentMethod: string
  additionalInfo: string
  loanPurpose: string
  businessLoanAmount: number
  annualRevenue: string
  timeInBusiness: string
  appraisalDoc: File | null
}

export default function LoanFormPage(): ReactElement {
  const router = useRouter()
  const [userType, setUserType] = useState<"business" | "individual" | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    monthlyIncome: "",
    monthlyDebtPayments: "",
    cicGroup: "",
    creditHistoryMonths: "",
    creditUtilizationPct: "",
    numLatePayments24m: "",
    numNewInquiries6m: "",
    creditMixTypes: "",
    loanType: "",
    loanAmount: "",
    downPayment: "",
    vehicleValue: null,
    propertyValue: null,
    employmentType: "",
    employmentDurationMonths: "",
    salaryPaymentMethod: "",
    additionalInfo: "",
    loanPurpose: "",
    businessLoanAmount: 50000000,
    annualRevenue: "",
    timeInBusiness: "",
    appraisalDoc: null,
  })

  const updateFormData = (field: keyof FormData, value: string | number | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    try {
      const dataToSave = {
        userType,
        ...(userType === "individual"
          ? {
              loan_type: formData.loanType === "vehicle" ? "car" : "real_estate",
              monthly_income: formData.monthlyIncome ? Number(formData.monthlyIncome).toFixed(2) : "0.00",
              monthly_debt_payments: formData.monthlyDebtPayments ? Number(formData.monthlyDebtPayments).toFixed(2) : "0.00",
              cic_group: Number(formData.cicGroup) || 1,
              credit_history_months: Number(formData.creditHistoryMonths) || 0,
              credit_utilization_pct: Number(formData.creditUtilizationPct) || 0.0,
              num_late_payments_24m: Number(formData.numLatePayments24m) || 0,
              num_new_inquiries_6m: Number(formData.numNewInquiries6m) || 0,
              credit_mix_types: Number(formData.creditMixTypes) || 1,
              loan_amount: formData.loanAmount ? Number(formData.loanAmount).toFixed(2) : "0.00",
              down_payment: formData.downPayment ? Number(formData.downPayment).toFixed(2) : "0.00",
              vehicle_value: formData.loanType === "vehicle" && formData.vehicleValue ? Number(formData.vehicleValue).toFixed(2) : null,
              property_value: formData.loanType === "real_estate" && formData.propertyValue ? Number(formData.propertyValue).toFixed(2) : null,
              employment_type: formData.employmentType || null,
              employment_duration_months: Number(formData.employmentDurationMonths) || 0,
              salary_payment_method: formData.salaryPaymentMethod || null,
              additional_info: formData.additionalInfo ? { notes: formData.additionalInfo } : null,
              appraisal_doc: formData.appraisalDoc ? formData.appraisalDoc.name : null,
            }
          : {
              loanPurpose: formData.loanPurpose,
              businessLoanAmount: formData.businessLoanAmount,
              annualRevenue: formData.annualRevenue,
              timeInBusiness: formData.timeInBusiness,
            }),
      }

      localStorage.setItem("loanFormData", JSON.stringify(dataToSave))
      router.push(userType === "individual" ? "/dashboard-individual/loan-options" : "/dashboard/loan-options")
    } catch (error) {
      console.error("Error saving to localStorage:", error)
      alert("Error saving form data. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    if (userType === "business") {
      return formData.loanPurpose && formData.businessLoanAmount && formData.annualRevenue && formData.timeInBusiness
    }

    const step = INDIVIDUAL_STEPS[currentStep]
    switch (step.id) {
      case "income":
        return (
          formData.monthlyIncome &&
          Number(formData.monthlyIncome) > 0 &&
          formData.employmentType &&
          formData.employmentDurationMonths &&
          Number(formData.employmentDurationMonths) >= 0 &&
          formData.salaryPaymentMethod
        )
      case "credit":
        return (
          formData.monthlyDebtPayments &&
          Number(formData.monthlyDebtPayments) >= 0 &&
          formData.cicGroup &&
          Number(formData.cicGroup) >= 1 &&
          Number(formData.cicGroup) <= 5 &&
          formData.creditHistoryMonths &&
          Number(formData.creditHistoryMonths) >= 0 &&
          formData.creditUtilizationPct &&
          Number(formData.creditUtilizationPct) >= 0 &&
          Number(formData.creditUtilizationPct) <= 100 &&
          formData.numLatePayments24m &&
          Number(formData.numLatePayments24m) >= 0 &&
          formData.numNewInquiries6m &&
          Number(formData.numNewInquiries6m) >= 0 &&
          formData.creditMixTypes &&
          Number(formData.creditMixTypes) >= 1
        )
      case "loan":
        return (
          formData.loanType &&
          formData.loanAmount &&
          Number(formData.loanAmount) > 0 &&
          formData.downPayment &&
          Number(formData.downPayment) >= 0 &&
          (formData.loanType === "vehicle" ? formData.vehicleValue && Number(formData.vehicleValue) > 0 : formData.propertyValue && Number(formData.propertyValue) > 0)
        )
      default:
        return true
    }
  }

  const handleNext = () => {
    if (userType === "business" || currentStep === INDIVIDUAL_STEPS.length - 1) {
      handleSubmit()
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      setUserType(null)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      updateFormData("appraisalDoc", file)
    }
  }

  if (userType === null) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">Apply for a Loan</h1>
            <p className="text-lg text-muted-foreground text-pretty">Choose your application type to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => setUserType("individual")}
            >
              <CardHeader className="text-center pb-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Individual</CardTitle>
                <CardDescription>Personal loans for individuals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Car loans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Real estate financing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Quick approval process</span>
                  </li>
                </ul>
                <Button className="w-full mt-4">
                  Continue as Individual
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => setUserType("business")}
            >
              <CardHeader className="text-center pb-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Business</CardTitle>
                <CardDescription>Loans for SMEs and businesses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Working capital loans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Equipment financing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Business expansion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Flexible terms</span>
                  </li>
                </ul>
                <Button className="w-full mt-4">
                  Continue as Business
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (userType === "business") {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">Business Loan Application</h1>
            <p className="text-lg text-muted-foreground text-pretty">Tell us about your business financing needs</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Help us understand your financing requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="loanPurpose">
                  What is this loan for? <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.loanPurpose} onValueChange={(value) => updateFormData("loanPurpose", value)}>
                  <SelectTrigger id="loanPurpose">
                    <SelectValue placeholder="Select loan purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="working-capital">Working Capital</SelectItem>
                    <SelectItem value="purchase-equipment">Purchase Equipment</SelectItem>
                    <SelectItem value="business-expansion">Business Expansion</SelectItem>
                    <SelectItem value="start-new-business">Start a New Business</SelectItem>
                    <SelectItem value="inventory">Inventory Purchase</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessLoanAmount">
                  How much do you need? <span className="text-destructive">*</span>
                </Label>
                <div className="space-y-4">
                  <Slider
                    id="businessLoanAmount"
                    min={10000000}
                    max={10000000000}
                    step={10000000}
                    value={[formData.businessLoanAmount]}
                    onValueChange={(value) => updateFormData("businessLoanAmount", value[0])}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">10M VND</span>
                    <Input
                      type="text"
                      value={formatVND(formData.businessLoanAmount)}
                      onChange={(e) => updateFormData("businessLoanAmount", parseVND(e.target.value))}
                      className="w-48 text-center font-semibold"
                      placeholder="Enter amount"
                    />
                    <span className="text-sm text-muted-foreground">10B VND</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualRevenue">
                  What was your approximate revenue last year? <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.annualRevenue}
                  onValueChange={(value) => updateFormData("annualRevenue", value)}
                >
                  <SelectTrigger id="annualRevenue">
                    <SelectValue placeholder="Select revenue range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1b">Under 1B VND</SelectItem>
                    <SelectItem value="1b-5b">1B - 5B VND</SelectItem>
                    <SelectItem value="5b-10b">5B - 10B VND</SelectItem>
                    <SelectItem value="over-10b">Over 10B VND</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeInBusiness">
                  How long has your business been operating? <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.timeInBusiness}
                  onValueChange={(value) => updateFormData("timeInBusiness", value)}
                >
                  <SelectTrigger id="timeInBusiness">
                    <SelectValue placeholder="Select business age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="just-starting">Just Starting</SelectItem>
                    <SelectItem value="less-1-year">{"< 1 Year"}</SelectItem>
                    <SelectItem value="1-3-years">1-3 Years</SelectItem>
                    <SelectItem value="3-plus-years">3+ Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between gap-4">
            <Button variant="outline" onClick={() => setUserType(null)} className="bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleNext} disabled={!canProceed() || isSubmitting}>
              Submit Application
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">Individual Loan Application</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Complete all steps to submit your loan application
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {INDIVIDUAL_STEPS.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`text-xs font-medium text-center ${
                      index <= currentStep ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.section}
                  </span>
                </div>
                {index < INDIVIDUAL_STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 transition-colors ${
                      index < currentStep ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Step {currentStep + 1} of {INDIVIDUAL_STEPS.length}
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{INDIVIDUAL_STEPS[currentStep].title}</CardTitle>
            <CardDescription>{INDIVIDUAL_STEPS[currentStep].section}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">
                    Monthly Income (VND) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="monthlyIncome"
                    type="text"
                    placeholder="Enter your monthly income"
                    value={formatVND(formData.monthlyIncome)}
                    onChange={(e) => updateFormData("monthlyIncome", parseVND(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentType">
                    Employment Type <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.employmentType} onValueChange={(value) => updateFormData("employmentType", value)}>
                    <SelectTrigger id="employmentType">
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="self-employed">Self-employed</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentDurationMonths">
                    Employment Duration (months) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="employmentDurationMonths"
                    type="number"
                    placeholder="Enter duration in months"
                    value={formData.employmentDurationMonths}
                    onChange={(e) => updateFormData("employmentDurationMonths", e.target.value ? parseInt(e.target.value) : "")}
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    Salary Payment Method <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.salaryPaymentMethod}
                    onValueChange={(value) => updateFormData("salaryPaymentMethod", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                      <Label htmlFor="bank_transfer" className="font-normal cursor-pointer">
                        Bank Transfer
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="font-normal cursor-pointer">
                        Cash
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="check" id="check" />
                      <Label htmlFor="check" className="font-normal cursor-pointer">
                        Check
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyDebtPayments">
                    Monthly Debt Payments (VND) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="monthlyDebtPayments"
                    type="text"
                    placeholder="Enter monthly debt payments"
                    value={formatVND(formData.monthlyDebtPayments)}
                    onChange={(e) => updateFormData("monthlyDebtPayments", parseVND(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cicGroup">
                    CIC Group <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.cicGroup} onValueChange={(value) => updateFormData("cicGroup", value)}>
                    <SelectTrigger id="cicGroup">
                      <SelectValue placeholder="Select CIC group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Group 1 (Excellent)</SelectItem>
                      <SelectItem value="2">Group 2 (Good)</SelectItem>
                      <SelectItem value="3">Group 3 (Fair)</SelectItem>
                      <SelectItem value="4">Group 4 (Poor)</SelectItem>
                      <SelectItem value="5">Group 5 (Bad)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creditHistoryMonths">
                    Credit History (months) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="creditHistoryMonths"
                    type="number"
                    placeholder="Enter credit history in months"
                    value={formData.creditHistoryMonths}
                    onChange={(e) => updateFormData("creditHistoryMonths", e.target.value ? parseInt(e.target.value) : "")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creditUtilizationPct">
                    Credit Utilization (%) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="creditUtilizationPct"
                    type="text"
                    placeholder="Enter credit utilization percentage"
                    value={formData.creditUtilizationPct !== "" ? formData.creditUtilizationPct.toString() : ""}
                    onChange={(e) => updateFormData("creditUtilizationPct", e.target.value ? parseFloat(e.target.value) : "")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numLatePayments24m">
                    Late Payments (Last 24 months) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="numLatePayments24m"
                    type="number"
                    placeholder="Enter number of late payments"
                    value={formData.numLatePayments24m}
                    onChange={(e) => updateFormData("numLatePayments24m", e.target.value ? parseInt(e.target.value) : "")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numNewInquiries6m">
                    New Credit Inquiries (Last 6 months) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="numNewInquiries6m"
                    type="number"
                    placeholder="Enter number of new inquiries"
                    value={formData.numNewInquiries6m}
                    onChange={(e) => updateFormData("numNewInquiries6m", e.target.value ? parseInt(e.target.value) : "")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creditMixTypes">
                    Number of Credit Types <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="creditMixTypes"
                    type="number"
                    placeholder="Enter number of credit types"
                    value={formData.creditMixTypes}
                    onChange={(e) => updateFormData("creditMixTypes", e.target.value ? parseInt(e.target.value) : "")}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    Loan Type <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.loanType}
                    onValueChange={(value) => updateFormData("loanType", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vehicle" id="vehicle" />
                      <Label htmlFor="vehicle" className="font-normal cursor-pointer">
                        Car Loan
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="real_estate" id="real_estate" />
                      <Label htmlFor="real_estate" className="font-normal cursor-pointer">
                        Real Estate Loan
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">
                    Loan Amount (VND) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="loanAmount"
                    type="text"
                    placeholder="Enter loan amount"
                    value={formatVND(formData.loanAmount)}
                    onChange={(e) => updateFormData("loanAmount", parseVND(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="downPayment">
                    Down Payment (VND) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="downPayment"
                    type="text"
                    placeholder="Enter down payment"
                    value={formatVND(formData.downPayment)}
                    onChange={(e) => updateFormData("downPayment", parseVND(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="collateralValue">
                    {formData.loanType === "vehicle" ? "Vehicle Value" : "Property Value"} (VND){" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="collateralValue"
                    type="text"
                    placeholder={`Enter ${formData.loanType === "vehicle" ? "vehicle" : "property"} value`}
                    value={formatVND(formData.loanType === "vehicle" ? formData.vehicleValue ?? "" : formData.propertyValue ?? "")}
                    onChange={(e) =>
                      updateFormData(
                        formData.loanType === "vehicle" ? "vehicleValue" : "propertyValue",
                        parseVND(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appraisalDoc">Upload Appraisal Document (Optional)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="appraisalDoc"
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("appraisalDoc")?.click()}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {formData.appraisalDoc ? formData.appraisalDoc.name : "Choose File"}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Tell us more about your loan needs, timeline, or any specific requirements..."
                  rows={6}
                  value={formData.additionalInfo}
                  onChange={(e) => updateFormData("additionalInfo", e.target.value)}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between gap-4">
          <Button variant="outline" onClick={handleBack} className="bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleNext} disabled={!canProceed() || isSubmitting}>
            {isSubmitting
              ? "Submitting..."
              : currentStep === INDIVIDUAL_STEPS.length - 1
              ? "Submit Application"
              : "Continue"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}