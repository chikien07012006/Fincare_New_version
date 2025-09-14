"use client"

import { useDocuments } from "@/contexts/document-context"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { FileUploader } from "@/components/file-uploader"
import { FileText, Building2, CreditCard, Search, Filter, Download, Trash2, Eye, Plus } from "lucide-react"
import LoadingAnalysis from "../loan-options/loading"
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DocumentsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { 
    documents,
    updateDocument,
    deleteDocument,
    getDocumentsByCategory,
    setIsSubmitted,
    setIsAnalyzed
  } = useDocuments()

  const handleFileChange = (id: string, file: File | null) => {
    updateDocument(id, file)
  }

  const handleSubmit = async () => {
    // Build FormData from uploaded documents
    const formData = new FormData()
    documents.forEach(doc => {
      if (doc.uploaded && doc.file) {
        if (doc.id === 'financial-statements') {
          formData.append('Financial Statement', doc.file as File)
        } else {
          formData.append(doc.name, doc.file as File)
        }
      }
    })

    try {
      setLoading(true)

      const res = await fetch('http://127.0.0.1:8080/api/document', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Upload failed')

      const data = await res.json()

      localStorage.setItem('loan-analysis-data', JSON.stringify(data))
      setIsSubmitted(true)
      setIsAnalyzed(false)
      router.push('/dashboard/loan-options')
    } catch (err) {
      console.error('Error uploading file:', err)
      alert('Có lỗi xảy ra khi upload file.')
    } finally {
      setLoading(false)
    }
  }

  // Show full-screen AI loading while uploading / waiting for analysis
  if (loading) {
    return <LoadingAnalysis />
  }

  const uploadedDocs = documents.filter(doc => doc.uploaded)

  const handleDownload = (docId: string) => {
    const doc = documents.find(d => d.id === docId)
    if (doc && doc.file) {
      const url = URL.createObjectURL(doc.file as File)
      const link = document.createElement('a')
      link.href = url
      link.download = doc.file.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  const handleRemove = (docId: string) => {
    deleteDocument(docId)
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Document Management</h2>
          <p className="text-muted-foreground">Upload, organize, and manage your business documents</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Upload New Document
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="flex gap-2">
            <FileText className="h-4 w-4" />
            All Documents
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex gap-2">
            <Building2 className="h-4 w-4" />
            Profile Documents
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex gap-2">
            <CreditCard className="h-4 w-4" />
            Financial Documents
          </TabsTrigger>
          <TabsTrigger value="collateral" className="flex gap-2">
            <Building2 className="h-4 w-4" />
            Collateral Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Documents</CardTitle>
              <CardDescription>View and manage all your uploaded documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-5 text-sm font-medium text-muted-foreground">
                  <div className="col-span-2">Document Name</div>
                  <div>Category</div>
                  <div>Date Uploaded</div>
                  <div>Actions</div>
                </div>

                {uploadedDocs.length === 0 && (
                  <p className="text-sm text-muted-foreground">No documents uploaded yet.</p>
                )}

                {uploadedDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="grid grid-cols-5 items-center py-3 border-b last:border-b-0"
                  >
                    <div className="col-span-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="font-medium truncate max-w-xs">{doc.file?.name || doc.name}</span>
                    </div>
                    <div className="capitalize">{doc.category}</div>
                    <div className="text-sm text-muted-foreground">
                      {doc.uploadDate ? new Date(doc.uploadDate).toLocaleDateString() : "-"}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDownload(doc.id)}
                        disabled={!doc.file}
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleRemove(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Profile Documents</CardTitle>
              <CardDescription>Upload documents related to your business profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FileUploader
                  label="Business Registration"
                  description="Certificate of incorporation or business registration"
                  onFileChange={(file) => handleFileChange('business-registration', file)}
                  icon={<FileText className="h-4 w-4" />}
                />
                <FileUploader
                  label="Business License"
                  description="Current business operating license"
                  onFileChange={(file) => handleFileChange('business-license', file)}
                  icon={<FileText className="h-4 w-4" />}
                />
                <FileUploader
                  label="Tax ID Documentation"
                  description="EIN or tax identification documents"
                  onFileChange={(file) => handleFileChange('tax-id', file)}
                  icon={<FileText className="h-4 w-4" />}
                />
                <FileUploader
                  label="Business Plan"
                  description="Current business plan"
                  onFileChange={(file) => handleFileChange('business-plan', file)}
                  icon={<FileText className="h-4 w-4" />}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Financial Documents</CardTitle>
              <CardDescription>Upload documents related to your business finances</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FileUploader
                  label="Bank Statements"
                  description="Last 6 months of business bank statements"
                  onFileChange={(file) => handleFileChange('bank-statements', file)}
                  icon={<FileText className="h-4 w-4" />}
                />
                <FileUploader
                  label="Financial Statements"
                  description="Balance sheet and income statements"
                  onFileChange={(file) => handleFileChange('financial-statements', file)}
                  icon={<FileText className="h-4 w-4" />}
                />
                <FileUploader
                  label="Tax Returns"
                  description="Last 2 years of business tax returns"
                  onFileChange={(file) => handleFileChange('tax-returns', file)}
                  icon={<FileText className="h-4 w-4" />}
                />
                <FileUploader
                  label="Cash Flow Projections"
                  description="Projected cash flow for next 12 months"
                  onFileChange={(file) => handleFileChange('cash-flow', file)}
                  icon={<FileText className="h-4 w-4" />}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collateral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Collateral Documents</CardTitle>
              <CardDescription>Upload documents related to your business collateral</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FileUploader
                  label="Property Documents"
                  description="Deeds, titles, or leases for business property"
                  onFileChange={(file) => handleFileChange('property-documents', file)}
                  icon={<FileText className="h-4 w-4" />}
                />
                <FileUploader
                  label="Equipment Documentation"
                  description="Proof of ownership for major equipment"
                  onFileChange={(file) => handleFileChange('equipment-documentation', file)}
                  icon={<FileText className="h-4 w-4" />}
                />
                <FileUploader
                  label="Inventory Records"
                  description="Current inventory valuation and records"
                  onFileChange={(file) => handleFileChange('inventory-records', file)}
                  icon={<FileText className="h-4 w-4" />}
                />
                <FileUploader
                  label="Other Assets"
                  description="Documentation for any other business assets"
                  onFileChange={(file) => handleFileChange('other-assets', file)}
                  icon={<FileText className="h-4 w-4" />}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? (
          // Hiển thị spinner hoặc chữ Loading
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white inline-block"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        ) : null}
        {loading ? "Uploading..." : "Submit All Documents"}
      </Button>


    </div>
    </ProtectedRoute>
    
  )
}
