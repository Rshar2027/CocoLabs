"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Filter, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function ProductsPage() {
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortOption, setSortOption] = useState("featured")

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col space-y-4 md:space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-neutral-500 mt-2">Browse our collection of handcrafted designs.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
              <Input type="search" placeholder="Search products..." className="pl-8" />
            </div>

            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 lg:hidden">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Narrow down your product search.</SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-6 py-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Categories</h3>
                      <div className="grid gap-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center gap-2">
                            <Checkbox id={`category-${category}`} />
                            <Label htmlFor={`category-${category}`} className="text-sm font-normal">
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Price Range</h3>
                        <p className="text-sm text-neutral-500">
                          ${priceRange[0]} - ${priceRange[1]}
                        </p>
                      </div>
                      <Slider
                        defaultValue={[0, 200]}
                        max={200}
                        step={1}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Colors</h3>
                      <div className="grid grid-cols-5 gap-2">
                        {colors.map((color) => (
                          <div key={color.name} className="flex flex-col items-center gap-1">
                            <div
                              className="h-8 w-8 rounded-full border border-neutral-200"
                              style={{ backgroundColor: color.hex }}
                            />
                            <span className="text-xs">{color.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    Sort by: {sortOptions.find((option) => option.value === sortOption)?.label}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem key={option.value} onClick={() => setSortOption(option.value)}>
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="hidden lg:block space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Categories</h3>
                <div className="grid gap-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center gap-2">
                      <Checkbox id={`desktop-category-${category}`} />
                      <Label htmlFor={`desktop-category-${category}`} className="text-sm font-normal">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Price Range</h3>
                  <p className="text-sm text-neutral-500">
                    ${priceRange[0]} - ${priceRange[1]}
                  </p>
                </div>
                <Slider defaultValue={[0, 200]} max={200} step={1} value={priceRange} onValueChange={setPriceRange} />
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Colors</h3>
                <div className="grid grid-cols-5 gap-2">
                  {colors.map((color) => (
                    <div key={color.name} className="flex flex-col items-center gap-1">
                      <div
                        className="h-8 w-8 rounded-full border border-neutral-200"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-xs">{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`} className="group">
                    <div className="relative overflow-hidden rounded-lg">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="object-cover w-full aspect-square group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.badge && (
                        <div className="absolute top-2 right-2 bg-black text-white text-xs font-medium px-2 py-1 rounded">
                          {product.badge}
                        </div>
                      )}
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                        </div>
                        <span className="text-sm text-neutral-500 ml-2">({product.reviews})</span>
                      </div>
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <p className="font-medium">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" disabled>
                    <ChevronDown className="h-4 w-4 rotate-90" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 w-9">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 w-9">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 w-9">
                    3
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const categories = ["Home Decor", "Kitchen", "Furniture", "Lighting", "Textiles", "Wall Art"]

const colors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Gray", hex: "#808080" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Brown", hex: "#964B00" },
  { name: "Green", hex: "#008000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Red", hex: "#FF0000" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Orange", hex: "#FFA500" },
]

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
  { label: "Best Selling", value: "best-selling" },
]

const products = [
  {
    id: 1,
    name: "Handcrafted Ceramic Vase",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 5,
    reviews: 24,
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Minimalist Wall Clock",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4,
    reviews: 18,
  },
  {
    id: 3,
    name: "Organic Cotton Throw Pillow",
    price: 34.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 5,
    reviews: 32,
    badge: "New",
  },
  {
    id: 4,
    name: "Handwoven Basket Set",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4,
    reviews: 12,
  },
  {
    id: 5,
    name: "Wooden Serving Tray",
    price: 45.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 5,
    reviews: 28,
  },
  {
    id: 6,
    name: "Macrame Wall Hanging",
    price: 39.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4,
    reviews: 15,
  },
  {
    id: 7,
    name: "Ceramic Coffee Mug Set",
    price: 29.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 5,
    reviews: 42,
    badge: "Limited",
  },
  {
    id: 8,
    name: "Linen Table Runner",
    price: 24.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4,
    reviews: 19,
  },
  {
    id: 9,
    name: "Handmade Soap Set",
    price: 19.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 5,
    reviews: 36,
  },
]
