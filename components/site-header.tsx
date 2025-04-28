"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Menu, X, Search, User } from "lucide-react"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { cart, openCart } = useCart()
  const { data: session, status } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-theme-blue bg-white shadow-sm">
      <div className="container flex h-20 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6 text-theme-darkBlue" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white border-theme-darkBlue">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-lg font-semibold text-theme-darkBlue hover:text-theme-orange transition-colors"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-lg font-semibold text-theme-darkBlue hover:text-theme-orange transition-colors"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-lg font-semibold text-theme-darkBlue hover:text-theme-orange transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-lg font-semibold text-theme-darkBlue hover:text-theme-orange transition-colors"
              >
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/coco-labs-logo.png"
              alt="Coco Labs Logo"
              width={120}
              height={50}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        <nav className="mx-auto hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-theme-darkBlue hover:text-theme-orange transition-colors">
            Home
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium text-theme-darkBlue hover:text-theme-orange transition-colors"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-theme-darkBlue hover:text-theme-orange transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-theme-darkBlue hover:text-theme-orange transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="relative flex items-center">
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] pr-8 bg-white border-theme-darkBlue text-theme-darkBlue"
                autoFocus
              />
              <Button variant="ghost" size="icon" className="absolute right-0" onClick={() => setIsSearchOpen(false)}>
                <X className="h-4 w-4 text-theme-darkBlue" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5 text-theme-darkBlue" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={openCart} className="relative">
            <ShoppingBag className="h-5 w-5 text-theme-darkBlue" />
            {cart.totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-theme-orange text-white text-xs flex items-center justify-center">
                {cart.totalItems}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Button>

          {status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  {session.user.image ? (
                    <Image
                      src={session.user.image || "/placeholder.svg"}
                      alt={session.user.name || "User"}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-theme-darkBlue flex items-center justify-center text-white text-sm font-bold">
                      {session.user.name?.charAt(0) || "U"}
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {session.user.name && <p className="font-medium">{session.user.name}</p>}
                    {session.user.email && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{session.user.email}</p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account?tab=orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account?tab=wishlist">Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={(event) => {
                    event.preventDefault()
                    signOut({ callbackUrl: "/" })
                  }}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hidden md:flex border-theme-orange text-theme-orange hover:bg-theme-orange hover:text-white"
            >
              <Link href="/auth/signin">
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
