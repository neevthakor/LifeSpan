"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, User, MapPin, Phone, ArrowLeft, MessageCircle, Clock, Star, Pill } from "lucide-react"
import Link from "next/link"
import { ChatWidget } from "@/components/chat-widget"

export default function HumanHealthPage() {
  const healthServices = [
    {
      title: "Nearest Hospitals",
      description: "Find hospitals and medical centers near you",
      icon: MapPin,
      color: "text-primary",
      action: "Find Hospitals",
      href: "/human-health/hospitals",
      stats: "50+ Hospitals",
    },
    {
      title: "Blood Banks",
      description: "Locate blood donation centers and blood banks",
      icon: Activity,
      color: "text-destructive",
      action: "Find Blood Banks",
      href: "/human-health/blood-banks",
      stats: "25+ Blood Banks",
    },
    {
      title: "Doctor Clinics",
      description: "Search for specialist doctors and clinics",
      icon: User,
      color: "text-secondary",
      action: "Find Doctors",
      href: "/human-health/doctors",
      stats: "200+ Doctors",
    },
    {
      title: "Medical Stores & Pharmacies",
      description: "Find nearby pharmacies with medicine availability",
      icon: Pill,
      color: "text-green-600",
      action: "Find Pharmacies",
      href: "/human-health/pharmacies",
      stats: "150+ Pharmacies",
    },
    {
      title: "24/7 Helpline",
      description: "Round-the-clock medical assistance",
      icon: Phone,
      color: "text-accent",
      action: "Call Now",
      href: "/human-health/helpline",
      stats: "Always Available",
    },
  ]

  const quickStats = [
    { label: "Emergency Response", value: "< 5 min", icon: Clock },
    { label: "Patient Rating", value: "4.8/5", icon: Star },
    { label: "Medical Centers", value: "275+", icon: MapPin },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/categories" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <Activity className="h-8 w-8 text-primary animate-pulse-gentle" />
            <span className="text-2xl font-bold text-foreground">Lifespan</span>
          </Link>

          <Badge variant="secondary">Human Health Services</Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <User className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-balance mb-4">
            Human <span className="text-primary">Health Services</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Access comprehensive healthcare services, find medical facilities, and get expert medical assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 animate-fade-in">
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} className="text-center hover-lift">
                <CardContent className="p-6">
                  <IconComponent className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {healthServices.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card
                key={index}
                className="hover-lift cursor-pointer transition-all duration-300 hover:shadow-xl animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => (window.location.href = service.href)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <IconComponent className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {service.stats}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full hover-lift bg-transparent">
                    {service.action}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* AI Chat Section */}
        <div className="max-w-4xl mx-auto animate-fade-in">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                    <MessageCircle className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Chat with Our AI Health Assistant</h3>
                  <p className="text-muted-foreground mb-4">
                    Get instant answers to your health questions, symptom guidance, and medical advice from our
                    AI-powered healthcare assistant.
                  </p>
                  <Button
                    size="lg"
                    className="hover-lift"
                    onClick={() => (window.location.href = "/chat?specialty=human")}
                  >
                    Start Health Chat
                    <MessageCircle className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ChatWidget specialty="human" />
      </main>
    </div>
  )
}
