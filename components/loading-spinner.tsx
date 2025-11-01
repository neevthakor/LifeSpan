"use client"

import { Activity } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Activity className={`${sizeClasses[size]} text-primary animate-spin`} />
    </div>
  )
}
