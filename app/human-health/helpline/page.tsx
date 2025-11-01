"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, ArrowLeft, Phone, Clock, MessageCircle, AlertTriangle, Heart } from "lucide-react"
import Link from "next/link"

export default function HelplinePage() {
  const helplineServices = [
    {
      title: "24/7 Medical Helpline",
      number: "1-800-MEDICAL",
      description: "Round-the-clock medical assistance and guidance",
      availability: "Always Available",
      languages: ["English", "Spanish", "French"],
      icon: Phone,
      color: "text-primary",
    },
    {
      title: "Mental Health Support",
      number: "1-800-MENTAL",
      description: "Professional mental health counseling and support",
      availability: "24/7",
      languages: ["English", "Spanish"],
      icon: Heart,
      color: "text-secondary",
    },
    {
      title: "Emergency Consultation",
      number: "1-800-URGENT",
      description: "Immediate medical consultation for urgent situations",
      availability: "24/7",
      languages: ["English", "Spanish", "Mandarin"],
      icon: AlertTriangle,
      color: "text-destructive",
    },
    {
      title: "Prescription Support",
      number: "1-800-PHARMA",
      description: "Medication guidance and prescription assistance",
      availability: "6 AM - 10 PM",
      languages: ["English"],
      icon: Activity,
      color: "text-accent",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/human-health" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <Activity className="h-8 w-8 text-primary animate-pulse-gentle" />
            <span className="text-2xl font-bold text-foreground">Lifespan</span>
          </Link>

          <Badge variant="secondary">24/7 Helpline</Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Phone className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-balance mb-2">
            24/7 <span className="text-accent">Helpline</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Get immediate medical assistance and professional guidance anytime
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="max-w-4xl mx-auto mb-8 animate-fade-in">
          <Card className="border-destructive bg-destructive/5">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <AlertTriangle className="h-8 w-8 text-destructive flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-destructive mb-2">Life-Threatening Emergency?</h3>
                  <p className="text-muted-foreground mb-4">
                    If you're experiencing a life-threatening emergency, call 911 immediately or go to your nearest
                    emergency room.
                  </p>
                  <Button variant="destructive" size="lg" className="hover-lift">
                    <Phone className="h-4 w-4 mr-2" />
                    Call 911 Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Helpline Services */}
        <div className="max-w-4xl mx-auto space-y-6">
          {helplineServices.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card key={index} className="hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className={`h-6 w-6 ${service.color}`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                            <p className="text-muted-foreground mb-3">{service.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="font-medium">{service.availability}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-1">Languages Available:</p>
                          <div className="flex flex-wrap gap-1">
                            {service.languages.map((lang, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        size="lg"
                        className={`hover-lift ${service.color.replace("text-", "bg-")} text-white min-w-[200px]`}
                        onClick={() => window.open(`tel:${service.number}`)}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        {service.number}
                      </Button>
                      <Button variant="outline" size="sm" className="hover-lift bg-transparent">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Start Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Resources */}
        <div className="max-w-4xl mx-auto mt-12 animate-fade-in">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Need More Help?</h3>
              <p className="text-muted-foreground mb-6">
                Our AI health assistant is also available 24/7 to provide guidance and answer your health questions.
              </p>
              <Button size="lg" className="hover-lift" onClick={() => (window.location.href = "/chat?specialty=human")}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat with AI Assistant
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
