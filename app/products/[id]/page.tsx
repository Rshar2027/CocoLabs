"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Heart, Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  const product = products.find((p) => p.id === productId) || products[0]

  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null)

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex items-center gap-1 text-sm text-neutral-500 mb-6">
        <Link href="/">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products">Products</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-neutral-900">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="object-cover w-full aspect-square"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="overflow-hidden rounded-lg border border-neutral-200">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  width={150}
                  height={150}
                  className="object-cover w-full aspect-square"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {product.badge && (
            <span className="inline-block bg-black text-white text-xs font-medium px-2.5 py-1 rounded">
              {product.badge}
            </span>
          )}
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-neutral-500">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-neutral-500 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="text-neutral-600">{product.description}</p>

          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`h-8 w-8 rounded-full border ${
                      selectedColor === color ? "ring-2 ring-black ring-offset-2" : "border-neutral-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-medium">Quantity</h3>
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={decrementQuantity}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={incrementQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex-1" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="mr-2 h-5 w-5" />
              Wishlist
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="border-t pt-6">
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <p className="text-neutral-600">
                  {product.longDescription ||
                    "This beautifully crafted product is made with the highest quality materials and attention to detail. Each piece is unique and showcases the skill of our artisans."}
                </p>
              </TabsContent>
              <TabsContent value="details" className="pt-4">
                <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                  <li>Handcrafted with care</li>
                  <li>Premium materials</li>
                  <li>Dimensions: 10" x 8" x 4"</li>
                  <li>Weight: 2 lbs</li>
                  <li>Care instructions: Wipe clean with a damp cloth</li>
                </ul>
              </TabsContent>
              <TabsContent value="shipping" className="pt-4">
                <p className="text-neutral-600">
                  Free shipping on orders over $50. Standard delivery takes 3-5 business days. Express shipping options
                  available at checkout.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-cover w-full aspect-square group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-2">
                <h3 className="font-medium">{product.name}</h3>
                <p className="font-medium">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const products = [
  {
    id: 1,
    name: "Handcrafted Ceramic Vase",
    price: 59.99,
    image: "/placeholder.svg?height=600&width=600",
    rating: 5,
    reviews: 24,
    badge: "Bestseller",
    description: "A beautiful handcrafted ceramic vase perfect for displaying your favorite flowers.",
    colors: ["#FFFFFF", "#A7C4BC", "#D8C3A5"],
  },
  {
    id: 2,
    name: "Minimalist Wall Clock",
    price: 49.99,
    image: "/placeholder.svg?height=600&width=600",
    rating: 4,
    reviews: 18,
    description: "A sleek, minimalist wall clock that adds a touch of elegance to any room.",
    colors: ["#000000", "#FFFFFF", "#D8C3A5"],
  },
  {
    id: 3,
    name: "Organic Cotton Throw Pillow",
    price: 34.99,
    image: "/placeholder.svg?height=600&width=600",
    rating: 5,
    reviews: 32,
    badge: "New",
    description: "Soft, comfortable throw pillows made from 100% organic cotton.",
    colors: ["#A7C4BC", "#E8DACB", "#D8C3A5", "#E85A4F"],
  },
]

const relatedProducts = [
  {
    id: 4,
    name: "Handwoven Basket Set",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Wooden Serving Tray",
    price: 45.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "Macrame Wall Hanging",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 7,
    name: "Ceramic Coffee Mug Set",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
  },
]
