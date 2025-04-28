"use client"
import { Bot, Send, User } from "lucide-react"
import type React from "react"

import { useState, useRef, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export function ProductAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      role: "assistant",
      content:
        "Hi there! I'm your product assistant. I can help you understand our products, their specifications, and how they might fit your needs. What would you like to know?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Send request to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      // Read the response as text
      const data = await response.text()

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto border border-theme-darkBlue/20 bg-white shadow-lg">
      <CardHeader className="bg-theme-darkBlue border-b border-theme-darkBlue/20">
        <CardTitle className="flex items-center gap-2 text-white">
          <Bot className="h-5 w-5 text-theme-orange" />
          Product Assistant
        </CardTitle>
        <CardDescription className="text-white/70">
          Ask questions about our products, specifications, or design process
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("mb-4 flex", message.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "flex items-start gap-3 rounded-lg px-4 py-2 max-w-[80%]",
                  message.role === "user"
                    ? "bg-theme-orange text-white"
                    : "bg-theme-darkBlue text-white border border-theme-darkBlue/20",
                )}
              >
                <div className="mt-0.5">
                  {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                </div>
                <div className="text-sm">{message.content}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="flex items-start gap-3 rounded-lg px-4 py-2 bg-theme-darkBlue text-white border border-theme-darkBlue/20">
                <div className="mt-0.5">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-theme-orange rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-theme-orange rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-theme-orange rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t border-theme-darkBlue/20 p-4">
        <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
          <Input
            placeholder="Ask about our products..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border-theme-darkBlue/20 bg-white text-theme-darkBlue"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="bg-theme-darkBlue hover:bg-theme-blue text-white"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
