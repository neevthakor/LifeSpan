"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Wrench, ArrowLeft, MessageCircle } from "lucide-react"
import Link from "next/link"
import { ChatWidget } from "@/components/chat-widget"

export default function AutomotiveCarePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/categories" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <Activity className="h-8 w-8 text-primary animate-pulse-gentle" />
            <span className="text-2xl font-bold text-foreground">Lifespan</span>
          </Link>

          <Badge variant="secondary">Automotive Care Services</Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Wrench className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-balance mb-4">
            Automotive <span className="text-accent">Care Services</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Professional vehicle maintenance and automotive diagnostic services for optimal performance.
          </p>
        </div>

        {/* AI Chat Section */}
        <div className="max-w-4xl mx-auto animate-fade-in">
          <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center">
                    <MessageCircle className="h-12 w-12 text-accent" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Chat with Our Automotive AI Assistant</h3>
                  <p className="text-muted-foreground mb-4">
                    Get expert automotive advice, diagnostic help, and maintenance guidance from our specialized AI
                    mechanic.
                  </p>
                  <Button size="lg" className="hover-lift bg-accent text-accent-foreground">
                    Start Auto Care Chat
                    <MessageCircle className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ChatWidget specialty="automotive" />
      </main>
    </div>
  )
}
