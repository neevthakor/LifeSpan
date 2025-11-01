"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle } from "lucide-react"
import Link from "next/link"
import { ChatWidget } from "@/components/chat-widget"
import { ChatDialog } from "@/components/chat-dialog"
import { useState } from "react"

export default function AnimalCarePage() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-secondary/5 to-accent/10">
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
            <Heart className="h-10 w-10 text-secondary" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-balance mb-4">
            Animal <span className="text-secondary">Care Services</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Professional veterinary care and pet health services for your beloved animals.
          </p>
        </div>

        {/* AI Chat Section */}
        <div className="max-w-4xl mx-auto animate-fade-in">
          <Card className="bg-linear-to-r from-secondary/10 to-accent/10 border-secondary/20">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="shrink-0">
                  <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center">
                    <MessageCircle className="h-12 w-12 text-secondary" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Chat with Our Veterinary AI Assistant</h3>
                  <p className="text-muted-foreground mb-4">
                    Get expert advice on pet health, behavior, and care from our specialized veterinary AI assistant.
                  </p>
                  <Button 
                    size="lg" 
                    className="hover-lift bg-secondary text-secondary-foreground"
                    onClick={() => setChatOpen(true)}
                  >
                    Start Pet Care Chat
                    <MessageCircle className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ChatWidget specialty="animal" />
      </main>

      {/* Chat Dialog */}
      <ChatDialog 
        specialty="animal" 
        open={chatOpen} 
        onOpenChange={setChatOpen}
      />
    </div>
  )
}