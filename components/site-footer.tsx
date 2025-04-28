import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Linkedin, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SiteFooter() {
  return (
    <footer className="bg-theme-darkBlue text-white border-t border-theme-blue/20">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <Image
              src="/images/coco-labs-logo.png"
              alt="Coco Labs Logo"
              width={150}
              height={60}
              className="h-12 w-auto invert"
            />
            <p className="text-muted-foreground">
              Precision-engineered products for modern innovation. Quality designs built to last.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-theme-blue hover:text-theme-orange">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-theme-blue hover:text-theme-orange">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-theme-blue hover:text-theme-orange">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-theme-blue hover:text-theme-orange">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-theme-blue hover:text-theme-orange">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-theme-orange transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-theme-orange transition-colors">
                  New Releases
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-theme-orange transition-colors">
                  Featured
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-theme-orange transition-colors">
                  Special Offers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-theme-orange transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-theme-orange transition-colors">
                  Engineering Team
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-theme-orange transition-colors">
                  Innovation Lab
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-theme-orange transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Newsletter</h3>
            <p className="mb-4 text-muted-foreground">
              Subscribe to receive updates on new products, technical insights, and exclusive offers.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-theme-blue border-theme-blue/50 text-white placeholder:text-muted-foreground"
              />
              <Button className="bg-theme-orange text-white hover:bg-theme-orangeLight">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-theme-blue/20 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Coco Labs. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link href="/privacy" className="hover:text-theme-orange transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-theme-orange transition-colors">
              Terms of Service
            </Link>
            <Link href="/shipping" className="hover:text-theme-orange transition-colors">
              Shipping & Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
