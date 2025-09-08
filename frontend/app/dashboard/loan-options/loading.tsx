"use client"

import { useEffect, useState } from "react"
import { FileText, Brain, CheckCircle2, Loader2 } from "lucide-react"

export default function Loading() {
  const [currentStep, setCurrentStep] = useState(0)
  
  const steps = [
    { icon: FileText, text: "Scanning documents...", duration: 2000 },
    { icon: Brain, text: "AI analyzing financial data...", duration: 10000 },
    { icon: CheckCircle2, text: "Matching loan options...", duration: 2000 },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      }
    }, steps[currentStep]?.duration || 20000)

    return () => clearTimeout(timer)
  }, [currentStep, steps])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-8 max-w-md mx-auto p-6">
        <div className="space-y-4">
          <div className="relative">
            <div className="h-24 w-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground">
            Analyzing Your Documents
          </h2>
          
          <p className="text-muted-foreground">
            Our AI is processing your financial information to find the best loan matches for your business.
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === currentStep
            const isCompleted = index < currentStep
            
            return (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                  isActive
                    ? "bg-primary/10 border border-primary/20"
                    : isCompleted
                    ? "bg-green-50 border border-green-200"
                    : "bg-muted/30"
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-500 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isCompleted
                      ? "bg-green-600 text-white"
                      : "bg-muted-foreground/20"
                  }`}
                >
                  {isActive ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isCompleted ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>
                
                <span
                  className={`text-sm font-medium transition-colors duration-500 ${
                    isActive
                      ? "text-primary"
                      : isCompleted
                      ? "text-green-700"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.text}
                </span>
              </div>
            )
          })}
        </div>

        <div className="pt-4">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {currentStep + 1} of {steps.length} steps completed
          </p>
        </div>
      </div>
    </div>
  )
}
