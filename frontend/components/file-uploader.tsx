"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Check } from "lucide-react"

interface FileUploaderProps {
  label: string
  description: string
  icon?: React.ReactNode
  onFileChange?: (file: File | null) => void
}

export function FileUploader({ label, description, icon, onFileChange }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      updateFile(e.dataTransfer.files[0])
    }
  }

  const updateFile = (newFile: File | null) => {
    setFile(newFile)
    if (onFileChange) onFileChange(newFile)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      updateFile(e.target.files[0])  // Gọi updateFile để setFile & onFileChange
    }
  }  

  const removeFile = () => {
    updateFile(null)
  }

  return (
    <Card
      className={`border-2 ${isDragging ? "border-primary border-dashed" : file ? "border-green-500" : "border-dashed"}`}
    >
      <CardContent className="p-4">
        {!file ? (
          <div
            className="flex flex-col items-center justify-center gap-2 py-4 text-center"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {icon || <Upload className="h-8 w-8 text-muted-foreground" />}
            <div className="space-y-1">
              <h3 className="text-sm font-medium">{label}</h3>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            <label htmlFor={`file-${label}`} className="cursor-pointer">
              <div className="mt-2 flex items-center gap-1 text-xs text-primary hover:underline">
                <span>Upload file</span>
                <span className="text-muted-foreground">or drag and drop</span>
              </div>
              <input
                id={`file-${label}`}
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </label>
            <p className="text-xs text-muted-foreground">PDF, JPEG, PNG (max 10MB)</p>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 py-2">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={removeFile} className="h-8 w-8 rounded-full">
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
