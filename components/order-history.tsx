"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Package } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

type Order = {
  id: string
  createdAt: string
  status: string
  total: number
  items: {
    id: string
    productId: number
    quantity: number
    price: number
    name: string
    image: string
  }[]
}

export function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/user/orders")
        const data = await response.json()

        if (response.ok) {
          setOrders(data.orders || [])
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-theme-orange border-t-transparent"></div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View your past orders and their status</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Package className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
          <p className="text-muted-foreground text-center mb-6">
            You haven't placed any orders yet. Start shopping to see your orders here.
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
        <CardTitle>Order History</CardTitle>
        <CardDescription>View your past orders and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Order #{order.id.slice(-8)}</p>
                  <p className="text-xs text-muted-foreground">
                    Placed on {format(new Date(order.createdAt), "MMMM d, yyyy")}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      order.status === "DELIVERED"
                        ? "default"
                        : order.status === "CANCELLED"
                          ? "destructive"
                          : "outline"
                    }
                  >
                    {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                  </Badge>
                  <p className="font-medium">{formatCurrency(order.total)}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="grid gap-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
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
                        <Link href={`/products/${item.productId}`} className="font-medium hover:underline">
                          {item.name}
                        </Link>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>
                            {formatCurrency(item.price)} × {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
