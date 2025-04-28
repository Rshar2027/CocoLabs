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

    // Get user's wishlist
    const wishlist = await db.wishlist.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        items: true,
      },
    })

    if (!wishlist) {
      return NextResponse.json({ items: [] })
    }

    // Fetch product details for each wishlist item
    const itemsWithDetails = wishlist.items.map((item) => {
      // In a real app, you would fetch product details from your database
      // For this example, we'll use mock data
      const productDetails = {
        name: `Product #${item.productId}`,
        price: 49.99 + (item.productId % 10) * 10,
        image: `/placeholder.svg?height=300&width=300`,
        description: "This is a sample product description. In a real app, this would be fetched from your database.",
      }

      return {
        id: item.id,
        productId: item.productId,
        name: productDetails.name,
        price: productDetails.price,
        image: productDetails.image,
        description: productDetails.description,
      }
    })

    return NextResponse.json({ items: itemsWithDetails })
  } catch (error) {
    console.error("Wishlist fetch error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { productId } = await req.json()

    if (!productId) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 })
    }

    // Get or create user's wishlist
    let wishlist = await db.wishlist.findUnique({
      where: {
        userId: session.user.id,
      },
    })

    if (!wishlist) {
      wishlist = await db.wishlist.create({
        data: {
          userId: session.user.id,
        },
      })
    }

    // Check if item already exists in wishlist
    const existingItem = await db.wishlistItem.findFirst({
      where: {
        wishlistId: wishlist.id,
        productId: Number(productId),
      },
    })

    if (existingItem) {
      return NextResponse.json({ message: "Item already in wishlist" }, { status: 409 })
    }

    // Add item to wishlist
    const wishlistItem = await db.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId: Number(productId),
      },
    })

    return NextResponse.json({ item: wishlistItem })
  } catch (error) {
    console.error("Wishlist add error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
