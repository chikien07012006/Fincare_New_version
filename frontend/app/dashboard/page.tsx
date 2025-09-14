"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileText, AlertCircle, Lightbulb, PlusCircle, CheckCircle2, ArrowRight, Clock } from "lucide-react"
import { useDocuments } from "@/contexts/document-context"
import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {

    const [fullName, setFullName] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                window.location.href = '/login';
                return;
            }

            try {
                const response = await fetch('http://localhost:8000/api/profile/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json(); 
                    if (data[0].full_name) { 
                        setFullName(data[0].full_name);
                    }
                } else {
                    // Nếu token không hợp lệ, xóa token và chuyển hướng
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                window.location.href = '/login';
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Đang tải...</div>;
    }

  const { 
    getProgress,
    getCompletedDocumentsCount,
    getTotalDocumentsCount,
    getDocumentsByCategory,
    documents } = useDocuments()


  const progress = getProgress()
  // Mock data for onboarding progress
  const onboardingSteps = [
    {
      id: 1,
      title: "Profile Documents",
      description: "Business registration, license, and tax ID",
      status: progress.profile === 100 ? "completed" : progress.profile > 0 ? "in-progress" : "pending",
      progress: progress.profile,
      documents: getDocumentsByCategory('profile').map(doc => doc.name),
      completedDocs: getDocumentsByCategory('profile').filter(doc => doc.uploaded).length,
      totalDocs: getDocumentsByCategory('profile').length,
      link: "/dashboard/documents?tab=profile",
    },
    {
      id: 2,
      title: "Financial Documents",
      description: "Bank statements, financial reports, tax returns",
      status: progress.financial === 100 ? "completed" : progress.financial > 0 ? "in-progress" : "pending",
      progress: progress.financial,
      documents: getDocumentsByCategory('financial').map(doc => doc.name),
      completedDocs: getDocumentsByCategory('financial').filter(doc => doc.uploaded).length,
      totalDocs: getDocumentsByCategory('financial').length,
      link: "/dashboard/documents?tab=financial",
    },
    {
      id: 3,
      title: "Collateral Documents",
      description: "Property deeds, equipment ownership, inventory",
      status: progress.collateral === 100 ? "completed" : progress.collateral > 0 ? "in-progress" : "pending",
      progress: progress.collateral,
      documents: getDocumentsByCategory('collateral').map(doc => doc.name),
      completedDocs: getDocumentsByCategory('collateral').filter(doc => doc.uploaded).length,
      totalDocs: getDocumentsByCategory('collateral').length,
      link: "/dashboard/documents?tab=collateral",
    },
    {
      id: 4,
      title: "Review & Match",
      description: "Get loan recommendations based on your profile",
      status: "locked",
      progress: 0,
      documents: [],
      completedDocs: 0,
      totalDocs: 0,
      link: "/dashboard/loan-options",
    },
  ]

  const overallProgress = Math.round(
    (onboardingSteps.reduce((acc, step) => acc + step.progress, 0) / (onboardingSteps.length * 100)) * 100,
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-6 w-6 text-green-600" />
      case "in-progress":
        return <Clock className="h-6 w-6 text-blue-600" />
      case "pending":
        return <AlertCircle className="h-6 w-6 text-amber-600" />
      case "locked":
        return <AlertCircle className="h-6 w-6 text-gray-400" />
      default:
        return <AlertCircle className="h-6 w-6 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Complete</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>
      case "locked":
        return <Badge variant="secondary">Locked</Badge>
      default:
        return <Badge variant="secondary">Not Started</Badge>
    }
  }

  const currentStep =
    onboardingSteps.find((step) => step.status === "in-progress") ||
    onboardingSteps.find((step) => step.status === "pending")

  return (
    <ProtectedRoute>
      <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, {fullName}</h2>
          <p className="text-muted-foreground">
            Complete your document upload to get personalized loan recommendations
          </p>
        </div>
        <Button asChild>
          <Link href={currentStep?.link || "/dashboard/documents"}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Continue Setup
          </Link>
        </Button>
      </div>

      {/* Overall Progress Card */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Onboarding Progress</CardTitle>
              <CardDescription>Complete all steps to unlock loan matching</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{overallProgress}%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={overallProgress} className="h-3" />
          <div className="mt-2 flex justify-between text-sm text-muted-foreground">
            <span>Getting started</span>
            <span>Ready for loans</span>
          </div>
        </CardContent>
      </Card>

      {/* Onboarding Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Upload Timeline
          </CardTitle>
          <CardDescription>Follow these steps to complete your loan application preparation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {onboardingSteps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Timeline connector */}
                {index < onboardingSteps.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>
                )}

                <div
                  className={`flex gap-4 p-4 rounded-lg border transition-colors ${
                    step.status === "in-progress"
                      ? "bg-blue-50 border-blue-200"
                      : step.status === "completed"
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">{getStatusIcon(step.status)}</div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(step.status)}
                        {step.status !== "locked" && (
                          <Button asChild size="sm" variant={step.status === "in-progress" ? "default" : "outline"}>
                            <Link href={step.link}>
                              {step.status === "completed"
                                ? "Review"
                                : step.status === "in-progress"
                                  ? "Continue"
                                  : "Start"}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>

                    {step.status !== "locked" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">
                            {step.completedDocs}/{step.totalDocs} documents
                          </span>
                        </div>
                        <Progress value={step.progress} className="h-2" />

                        {step.documents.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {step.documents.map((doc, docIndex) => (
                              <Badge
                                key={docIndex}
                                variant={docIndex < step.completedDocs ? "default" : "outline"}
                                className={docIndex < step.completedDocs ? "bg-green-100 text-green-800" : ""}
                              >
                                {docIndex < step.completedDocs && <CheckCircle2 className="mr-1 h-3 w-3" />}
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Document Completion</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground">Overall document completion</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missing Documents</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Critical documents needed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matching Loan Options</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Loan options available after completion</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Match Score</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Potential with complete docs</p>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps Card */}
      {currentStep && (
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Next Step: {currentStep.title}
            </CardTitle>
            <CardDescription>Complete this step to continue your loan preparation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">{currentStep.description}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {currentStep.completedDocs} of {currentStep.totalDocs} documents uploaded
                </p>
              </div>
              <Button asChild>
                <Link href={currentStep.link}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
    </ProtectedRoute>
  )
}