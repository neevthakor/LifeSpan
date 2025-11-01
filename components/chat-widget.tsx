"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot } from "lucide-react"

interface ChatWidgetProps {
  specialty?: "human" | "animal" | "automotive"
}

export function ChatWidget({ specialty = "human" }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const getSpecialtyInfo = () => {
    switch (specialty) {
      case "animal":
        return {
          title: "Veterinary AI Assistant",
          placeholder: "Ask about pet health, behavior, or care...",
          color: "text-secondary",
          bgColor: "bg-secondary",
        }
      case "automotive":
        return {
          title: "Automotive AI Assistant",
          placeholder: "Ask about vehicle issues, maintenance...",
          color: "text-accent",
          bgColor: "bg-accent",
        }
      default:
        return {
          title: "Health AI Assistant",
          placeholder: "Ask about health concerns, symptoms...",
          color: "text-primary",
          bgColor: "bg-primary",
        }
    }
  }

  const specialtyInfo = getSpecialtyInfo()

  const handleSendMessage = () => {
    if (message.trim()) {
      // Redirect to full chat page with context
      window.location.href = `/chat?specialty=${specialty}&message=${encodeURIComponent(message)}`
    }
  }

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className={`rounded-full w-16 h-16 ${specialtyInfo.bgColor} hover-lift animate-pulse-gentle shadow-lg`}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 animate-fade-in">
          <Card className="shadow-xl border-2">
            <CardHeader className={`${specialtyInfo.bgColor}/10 border-b`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full ${specialtyInfo.bgColor}/20 flex items-center justify-center`}>
                    <Bot className={`h-4 w-4 ${specialtyInfo.color}`} />
                  </div>
                  <CardTitle className="text-sm">{specialtyInfo.title}</CardTitle>
                </div>
                <Button
                  className="bg-transparent px-2 py-1"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Bot className={`h-4 w-4 mt-0.5 ${specialtyInfo.color}`} />
                    <p className="text-sm">
                      Hello! I'm here to help with your {specialty === "automotive" ? "vehicle" : specialty} health
                      questions. What can I assist you with?
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={specialtyInfo.placeholder}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleSendMessage} disabled={!message.trim()} className="flex-1 hover-lift">
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                    <Button
                      className="bg-transparent"
                      onClick={() => (window.location.href = `/chat?specialty=${specialty}`)}
                    >
                      Full Chat
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
