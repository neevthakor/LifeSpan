import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { LanguageSelector } from "@/components/language-selector"
import { cn } from "@/lib/utils"

// --- NEW --- Import your new Header component
import { Header } from "@/components/Header"

export const metadata: Metadata = {
  title: "Lifespan - Healthcare Solutions",
  description: "Comprehensive healthcare platform for humans, animals, and automotive health needs",
  generator: "v0.app",
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        {/* Language Selector - Top Right */}
        <div className="fixed top-4 right-4 z-50">
          <LanguageSelector />
        </div>
        
        {/* --- NEW --- Your header is now here, outside of {children} */}
        <Header />

        {/* Your page content (like the homepage) will be rendered here */}
        <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
        
        <Analytics />
      </body>
    </html>
  )
}