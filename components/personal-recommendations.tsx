"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Bot, ShoppingCart } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"

type Recommendation = {
  id: string
  productId: number
  name: string
  price: number
  image: string
  description: string
  score: number
  reason: string
}

export function PersonalRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch("/api/user/recommendations")
        const data = await response.json()

        if (response.ok) {
          setRecommendations(data.recommendations || [])
        }
      } catch (error) {
        console.error("Failed to fetch recommendations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  const handleAddToCart = (item: Recommendation) => {
    addItem({
      id: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
    })

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-theme-orange border-t-transparent"></div>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
          <CardDescription>Products selected just for you by our AI</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Bot className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Recommendations Yet</h3>
          <p className="text-muted-foreground text-center mb-6">
            Browse and purchase products to get personalized recommendations
          </p>
          <Button asChild className="bg-theme-darkBlue hover:bg-theme-blue">
            <Link href="/products">Browse Products</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalized Recommendations</CardTitle>
        <CardDescription>Products selected just for you by our AI</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((item) => (
            <div key={item.id} className="group relative border rounded-lg overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <Link href={`/products/${item.productId}`} className="font-medium hover:underline">
                  {item.name}
                </Link>
                <p className="mt-1 font-medium">{formatCurrency(item.price)}</p>
                <div className="mt-2 p-3 bg-muted rounded-md">
                  <p className="text-sm italic">"{item.reason}"</p>
                </div>
                <div className="mt-4">
                  <Button
                    className="w-full bg-theme-darkBlue hover:bg-theme-blue"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
