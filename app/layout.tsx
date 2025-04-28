import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { ShoppingCart } from "@/components/shopping-cart"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "@/components/providers/session-provider"

import "@/app/globals.css"

export const metadata = {
  title: "Coco Labs - Engineering Excellence & Innovation",
  description: "Discover our collection of precision-engineered products that blend innovation with functionality.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <CartProvider>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <main className="flex-1">{children}</main>
                <SiteFooter />
                <ShoppingCart />
                <Toaster />
              </div>
            </CartProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
