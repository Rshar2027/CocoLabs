"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, CreditCard, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/utils"
import { AnimatedGears } from "@/components/animated-gears"

export default function CheckoutPage() {
  const { cart, removeItem, updateQuantity, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "apple-pay">("credit-card")
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")

  const subtotal = cart.totalPrice
  const shipping = 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleCheckout = async () => {
    setPaymentStatus("processing")

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus("success")
      // Clear cart after successful payment
      setTimeout(() => {
        clearCart()
      }, 2000)
    }, 2000)
  }

  if (cart.items.length === 0) {
    return (
      <div className="container px-4 py-16 md:px-6 md:py-24 flex flex-col items-center justify-center">
        {paymentStatus === "success" ? (
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your order has been placed successfully. We've sent you an email with all the details.
            </p>
            <Button asChild className="bg-theme-darkBlue hover:bg-theme-blue">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="text-center max-w-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-muted-foreground mx-auto mb-6"
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
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild className="bg-theme-darkBlue hover:bg-theme-blue">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative bg-gradient-white-to-black">
      <AnimatedGears color="#0A192F" density="low" speed="slow" />

      <div className="container px-4 py-8 md:px-6 md:py-12 relative z-10">
        <div className="flex items-center gap-2 mb-8">
          <Link href="/products" className="flex items-center text-sm text-theme-darkBlue hover:text-theme-orange">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Continue Shopping
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="San Francisco" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="CA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="94103" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="United States" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)}>
                <div className="flex items-center space-x-2 mb-4">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Credit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="apple-pay" id="apple-pay" />
                  <Label htmlFor="apple-pay" className="flex items-center">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.6 12.9c-.1-1.2.5-2.4 1.4-3.1-.5-.8-1.3-1.4-2.2-1.8-1-.4-2-.3-3 .1-.9.4-1.5.4-2.4 0-1.1-.5-2.2-.5-3.3 0-1.1.5-1.9 1.4-2.4 2.5-1 2.2-.3 5.3 1.4 7.5.8 1.1 1.9 2.3 3.3 2.3 1.3 0 1.8-.8 3.4-.8 1.6 0 2 .8 3.4.8 1.4 0 2.4-1.2 3.2-2.3.6-.9 1.1-1.9 1.4-2.9-1.6-.7-2.6-2.2-2.6-3.9v-.4zM14.5 4.5c.7-.9 1.1-2 1-3.1-1.1.1-2.1.6-2.8 1.4-.7.8-1.1 1.8-1 2.9 1.1 0 2.1-.5 2.8-1.2z" />
                    </svg>
                    Apple Pay
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "credit-card" && (
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="expiry">Expiration Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name-on-card">Name on Card</Label>
                    <Input id="name-on-card" placeholder="John Doe" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(item.price)} × {item.quantity}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-theme-darkBlue hover:bg-theme-blue"
              size="lg"
              onClick={handleCheckout}
              disabled={paymentStatus === "processing"}
            >
              {paymentStatus === "processing" ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Processing...
                </div>
              ) : (
                `Place Order • ${formatCurrency(total)}`
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By placing your order, you agree to our{" "}
              <Link href="#" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
