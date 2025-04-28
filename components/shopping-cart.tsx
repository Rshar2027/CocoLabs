"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { XMarkIcon } from "@heroicons/react/24/outline"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/utils"

export function ShoppingCart() {
  const { cart, removeItem, updateQuantity, closeCart } = useCart()
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0
    }
  }, [cart.isOpen])

  return (
    <Sheet open={cart.isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:w-[400px] bg-white border-l border-theme-darkBlue">
        <SheetHeader className="space-y-2.5">
          <SheetTitle>Shopping Cart ({cart.totalItems})</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6">
          {cart.items.length > 0 ? (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded-md border">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">{item.name}</h3>
                        <div className="flex items-center justify-between mt-1.5">
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(item.price)} × {item.quantity}
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                              </svg>
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM5.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM17 11.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                              </svg>
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground"
                              onClick={() => removeItem(item.id)}
                            >
                              <XMarkIcon className="h-4 w-4" />
                              <span className="sr-only">Remove item</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 px-4">
                <Separator />
                <div className="mt-4 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(cart.totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(cart.totalPrice)}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 px-4">
                <Button asChild className="w-full bg-theme-darkBlue hover:bg-theme-blue">
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full px-4 py-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-muted-foreground mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground">Add items to your cart to continue.</p>
              <Button asChild className="mt-4 bg-theme-darkBlue hover:bg-theme-blue">
                <Link href="/products">Browse products</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
