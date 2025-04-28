import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const itemId = params.id

    // Verify the item belongs to the user's wishlist
    const wishlist = await db.wishlist.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          where: {
            id: itemId,
          },
        },
      },
    })

    if (!wishlist || wishlist.items.length === 0) {
      return NextResponse.json({ message: "Item not found in wishlist" }, { status: 404 })
    }

    // Delete the item
    await db.wishlistItem.delete({
      where: {
        id: itemId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Wishlist delete error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
