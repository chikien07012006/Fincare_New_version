"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface DocumentInfo {
  id: string
  name: string
  category: 'profile' | 'financial' | 'collateral'
  file: File | null
  uploaded: boolean
  uploadDate?: string
  required: boolean
}

interface DocumentContextType {
  documents: DocumentInfo[]
  uploadedDocuments: DocumentInfo[]
  updateDocument: (id: string, file: File | null) => void
  deleteDocument: (id: string) => void
  getDocumentsByCategory: (category: string) => DocumentInfo[]
  getProgress: () => {
    overall: number
    profile: number
    financial: number
    collateral: number
  }
  isSubmitted: boolean
  setIsSubmitted: (submitted: boolean) => void
  isAnalyzed: boolean
  setIsAnalyzed: (analyzed: boolean) => void
  getCompletedDocumentsCount: () => number
  getTotalDocumentsCount: () => number
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined)

const initialDocuments: DocumentInfo[] = [
  // Profile Documents
  {
    id: 'business-registration',
    name: 'Business Registration',
    category: 'profile',
    file: null,
    uploaded: false,
    required: true
  },
  {
    id: 'business-license',
    name: 'Business License',
    category: 'profile',
    file: null,
    uploaded: false,
    required: true
  },
  {
    id: 'tax-id',
    name: 'Tax ID Documentation',
    category: 'profile',
    file: null,
    uploaded: false,
    required: true
  },
  {
    id: 'business-plan',
    name: 'Business Plan',
    category: 'profile',
    file: null,
    uploaded: false,
    required: false
  },
  // Financial Documents
  {
    id: 'bank-statements',
    name: 'Bank Statements',
    category: 'financial',
    file: null,
    uploaded: false,
    required: true
  },
  {
    id: 'financial-statements',
    name: 'Financial Statements',
    category: 'financial',
    file: null,
    uploaded: false,
    required: true
  },
  {
    id: 'tax-returns',
    name: 'Tax Returns',
    category: 'financial',
    file: null,
    uploaded: false,
    required: true
  },
  {
    id: 'cash-flow',
    name: 'Cash Flow Projections',
    category: 'financial',
    file: null,
    uploaded: false,
    required: true
  },
  // Collateral Documents
  {
    id: 'property-documents',
    name: 'Property Documents',
    category: 'collateral',
    file: null,
    uploaded: false,
    required: false
  },
  {
    id: 'equipment-documentation',
    name: 'Equipment Documentation',
    category: 'collateral',
    file: null,
    uploaded: false,
    required: false
  },
  {
    id: 'inventory-records',
    name: 'Inventory Records',
    category: 'collateral',
    file: null,
    uploaded: false,
    required: false
  },
  {
    id: 'other-assets',
    name: 'Other Assets',
    category: 'collateral',
    file: null,
    uploaded: false,
    required: false
  }
]

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [documents, setDocuments] = useState<DocumentInfo[]>(initialDocuments)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isAnalyzed, setIsAnalyzed] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedDocuments = localStorage.getItem('fincare-documents')
    const savedSubmitted = localStorage.getItem('fincare-submitted')
    const savedAnalyzed = localStorage.getItem('fincare-analyzed')
    
    if (savedDocuments) {
      try {
        const parsed = JSON.parse(savedDocuments)
        setDocuments(parsed)
      } catch (error) {
        console.error('Error loading documents from localStorage:', error)
      }
    }
    
    if (savedSubmitted) {
      setIsSubmitted(JSON.parse(savedSubmitted))
    }
    
    if (savedAnalyzed) {
      setIsAnalyzed(JSON.parse(savedAnalyzed))
    }
  }, [])

  // Save to localStorage when documents change
  useEffect(() => {
    localStorage.setItem('fincare-documents', JSON.stringify(documents))
  }, [documents])

  // Save submission status
  useEffect(() => {
    localStorage.setItem('fincare-submitted', JSON.stringify(isSubmitted))
  }, [isSubmitted])

  // Save analyzed status
  useEffect(() => {
    localStorage.setItem('fincare-analyzed', JSON.stringify(isAnalyzed))
  }, [isAnalyzed])

  const updateDocument = (id: string, file: File | null) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id 
        ? { 
            ...doc, 
            file, 
            uploaded: !!file, 
            uploadDate: file ? new Date().toISOString() : undefined 
          }
        : doc
    ))
  }

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id 
        ? { ...doc, file: null, uploaded: false, uploadDate: undefined }
        : doc
    ))
  }

  const getDocumentsByCategory = (category: string) => {
    return documents.filter(doc => doc.category === category)
  }

  const uploadedDocuments = documents.filter(doc => doc.uploaded)

  const getProgress = () => {
    const profileDocs = documents.filter(doc => doc.category === 'profile')
    const financialDocs = documents.filter(doc => doc.category === 'financial')
    const collateralDocs = documents.filter(doc => doc.category === 'collateral')
    
    const profileUploaded = profileDocs.filter(doc => doc.uploaded).length
    const financialUploaded = financialDocs.filter(doc => doc.uploaded).length
    const collateralUploaded = collateralDocs.filter(doc => doc.uploaded).length
    
    const totalUploaded = uploadedDocuments.length
    const totalDocs = documents.length
    
    return {
      overall: Math.round((totalUploaded / totalDocs) * 100),
      profile: Math.round((profileUploaded / profileDocs.length) * 100),
      financial: Math.round((financialUploaded / financialDocs.length) * 100),
      collateral: Math.round((collateralUploaded / collateralDocs.length) * 100)
    }
  }

  const getCompletedDocumentsCount = () => uploadedDocuments.length
  const getTotalDocumentsCount = () => documents.length

  return (
    <DocumentContext.Provider value={{
      documents,
      uploadedDocuments,
      updateDocument,
      deleteDocument,
      getDocumentsByCategory,
      getProgress,
      isSubmitted,
      setIsSubmitted,
      isAnalyzed,
      setIsAnalyzed,
      getCompletedDocumentsCount,
      getTotalDocumentsCount
    }}>
      {children}
    </DocumentContext.Provider>
  )
}

export function useDocuments() {
  const context = useContext(DocumentContext)
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider')
  }
  return context
} 