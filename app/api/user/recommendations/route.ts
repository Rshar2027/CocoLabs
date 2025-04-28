import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { xai } from "@ai-sdk/xai"
import { generateText } from "ai"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Get user's order history and product views
    const orders = await db.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        orderItems: true,
      },
    })

    const productViews = await db.productView.findMany({
      where: {
        userId: session.user.id,
      },
    })

    // Get user profile
    const profile = await db.profile.findUnique({
      where: {
        userId: session.user.id,
      },
    })

    // Sample product catalog (in a real app, this would come from your database)
    const products = [
      {
        id: 1,
        name: "Precision CNC Machined Component",
        price: 159.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "components",
        tags: ["cnc", "aluminum", "precision"],
        description: "Aircraft-grade aluminum with sub-micron tolerances for critical applications.",
      },
      {
        id: 2,
        name: "Advanced Modular Controller",
        price: 249.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "electronics",
        tags: ["controller", "modular", "programmable"],
        description: "Programmable control system with multiple I/O ports and wireless connectivity.",
      },
      {
        id: 3,
        name: "Carbon Fiber Composite Frame",
        price: 334.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "structures",
        tags: ["carbon-fiber", "lightweight", "durable"],
        description: "Ultra-lightweight yet incredibly strong frame for aerospace and robotics applications.",
      },
      {
        id: 4,
        name: "Precision Sensor Array",
        price: 189.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "electronics",
        tags: ["sensors", "precision", "array"],
        description: "High-accuracy sensor array for environmental monitoring and data collection.",
      },
      {
        id: 5,
        name: "Titanium Mounting Brackets",
        price: 79.99,
        image: "/placeholder.svg?height=400&width=400",
        category: "components",
        tags: ["titanium", "mounting", "lightweight"],
        description: "Aerospace-grade titanium brackets with exceptional strength-to-weight ratio.",
      },
    ]

    // Create user profile for AI recommendation
    const purchasedProductIds = orders.flatMap((order) => order.orderItems.map((item) => item.productId))

    const viewedProductIds = productViews.map((view) => view.productId)

    // Use Grok AI to generate personalized recommendations
    const userProfile = {
      purchasedProducts: purchasedProductIds,
      viewedProducts: viewedProductIds,
      location: profile?.city ? `${profile.city}, ${profile.state}` : "Unknown",
      // Add any other relevant user data
    }

    // Get existing recommendations or generate new ones
    let recommendations = await db.recommendation.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        score: "desc",
      },
      take: 6,
    })

    // If no recommendations exist or they're older than 7 days, generate new ones
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const needsNewRecommendations =
      recommendations.length === 0 || recommendations.some((rec) => new Date(rec.updatedAt) < oneWeekAgo)

    if (needsNewRecommendations) {
      // Use Grok AI to generate recommendations
      const availableProductIds = products.map((p) => p.id)
      const productData = products.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        tags: p.tags,
        description: p.description,
      }))

      const prompt = `
        You are a product recommendation AI for an engineering products company.
        
        User profile:
        - Purchased products: ${userProfile.purchasedProducts.join(", ") || "None yet"}
        - Viewed products: ${userProfile.viewedProducts.join(", ") || "None yet"}
        - Location: ${userProfile.location}
        
        Available products:
        ${JSON.stringify(productData, null, 2)}
        
        Based on the user's profile, recommend 3-5 products from the available products list.
        For each recommendation, provide:
        1. The product ID
        2. A score between 0 and 1 indicating how well it matches the user
        3. A brief, personalized reason why this product would be good for this specific user
        
        Format your response as valid JSON like this:
        {
          "recommendations": [
            {
              "productId": 1,
              "score": 0.95,
              "reason": "This product complements your recent purchase of product X"
            },
            ...
          ]
        }
      `

      try {
        const { text } = await generateText({
          model: xai("grok-1"),
          prompt,
        })

        // Parse the AI response
        const aiResponse = JSON.parse(text)

        // Save the new recommendations to the database
        await db.recommendation.deleteMany({
          where: {
            userId: session.user.id,
          },
        })

        for (const rec of aiResponse.recommendations) {
          await db.recommendation.create({
            data: {
              userId: session.user.id,
              productId: rec.productId,
              score: rec.score,
              reason: rec.reason,
            },
          })
        }

        // Fetch the newly created recommendations
        recommendations = await db.recommendation.findMany({
          where: {
            userId: session.user.id,
          },
          orderBy: {
            score: "desc",
          },
        })
      } catch (error) {
        console.error("AI recommendation error:", error)
        // If AI fails, use fallback recommendations
        if (recommendations.length === 0) {
          recommendations = [
            {
              id: "fallback-1",
              userId: session.user.id,
              productId: 1,
              score: 0.9,
              reason: "This is one of our most popular products",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "fallback-2",
              userId: session.user.id,
              productId: 2,
              score: 0.85,
              reason: "Many customers find this product useful",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "fallback-3",
              userId: session.user.id,
              productId: 3,
              score: 0.8,
              reason: "This product has excellent reviews",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ]
        }
      }
    }

    // Combine recommendations with product details
    const recommendationsWithDetails = recommendations.map((rec) => {
      const product = products.find((p) => p.id === rec.productId) || {
        id: rec.productId,
        name: `Product #${rec.productId}`,
        price: 99.99,
        image: "/placeholder.svg?height=400&width=400",
        description: "Product description not available",
      }

      return {
        id: rec.id,
        productId: rec.productId,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        score: rec.score,
        reason: rec.reason,
      }
    })

    return NextResponse.json({ recommendations: recommendationsWithDetails })
  } catch (error) {
    console.error("Recommendations error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
