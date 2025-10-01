"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FileUploader } from "@/components/documents/file-uploader"
import { IntegrationConnect } from "@/components/documents/integration-connect"
import { Plus, Upload, Link2, Edit3 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const FIXED_CATEGORIES = [
  {
    id: "business-identity",
    name: "Business Identity",
    description: "Business registration number, Tax Code, Full Legal Name",
    required: true,
  },
  {
    id: "financial-performance",
    name: "Financial Performance",
    description: "Assets, Liabilities, and Equity with opening and closing balances",
    required: true,
  },
  {
    id: "bank-statements",
    name: "Bank Statements",
    description: "CSV file with transaction details",
    required: true,
  },
  {
    id: "ownership",
    name: "Ownership",
    description: "CSV file with details of major shareholders/founders",
    required: true,
  },
]

interface DocumentData {
  categoryId: string
  entries: any[]
  status: "empty" | "partial" | "complete"
  lastUpdated?: string
}

export default function DocumentsPage() {
  const [documentData, setDocumentData] = useState<DocumentData[]>(
    FIXED_CATEGORIES.map((cat) => ({
      categoryId: cat.id,
      entries: [],
      status: "empty" as const,
    })),
  )

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false)
  const [isManualModalOpen, setIsManualModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<any>(null)

  const completedCategories = documentData.filter((doc) => doc.status === "complete").length
  const progress = Math.round((completedCategories / FIXED_CATEGORIES.length) * 100)

  const getStatusBadge = (status: string) => {
    const styles = {
      empty: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
      partial: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
      complete: "bg-green-500/10 text-green-700 dark:text-green-400",
    }
    return styles[status as keyof typeof styles] || styles.empty
  }

  const handleAddData = (categoryId: string, method: "upload" | "integrate" | "manual") => {
    setSelectedCategory(categoryId)
    if (method === "upload") {
      setIsUploadModalOpen(true)
    } else if (method === "integrate") {
      setIsIntegrationModalOpen(true)
    } else {
      setIsManualModalOpen(true)
    }
  }

  const handleEditEntry = (categoryId: string, entry: any) => {
    setSelectedCategory(categoryId)
    setSelectedEntry(entry)
    setIsEditModalOpen(true)
  }

  const handleDeleteEntry = (categoryId: string, entryIndex: number) => {
    setDocumentData((prev) =>
      prev.map((doc) => {
        if (doc.categoryId === categoryId) {
          const newEntries = doc.entries.filter((_, index) => index !== entryIndex)
          return {
            ...doc,
            entries: newEntries,
            status: newEntries.length === 0 ? "empty" : doc.status,
          }
        }
        return doc
      }),
    )
  }

  const getCategoryData = (categoryId: string) => {
    return documentData.find((doc) => doc.categoryId === categoryId)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">Document Workspace</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Manage your business information across fixed document categories
            </p>
          </div>
        </div>

        {/* Progress Card */}
        <Card className="bg-secondary/50 border-primary/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Completion Progress</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {completedCategories} of {FIXED_CATEGORIES.length} categories completed
                  </p>
                </div>
                <div className="text-2xl font-bold text-primary">{progress}%</div>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Table */}
        <Card>
          <CardHeader>
            <CardTitle>Business Document Categories</CardTitle>
            <CardDescription>Add, edit, or delete data within each fixed category</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Entries</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FIXED_CATEGORIES.map((category) => {
                  const data = getCategoryData(category.id)
                  return (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell className="text-muted-foreground">{category.description}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(data?.status || "empty")}`}
                        >
                          {(data?.status || "empty").charAt(0).toUpperCase() + (data?.status || "empty").slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{data?.entries.length || 0}</TableCell>
                      <TableCell className="text-muted-foreground">{data?.lastUpdated || "-"}</TableCell>
                      <TableCell className="text-right">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                              <Plus className="h-4 w-4" />
                              Add Data
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-56 p-2">
                            <div className="space-y-1">
                              <p className="text-sm font-semibold px-2 py-1.5">Choose input method:</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start gap-2"
                                onClick={() => handleAddData(category.id, "upload")}
                              >
                                <Upload className="h-4 w-4" />
                                Upload Files
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start gap-2"
                                onClick={() => handleAddData(category.id, "integrate")}
                              >
                                <Link2 className="h-4 w-4" />
                                Connect Software
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start gap-2"
                                onClick={() => handleAddData(category.id, "manual")}
                              >
                                <Edit3 className="h-4 w-4" />
                                Manual Entry
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Upload Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Documents</DialogTitle>
            <DialogDescription>
              Upload files for {FIXED_CATEGORIES.find((cat) => cat.id === selectedCategory)?.name || "this category"}
            </DialogDescription>
          </DialogHeader>
          <FileUploader />
        </DialogContent>
      </Dialog>

      {/* Integration Modal */}
      <Dialog open={isIntegrationModalOpen} onOpenChange={setIsIntegrationModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Connect Software</DialogTitle>
            <DialogDescription>
              Sync data for {FIXED_CATEGORIES.find((cat) => cat.id === selectedCategory)?.name || "this category"} from
              your accounting software
            </DialogDescription>
          </DialogHeader>
          <IntegrationConnect />
        </DialogContent>
      </Dialog>

      {/* Manual Entry Modal */}
      <Dialog open={isManualModalOpen} onOpenChange={setIsManualModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manual Entry</DialogTitle>
            <DialogDescription>
              Enter data manually for{" "}
              {FIXED_CATEGORIES.find((cat) => cat.id === selectedCategory)?.name || "this category"}
            </DialogDescription>
          </DialogHeader>
          {selectedCategory === "business-identity" && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reg-number">Business Registration Number</Label>
                <Input id="reg-number" placeholder="Enter registration number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-code">Tax Code</Label>
                <Input id="tax-code" placeholder="Enter tax code" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="legal-name">Full Legal Name</Label>
                <Input id="legal-name" placeholder="Enter full legal business name" />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsManualModalOpen(false)}>
                  Cancel
                </Button>
                <Button>Save Entry</Button>
              </div>
            </div>
          )}
          {selectedCategory === "financial-performance" && (
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Assets</h3>
                {[
                  "Cash and cash equivalents",
                  "Financial investments",
                  "Short-term loans and advances",
                  "Accounts receivable",
                  "Inventories",
                  "Fixed assets",
                ].map((item) => (
                  <div key={item} className="grid grid-cols-3 gap-4 items-center">
                    <Label className="col-span-1">{item}</Label>
                    <Input placeholder="Opening balance" type="number" />
                    <Input placeholder="Closing balance" type="number" />
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Liabilities</h3>
                {["Short-term loans", "Long-term loans", "Accounts payable", "Other liabilities"].map((item) => (
                  <div key={item} className="grid grid-cols-3 gap-4 items-center">
                    <Label className="col-span-1">{item}</Label>
                    <Input placeholder="Opening balance" type="number" />
                    <Input placeholder="Closing balance" type="number" />
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Equity</h3>
                {["Common stock", "Retained earnings", "Other reserves"].map((item) => (
                  <div key={item} className="grid grid-cols-3 gap-4 items-center">
                    <Label className="col-span-1">{item}</Label>
                    <Input placeholder="Opening balance" type="number" />
                    <Input placeholder="Closing balance" type="number" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsManualModalOpen(false)}>
                  Cancel
                </Button>
                <Button>Save Financial Data</Button>
              </div>
            </div>
          )}
          {selectedCategory === "bank-statements" && (
            <div className="space-y-4 py-4">
              <div className="text-center py-8 space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Upload CSV File</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Please upload a CSV file containing your bank transaction details
                  </p>
                </div>
                <Input type="file" accept=".csv" className="max-w-md mx-auto" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsManualModalOpen(false)}>
                  Cancel
                </Button>
                <Button>Upload CSV</Button>
              </div>
            </div>
          )}
          {selectedCategory === "ownership" && (
            <div className="space-y-4 py-4">
              <div className="text-center py-8 space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Upload Ownership CSV</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Please upload a CSV file with details of major shareholders and founders
                  </p>
                </div>
                <Input type="file" accept=".csv" className="max-w-md mx-auto" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsManualModalOpen(false)}>
                  Cancel
                </Button>
                <Button>Upload CSV</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
