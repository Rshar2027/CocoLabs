"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, CreditCard } from "lucide-react"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/lib/cart-context"
import { AnimatedGears } from "@/components/animated-gears"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { cart, removeItem, updateQuantity, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "apple-pay">("credit-card")
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  })

  const subtotal = cart.totalPrice
  const shipping = 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  useEffect(() => {
    // If user is authenticated, fetch their profile info
    if (status === "authenticated") {
      fetchUserProfile()
    }
  }, [status])

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/user/profile")
      const data = await response.json()

      if (response.ok && data.profile) {
        setShippingInfo({
          firstName: data.profile.firstName || "",
          lastName: data.profile.lastName || "",
          email: session?.user?.email || "",
          address: data.profile.address || "",
          city: data.profile.city || "",
          state: data.profile.state || "",
          zipCode: data.profile.zipCode || "",
          country: data.profile.country || "",
          phone: data.profile.phone || "",
        })
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckout = async () => {
    setPaymentStatus("processing")

    try {
      // If user is authenticated, save the order to their account
      if (status === "authenticated") {
        const orderItems = cart.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price,
        }))

        await fetch("/api/user/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: orderItems,
            total,
            shippingFee: shipping,
            tax,
            shippingInfo,
            paymentMethod,
            paymentId: `pay_${Date.now()}`, // In a real app, this would come from the payment processor
          }),
        })
      }

      // Simulate payment processing
      setTimeout(() => {
        setPaymentStatus("success")
        // Clear cart after successful payment
        setTimeout(() => {
          clearCart()
        }, 2000)
      }, 2000)
    } catch (error) {
      console.error("Checkout error:", error)
      setPaymentStatus("error")
      toast({
        title: "Error",
        description: "There was a problem processing your payment. Please try again.",
        variant: "destructive",
      })
    }
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-theme-darkBlue hover:bg-theme-blue">
                <Link href="/products">Continue Shopping</Link>
              </Button>
              {status === "authenticated" && (
                <Button asChild variant="outline">
                  <Link href="/account?tab=orders">View Orders</Link>
                </Button>
              )}
            </div>
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
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" value={shippingInfo.lastName} onChange={handleChange} required />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={shippingInfo.address} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={shippingInfo.city} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" value={shippingInfo.state} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input id="zipCode" name="zipCode" value={shippingInfo.zipCode} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" value={shippingInfo.country} onChange={handleChange} required />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={shippingInfo.phone} onChange={handleChange} required />
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
                      <path d="M17.6 12.9c-.1-1.2.5-2.4 1.4-3.1-.5-.8-1.3-1.4-2.2-1.8-1-.4-2-.6-3-.5-1.3.1-2.2.7-2.9 1.2-.2.1-.4.3-.5.4-.1-.1-.3-.2-.5-.4-.7-.5-1.6-1.1-2.9-1.2-1-.1-2 .1-3 .5-.9.4-1.7 1-2.2 1.8.9.7 1.5 1.9 1.4 3.1-.1 1.6-.9 3-2.1 3.8.5.7 1.2 1.3 2 1.7.9.4 1.8.7 2.8.7.5 0 1-.1 1.5-.2.7-.2 1.3-.5 1.8-.9.2-.2.4-.3.6-.5.2.2.4.4.6.5.5.4 1.1.7 1.8.9.5.1 1 .2 1.5.2 1 0 1.9-.2 2.8-.7.8-.4 1.5-1 2-1.7-1.2-.8-2-2.2-2.1-3.8z" />
                    </svg>
                    Apple Pay
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "credit-card" && (
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input id="expiryDate" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input id="nameOnCard" placeholder="John Doe" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="text-muted-foreground">Shipping</p>
                    <p>${shipping.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="text-muted-foreground">Tax</p>
                    <p>${tax.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                </div>

                <Button
                  className="w-full bg-theme-darkBlue hover:bg-theme-blue mt-6"
                  onClick={handleCheckout}
                  disabled={paymentStatus === "processing"}
                >
                  {paymentStatus === "processing" ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Processing...
                    </div>
                  ) : (
                    "Complete Order"
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
