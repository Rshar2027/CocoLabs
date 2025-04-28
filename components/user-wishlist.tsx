"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"

type WishlistItem = {
  id: string
  productId: number
  name: string
  price: number
  image: string
  description: string
}

export function UserWishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch("/api/user/wishlist")
        const data = await response.json()

        if (response.ok) {
          setWishlistItems(data.items || [])
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWishlist()
  }, [])

  const handleRemoveFromWishlist = async (itemId: string) => {
    try {
      const response = await fetch(`/api/user/wishlist/${itemId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setWishlistItems((prev) => prev.filter((item) => item.id !== itemId))
        toast({
          title: "Removed from wishlist",
          description: "Item has been removed from your wishlist",
        })
      }
    } catch (error) {
      console.error("Failed to remove from wishlist:", error)
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist",
        variant: "destructive",
      })
    }
  }

  const handleAddToCart = (item: WishlistItem) => {
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

  if (wishlistItems.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Wishlist</CardTitle>
          <CardDescription>Save items you're interested in for later</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Heart className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Your Wishlist is Empty</h3>
          <p className="text-muted-foreground text-center mb-6">
            Add items to your wishlist while browsing our products
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
        <CardTitle>My Wishlist</CardTitle>
        <CardDescription>Save items you're interested in for later</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item) => (
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
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                <div className="mt-4 flex gap-2">
                  <Button
                    className="flex-1 bg-theme-darkBlue hover:bg-theme-blue"
                    size="sm"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove from wishlist</span>
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
