import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DocumentProvider } from "@/contexts/document-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FinCare - SME Loan Application Platform",
  description: "Prepare and improve loan applications for SMEs",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <DocumentProvider>
            {children}
          </DocumentProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
