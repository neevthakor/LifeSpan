"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
// --- MODIFIED --- Removed location icons (MapPin, Hospital, etc.)
import { Phone, User, Activity } from "lucide-react"

export default function HomePage() {
  // --- Your working state ---
  const [isSignUp, setIsSignUp] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [aiResponse, setAiResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  // ---

  // --- Location state and functions have been REMOVED ---

  // --- Your existing functions ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please check and try again.")
      return
    }
    console.log("Form submitted:", formData)
    window.location.href = "/categories"
  }

  async function getAiResponse() {
    setIsLoading(true)
    setAiResponse("")
    const userPrompt = "Write a short, friendly welcome message for a healthcare website named Lifespan."

    try {
      const response = await fetch('/api/askGemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userPrompt }),
      })
      const data = await response.json()
      if (response.ok) {
        setAiResponse(data.response)
      } else {
        setAiResponse(`Error: ${data.error}`)
      }
    } catch (error: any) {
      console.error("Failed to fetch AI response:", error)
      setAiResponse("Error: Failed to connect to the server.")
    }
    setIsLoading(false)
  }


  return (
    <div className="min-h-screen bg-linear-to-br from-background via-muted/30 to-accent/10 page-transition">
      {/* Header is in layout.tsx */}
      
      <main className="container mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Side - Welcome Content */}
          <div className="flex-1 space-y-8 animate-fade-in">
            <div className="space-y-6">
              <Badge variant="secondary" className="text-sm animate-scale-in stagger-1">
                Comprehensive Health Solutions
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold text-balance leading-tight animate-fade-in stagger-2">
                Your Health, <span className="text-primary text-shimmer">Our Priority</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground text-pretty max-w-2xl animate-fade-in stagger-3">
                Welcome to Lifespan - your comprehensive healthcare platform providing expert solutions for humans,
                animals, and automotive health needs.
              </p>
            </div>

            {/* --- "Find Nearby Emergency Services" Card REMOVED --- */}

            {/* AI Test Area */}
            <div className="space-y-4 p-4 border rounded-lg bg-card shadow-sm">
              <Button onClick={getAiResponse} disabled={isLoading} className="w-full ripple-effect">
                {isLoading ? "Getting AI Welcome Message..." : "Get AI Welcome Message"}
              </Button>
              {aiResponse && (
                <Card className="animate-fade-in bg-muted/50 border-0">
                  <CardContent className="p-4">
                    <p className="text-foreground text-pretty">{aiResponse}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <Card className="hover-lift card-hover animate-fade-in stagger-4 bg-card border">
                <CardContent className="p-8 text-center">
                  <User className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-xl">Human Health</h3>
                  <p className="text-sm text-muted-foreground">Medical care & wellness</p>
                </CardContent>
              </Card>
              <Card className="hover-lift card-hover animate-fade-in stagger-5 bg-card border">
                <CardContent className="p-8 text-center">
                  <Activity className="h-10 w-10 text-secondary mx-auto mb-4" />
                  <h3 className="font-semibold text-xl">Animal Care</h3>
                  <p className="text-sm text-muted-foreground">Veterinary services</p>
                </CardContent>
              </Card>
              <Card className="hover-lift card-hover animate-fade-in stagger-5 bg-card border">
                <CardContent className="p-8 text-center">
                  <Phone className="h-10 w-10 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-xl">Auto Health</h3>
                  <p className="text-sm text-muted-foreground">Vehicle maintenance</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="w-full max-w-md animate-slide-in-right">
            <Card className="hover-lift card-hover bg-card border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{isSignUp ? "Join Lifespan" : "Welcome Back"}</CardTitle>
                <CardDescription>
                  {isSignUp ? "Create your account to access our health services" : "Sign in to your Lifespan account"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignUp && (
                    <div className="space-y-2 animate-fade-in">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="focus-ring"
                        required
                      />
                    </div>
                  )}
                  <div className="space-y-2 animate-fade-in stagger-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="focus-ring"
                      required
                    />
                  </div>
                  <div className="space-y-2 animate-fade-in stagger-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="focus-ring"
                      required
                    />
                  </div>
                  {isSignUp && (
                    <div className="space-y-2 animate-fade-in stagger-3">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="focus-ring"
                        required
                      />
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full hover-lift ripple-effect animate-fade-in stagger-4"
                    disabled={isSignUp && formData.password !== formData.confirmPassword}
                  >
                    {isSignUp ? "Create Account" : "Sign In"}
                  </Button>
                </form>
                <div className="mt-4 text-center animate-fade-in stagger-5">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm text-primary hover:underline transition-colors duration-200"
                  >
                    {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}