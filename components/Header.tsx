"use client" // This is required because the button has an onClick

import { Button } from "@/components/ui/button"
import { Activity, AlertTriangle } from "lucide-react"
import Link from "next/link" // Use Link for better navigation

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        
        {/* I've wrapped your logo in a Link tag to go to the homepage */}
        <Link href="/" className="flex items-center space-x-2 animate-slide-in-left">
          <Activity className="h-8 w-8 text-primary medical-icon-pulse" />
          <span className="text-2xl font-bold text-foreground">Lifespan</span>
        </Link>
        
        <Button
          variant="destructive"
          size="lg"
          className="emergency-pulse hover-lift ripple-effect animate-slide-in-right"
          onClick={() => (window.location.href = "/emergency")}
        >
          <AlertTriangle className="mr-2 h-5 w-5" />
          Emergency Service
        </Button>
      </div>
    </header>
  )
}