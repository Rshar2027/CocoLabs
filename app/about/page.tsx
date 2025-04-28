import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Our Story</h1>
            <p className="mt-4 text-lg text-neutral-600">
              Founded in 2018, our small business began with a passion for creating beautiful, functional designs that
              bring joy to everyday life. What started as a hobby in a small home studio has grown into a thriving
              business with a dedicated team of artisans.
            </p>
            <p className="mt-4 text-lg text-neutral-600">
              We believe in the power of handcrafted items to create meaningful connections and spaces. Each piece in
              our collection is thoughtfully designed and meticulously crafted to stand the test of time.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="Our workshop" fill className="object-cover" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="Our values" fill className="object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold tracking-tight">Our Values</h2>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Quality Craftsmanship</h3>
                <p className="mt-2 text-neutral-600">
                  We take pride in our attention to detail and commitment to quality. Each product is made with care
                  using the finest materials.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Sustainability</h3>
                <p className="mt-2 text-neutral-600">
                  We're committed to sustainable practices, from sourcing eco-friendly materials to minimizing waste in
                  our production process.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Community</h3>
                <p className="mt-2 text-neutral-600">
                  We believe in supporting local communities and work with artisans who share our values and passion for
                  craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Meet Our Team</h2>
          <p className="max-w-2xl mx-auto text-lg text-neutral-600">
            The talented individuals behind our beautiful products.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-neutral-500">{member.role}</p>
              <p className="mt-2 text-neutral-600">{member.bio}</p>
            </div>
          ))}
        </div>

        <div className="bg-neutral-50 rounded-lg p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Visit Our Studio</h2>
              <p className="mt-4 text-lg text-neutral-600">
                We welcome visitors to our studio where you can see our artisans at work and browse our full collection.
              </p>
              <div className="mt-6 space-y-2">
                <p className="text-neutral-600">123 Craft Lane</p>
                <p className="text-neutral-600">Artisan District</p>
                <p className="text-neutral-600">Creativeville, CV 12345</p>
              </div>
              <div className="mt-6">
                <p className="text-neutral-600">Open Monday-Friday: 10am-6pm</p>
                <p className="text-neutral-600">Saturday: 11am-4pm</p>
              </div>
              <Button className="mt-6">Get Directions</Button>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=300&width=500" alt="Our studio" fill className="object-cover" />
            </div>
          </div>
        </div>

        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Ready to Shop?</h2>
          <p className="max-w-2xl mx-auto text-lg text-neutral-600">
            Browse our collection of handcrafted products and find something special for your home.
          </p>
          <Button asChild size="lg">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

const team = [
  {
    name: "Emma Johnson",
    role: "Founder & Lead Designer",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Emma founded the company with a vision to create beautiful, functional designs for the modern home.",
  },
  {
    name: "Michael Chen",
    role: "Master Craftsman",
    image: "/placeholder.svg?height=300&width=300",
    bio: "With over 15 years of experience, Michael brings exceptional skill and precision to each piece.",
  },
  {
    name: "Sophia Rodriguez",
    role: "Textile Specialist",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Sophia's background in textile design informs her unique approach to patterns and materials.",
  },
  {
    name: "David Kim",
    role: "Production Manager",
    image: "/placeholder.svg?height=300&width=300",
    bio: "David ensures that each product meets our high standards of quality and craftsmanship.",
  },
]
