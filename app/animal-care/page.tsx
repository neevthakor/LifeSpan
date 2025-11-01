"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageCircle } from "lucide-react"
import { SimpleChatDialog } from "@/components/simple-chat-dialog"
import { useState } from "react"

export default function AnimalCarePage() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-secondary/5 to-accent/10">
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
            <Heart className="h-10 w-10 text-secondary" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Animal <span className="text-secondary">Care Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional veterinary care and pet health services for your beloved animals.
          </p>
        </div>

        {/* AI Chat Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="border-secondary/20">
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
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
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
      </main>

      {/* Floating Chat Button */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 bg-secondary text-secondary-foreground px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow z-40 flex items-center gap-2"
      >
        <MessageCircle className="h-5 w-5" />
        <span>Chat Now</span>
      </button>

      {/* Chat Dialog */}
      <SimpleChatDialog 
        open={chatOpen} 
        onClose={() => setChatOpen(false)}
      />
    </div>
  )
}