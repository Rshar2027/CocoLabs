import { streamText } from "ai"
import type { Message } from "ai"

export const runtime = "edge"

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json()

  // Add product knowledge context to help the AI provide better responses
  const productContext = `
    You are a product assistant for Coco Labs, a company that specializes in precision-engineered products.
    
    Our main product categories include:
    1. CNC Machined Components - Aircraft-grade aluminum with sub-micron tolerances
    2. Advanced Modular Controllers - Programmable control systems with multiple I/O ports
    3. Carbon Fiber Composite Frames - Ultra-lightweight yet strong frames for various applications
    
    Key features of our products:
    - Precision engineering with micron-level accuracy
    - Advanced materials including aerospace-grade aluminum and carbon fiber
    - Smart technology with integrated sensors and IoT connectivity
    - Open source software and expandable platforms
    
    Our engineering process involves:
    1. Research & Design - Extensive research and CAD modeling
    2. Prototyping & Testing - Rigorous testing in extreme conditions
    3. Precision Manufacturing - Advanced processes with minimal tolerance
    
    Always be helpful, informative, and enthusiastic about our products. If you don't know specific details, 
    suggest that the customer contact our support team for more information.
  `

  // Format messages for the API
  const formattedMessages: Message[] = [{ role: "system", content: productContext }, ...messages]

  // Convert the messages array into a prompt string
  const prompt =
    formattedMessages
      .map((message) => {
        if (message.role === "system") {
          return `Instructions: ${message.content}\n\n`
        } else if (message.role === "user") {
          return `User: ${message.content}\n`
        } else {
          return `Assistant: ${message.content}\n`
        }
      })
      .join("") + "Assistant:"

  // Use the streamText function from the AI SDK
  const result = await streamText({
    model: {
      provider: "openai",
      model: "gpt-4o",
      apiKey: process.env.XAI_API_KEY || "",
    },
    prompt,
    stream: true,
  })

  return new Response(result.textStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
