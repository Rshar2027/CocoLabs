import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight, Code, Cpu, Database, ShoppingBag, Star, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductAssistant } from "@/components/product-assistant"
import { GearPattern } from "@/components/gear-pattern"
import { AnimatedGears, LargeGear, MediumGear, SmallGear } from "@/components/animated-gears"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Black to White Gradient */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-black-to-white clip-path-slant relative overflow-hidden">
        <GearPattern className="text-theme-darkBlue" />
        <AnimatedGears color="#0A192F" density="medium" speed="slow" />

        {/* Fixed position decorative gears */}
        <div className="absolute top-20 right-[5%] opacity-10 pointer-events-none hidden lg:block">
          <LargeGear className="w-40 h-40 animate-spin-slow" color="#0A192F" />
        </div>
        <div className="absolute bottom-20 left-[5%] opacity-10 pointer-events-none hidden lg:block">
          <MediumGear className="w-32 h-32 animate-spin-reverse-slow" color="#0A192F" />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4 animate-fade-up">
              <div className="inline-flex items-center rounded-full border border-theme-orange/40 bg-theme-orange/10 px-3 py-1 text-sm text-theme-orange">
                <span>Engineering Excellence</span>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-theme-darkBlue text-shadow">
                  Innovation & <span className="blue-orange-gradient">Precision</span>
                </h1>
                <p className="max-w-[600px] text-theme-darkBlue/70 md:text-xl">
                  Discover our collection of precision-engineered products that blend cutting-edge technology with
                  functional design.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-theme-darkBlue text-white hover:bg-theme-blue">
                  <Link href="/products">
                    Explore Products <ShoppingBag className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-theme-orange text-theme-orange hover:bg-theme-orange hover:text-white"
                >
                  <Link href="/about">Our Technology</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center animate-fade-in">
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-theme-darkBlue to-theme-orange opacity-75 blur"></div>
                <div className="relative rounded-lg overflow-hidden flex items-center justify-center p-8 bg-white">
                  <Image
                    src="/images/coco-labs-logo.png"
                    alt="Coco Labs Logo"
                    width={400}
                    height={400}
                    className="w-full h-auto max-w-[400px] logo-shadow animate-float-slow"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Tech Specs Section - White to Black Gradient */}
      <section className="w-full py-12 md:py-16 bg-gradient-white-to-black dark-section relative">
        <GearPattern className="text-white" />
        <AnimatedGears color="#FFFFFF" density="low" speed="medium" />

        {/* Fixed position decorative gears */}
        <div className="absolute top-10 left-[10%] opacity-10 pointer-events-none hidden lg:block">
          <SmallGear className="w-24 h-24 animate-spin-medium" color="#FFFFFF" />
        </div>
        <div className="absolute bottom-10 right-[10%] opacity-10 pointer-events-none hidden lg:block">
          <MediumGear className="w-32 h-32 animate-spin-reverse-medium" color="#FFFFFF" />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="tech-card bg-theme-blue/50 p-6 rounded-lg border border-theme-blue backdrop-blur-sm">
              <Cpu className="h-8 w-8 mb-3 text-theme-orange" />
              <h3 className="text-lg font-semibold text-white white-text-shadow">Precision Engineering</h3>
              <p className="text-white/70 text-sm mt-2">Crafted with micron-level precision for optimal performance</p>
            </div>
            <div className="tech-card bg-theme-blue/50 p-6 rounded-lg border border-theme-blue backdrop-blur-sm">
              <Zap className="h-8 w-8 mb-3 text-theme-orange" />
              <h3 className="text-lg font-semibold text-white white-text-shadow">Advanced Materials</h3>
              <p className="text-white/70 text-sm mt-2">Utilizing aerospace-grade materials for durability</p>
            </div>
            <div className="tech-card bg-theme-blue/50 p-6 rounded-lg border border-theme-blue backdrop-blur-sm">
              <Database className="h-8 w-8 mb-3 text-theme-orange" />
              <h3 className="text-lg font-semibold text-white white-text-shadow">Smart Technology</h3>
              <p className="text-white/70 text-sm mt-2">Integrated sensors and IoT connectivity</p>
            </div>
            <div className="tech-card bg-theme-blue/50 p-6 rounded-lg border border-theme-blue backdrop-blur-sm">
              <Code className="h-8 w-8 mb-3 text-theme-orange" />
              <h3 className="text-lg font-semibold text-white white-text-shadow">Open Source</h3>
              <p className="text-white/70 text-sm mt-2">Customizable software and expandable platforms</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Featured Products - Radial Gradient */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-radial relative">
        <GearPattern className="text-theme-darkBlue" />
        <AnimatedGears color="#0A192F" density="medium" speed="slow" />

        {/* Connected gears decoration */}
        <div className="absolute top-1/4 right-[5%] opacity-10 pointer-events-none hidden lg:block">
          <div className="relative">
            <LargeGear className="w-40 h-40 animate-spin-slow" color="#0A192F" />
            <MediumGear
              className="w-28 h-28 animate-spin-reverse-slow absolute"
              color="#0A192F"
              style={{ top: "-20px", left: "80px" }}
            />
            <SmallGear
              className="w-20 h-20 animate-spin-medium absolute"
              color="#0A192F"
              style={{ top: "40px", left: "60px" }}
            />
          </div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-theme-darkBlue orange-accent text-shadow">
                Featured Products
              </h2>
              <p className="max-w-[700px] text-theme-darkBlue/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our most innovative designs, engineered for excellence.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-theme-blue/20 h-full tech-card shadow-sm">
                  <div className="relative overflow-hidden aspect-square">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="object-cover w-full aspect-square group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <div className="absolute top-2 right-2 bg-theme-orange text-white text-xs font-medium px-2 py-1 rounded">
                        {product.badge}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < product.rating ? "text-theme-orange fill-theme-orange" : "text-gray-300"
                              }`}
                            />
                          ))}
                      </div>
                      <span className="text-sm text-theme-darkBlue/60 ml-2">({product.reviews})</span>
                    </div>
                    <h3 className="font-medium text-lg mt-2 text-theme-darkBlue group-hover:text-theme-orange transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-theme-darkBlue/70 mt-1">{product.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <p className="font-medium text-theme-orange">${product.price.toFixed(2)}</p>
                      <Button variant="ghost" size="sm" className="text-theme-darkBlue group-hover:text-theme-orange">
                        Details <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-theme-darkBlue text-theme-darkBlue hover:bg-theme-darkBlue hover:text-white"
            >
              <Link href="/products">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Design Process - Diagonal Gradient */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-diagonal dark-section clip-path-slant-reverse relative">
        <GearPattern className="text-white" />
        <AnimatedGears color="#FFFFFF" density="medium" speed="medium" />

        {/* Fixed position decorative gears */}
        <div className="absolute bottom-20 left-[15%] opacity-10 pointer-events-none hidden lg:block">
          <LargeGear className="w-48 h-48 animate-spin-slow" color="#FFFFFF" />
        </div>
        <div className="absolute top-20 right-[15%] opacity-10 pointer-events-none hidden lg:block">
          <SmallGear className="w-24 h-24 animate-spin-reverse-fast" color="#FFFFFF" />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white orange-accent white-text-shadow">
                Engineering Process
              </h2>
              <p className="max-w-[700px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From concept to creation, see how our precision-engineered products come to life.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center space-y-4 p-6 rounded-lg bg-theme-blue/30 backdrop-blur-sm border border-theme-blue tech-card">
              <div className="p-3 bg-theme-blue/50 rounded-full text-theme-orange">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white white-text-shadow">Research & Design</h3>
              <p className="text-center text-white/70">
                We begin with extensive research and CAD modeling to create the perfect design specifications.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 rounded-lg bg-theme-blue/30 backdrop-blur-sm border border-theme-blue tech-card">
              <div className="p-3 bg-theme-blue/50 rounded-full text-theme-orange">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white white-text-shadow">Prototyping & Testing</h3>
              <p className="text-center text-white/70">
                Each prototype undergoes rigorous testing in extreme conditions to ensure reliability and performance.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 rounded-lg bg-theme-blue/30 backdrop-blur-sm border border-theme-blue tech-card">
              <div className="p-3 bg-theme-blue/50 rounded-full text-theme-orange">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white white-text-shadow">Precision Manufacturing</h3>
              <p className="text-center text-white/70">
                Our advanced manufacturing processes ensure each product meets exact specifications with minimal
                tolerance.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            <div className="relative rounded-lg overflow-hidden group">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Engineering Process"
                width={300}
                height={300}
                className="rounded-lg object-cover aspect-square group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-darkBlue/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-4 text-sm">CAD Design Phase</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden group">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Engineering Process"
                width={300}
                height={300}
                className="rounded-lg object-cover aspect-square group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-darkBlue/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-4 text-sm">Material Testing</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden group">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Engineering Process"
                width={300}
                height={300}
                className="rounded-lg object-cover aspect-square group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-darkBlue/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-4 text-sm">CNC Machining</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden group">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Engineering Process"
                width={300}
                height={300}
                className="rounded-lg object-cover aspect-square group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-darkBlue/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-4 text-sm">Quality Control</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Product Assistant - Vertical Gradient */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-vertical relative">
        <GearPattern className="text-theme-darkBlue" />
        <AnimatedGears color="#0A192F" density="low" speed="slow" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-theme-darkBlue orange-accent text-shadow">
                Product Assistant
              </h2>
              <p className="max-w-[700px] text-theme-darkBlue/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have questions about our products? Our AI assistant is here to help.
              </p>
            </div>
          </div>
          <ProductAssistant />
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Testimonials - Horizontal Gradient */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-horizontal dark-section relative">
        <GearPattern className="text-white" />
        <AnimatedGears color="#FFFFFF" density="medium" speed="medium" />

        {/* Fixed position decorative gears */}
        <div className="absolute top-1/3 left-[5%] opacity-10 pointer-events-none hidden lg:block">
          <div className="relative">
            <LargeGear className="w-36 h-36 animate-spin-slow" color="#FFFFFF" />
            <SmallGear
              className="w-16 h-16 animate-spin-reverse-medium absolute"
              color="#FFFFFF"
              style={{ top: "-10px", left: "70px" }}
            />
          </div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white orange-accent white-text-shadow">
                Client Feedback
              </h2>
              <p className="max-w-[700px] text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                What our clients say about our engineering excellence.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col p-6 bg-theme-blue/30 backdrop-blur-sm rounded-lg border border-theme-blue tech-card"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-theme-orange"
                  />
                  <div>
                    <h3 className="font-medium text-white white-text-shadow">{testimonial.name}</h3>
                    <p className="text-sm text-white/70">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? "text-theme-orange fill-theme-orange" : "text-white/30"
                        }`}
                      />
                    ))}
                </div>
                <p className="text-white/70 flex-1">{testimonial.comment}</p>
                <p className="text-sm text-theme-orange mt-4">{testimonial.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Newsletter - Conic Gradient */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-conic relative overflow-hidden">
        <GearPattern className="text-theme-darkBlue" />
        <AnimatedGears color="#0A192F" density="low" speed="slow" />

        {/* Fixed position decorative gears */}
        <div className="absolute bottom-10 right-[10%] opacity-10 pointer-events-none hidden lg:block">
          <MediumGear className="w-28 h-28 animate-spin-medium" color="#0A192F" />
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter text-theme-darkBlue orange-accent text-shadow">
                Stay Updated
              </h2>
              <p className="text-theme-darkBlue/70 mt-2">
                Subscribe to our newsletter for technical updates, new product releases, and engineering insights.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-theme-darkBlue/20 bg-white/80 backdrop-blur-sm px-3 py-2 text-sm text-theme-darkBlue placeholder:text-theme-darkBlue/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-orange"
              />
              <Button className="bg-theme-darkBlue text-white hover:bg-theme-blue">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const featuredProducts = [
  {
    id: 1,
    name: "Precision CNC Machined Component",
    price: 159.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 5,
    reviews: 24,
    badge: "Bestseller",
    description: "Aircraft-grade aluminum with sub-micron tolerances for critical applications.",
  },
  {
    id: 2,
    name: "Advanced Modular Controller",
    price: 249.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 4,
    reviews: 18,
    description: "Programmable control system with multiple I/O ports and wireless connectivity.",
  },
  {
    id: 3,
    name: "Carbon Fiber Composite Frame",
    price: 334.99,
    image: "/placeholder.svg?height=400&width=400",
    rating: 5,
    reviews: 32,
    badge: "New",
    description: "Ultra-lightweight yet incredibly strong frame for aerospace and robotics applications.",
  },
]

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    company: "Quantum Robotics",
    avatar: "/placeholder.svg?height=48&width=48",
    rating: 5,
    comment:
      "The precision engineering in these components has significantly improved our robotics systems. The tolerances are exactly as specified, and the performance is outstanding.",
    date: "Chief Engineer",
  },
  {
    name: "Michael Chen",
    company: "Aerospace Innovations",
    avatar: "/placeholder.svg?height=48&width=48",
    rating: 5,
    comment:
      "We've integrated these components into our drone prototypes with excellent results. The lightweight materials and precise manufacturing have enhanced our flight performance metrics by 32%.",
    date: "Technical Director",
  },
  {
    name: "Emma Rodriguez",
    company: "Advanced Prototyping Labs",
    avatar: "/placeholder.svg?height=48&width=48",
    rating: 4,
    comment:
      "The modular design approach allows for incredible flexibility in our testing environments. Documentation is comprehensive and the technical support has been responsive and knowledgeable.",
    date: "Lead Developer",
  },
]
