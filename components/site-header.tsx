"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Menu, X, Search } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

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
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-5 w-5 text-theme-darkBlue" />
            <span className="sr-only">Cart</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex border-theme-orange text-theme-orange hover:bg-theme-orange hover:text-white"
          >
            Sign In
          </Button>
        </div>
      </div>
    </header>
  )
}
