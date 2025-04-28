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

    const profile = await db.profile.findUnique({
      where: {
        userId: session.user.id,
      },
    })

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { firstName, lastName, phone, address, city, state, zipCode, country } = await req.json()

    const updatedProfile = await db.profile.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        firstName,
        lastName,
        phone,
        address,
        city,
        state,
        zipCode,
        country,
      },
      create: {
        userId: session.user.id,
        firstName,
        lastName,
        phone,
        address,
        city,
        state,
        zipCode,
        country,
      },
    })

    return NextResponse.json({ profile: updatedProfile })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
