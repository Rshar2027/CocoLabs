import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const orders = await db.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        orderItems: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Fetch product details for each order item
    const ordersWithProductDetails = await Promise.all(
      orders.map(async (order) => {
        const itemsWithDetails = order.orderItems.map((item) => {
          // In a real app, you would fetch product details from your database
          // For this example, we'll use mock data
          const productDetails = {
            name: `Product #${item.productId}`,
            image: `/placeholder.svg?height=300&width=300`,
          }

          return {
            ...item,
            name: productDetails.name,
            image: productDetails.image,
          }
        })

        return {
          ...order,
          items: itemsWithDetails,
        }
      }),
    )

    return NextResponse.json({ orders: ordersWithProductDetails })
  } catch (error) {
    console.error("Orders fetch error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { items, total, shippingFee, tax, shippingInfo, paymentMethod, paymentId } = await req.json()

    const order = await db.order.create({
      data: {
        userId: session.user.id,
        total,
        shippingFee,
        tax,
        shippingInfo,
        paymentMethod,
        paymentId,
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    })

    return NextResponse.json({ order })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
