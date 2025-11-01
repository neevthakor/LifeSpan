"use client"

import { Activity, Heart, Stethoscope } from "lucide-react"

export function MedicalHeartbeat() {
  return (
    <div className="flex items-center justify-center">
      <Heart className="h-8 w-8 text-destructive animate-heartbeat" />
    </div>
  )
}

export function MedicalPulse() {
  return (
    <div className="flex items-center justify-center">
      <Activity className="h-8 w-8 text-primary animate-pulse-gentle" />
    </div>
  )
}

export function MedicalFloat() {
  return (
    <div className="flex items-center justify-center">
      <Stethoscope className="h-8 w-8 text-secondary animate-float" />
    </div>
  )
}

export function MedicalBreathe() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-breathe">
        <Activity className="h-8 w-8 text-primary" />
      </div>
    </div>
  )
}
