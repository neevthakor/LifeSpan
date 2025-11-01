"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send } from "lucide-react"

// This type must match the one in the backend
type Message = {
  role: "user" | "model"
  text: string
}

export default function ChatPage() {
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendPrompt = async () => {
    if (!prompt) return 

    const userMessage: Message = { role: "user", text: prompt }
    
    // We create the full history, including the new message
    const newMessages = [...messages, userMessage];
    
    // Update the chat window right away
    setMessages(newMessages);
    setIsLoading(true);
    setPrompt(""); 

    try {
      // We send the 'history' array to the backend
      const response = await fetch('/api/askGemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // This 'history' object now matches what the backend expects
        body: JSON.stringify({ history: newMessages }), 
      })

      const data = await response.json()

      if (response.ok) {
        // Add the AI's response to the chat
        const aiMessage: Message = { role: "model", text: data.response }
        setMessages((prevMessages) => [...prevMessages, aiMessage])
      } else {
        // Show an error message in the chat
        const errorMsg: Message = { role: "model", text: `Error: ${data.error}` }
        setMessages((prevMessages) => [...prevMessages, errorMsg])
      }

    } catch (error) {
      // Show a network error message in the chat
      const errorMsg: Message = { role: "model", text: "Error: Failed to connect to server." }
      setMessages((prevMessages) => [...prevMessages, errorMsg])
    }

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-8">
      <Card className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl">AI Health Assistant</CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 space-y-4 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-center">
              Ask me anything about health or our services...
              <br/><br/>
              <span className="text-xs">
                (I am an AI. For medical emergencies, please call your local emergency services.)
              </span>
            </p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[80%] whitespace-pre-wrap ${ 
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
        </CardContent>

        {/* Input form */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendPrompt()}
              disabled={isLoading}
            />
            <Button onClick={handleSendPrompt} disabled={isLoading}>
              {isLoading ? "..." : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}