"use client"

import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    })
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Contact Us</h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you. Fill out the form below or reach out directly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-neutral-600 mt-1" />
              <div>
                <h3 className="font-semibold">Our Location</h3>
                <p className="text-neutral-600">123 Craft Lane</p>
                <p className="text-neutral-600">Artisan District</p>
                <p className="text-neutral-600">Creativeville, CV 12345</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-neutral-600 mt-1" />
              <div>
                <h3 className="font-semibold">Email Us</h3>
                <p className="text-neutral-600">info@artisandesigns.com</p>
                <p className="text-neutral-600">support@artisandesigns.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-neutral-600 mt-1" />
              <div>
                <h3 className="font-semibold">Call Us</h3>
                <p className="text-neutral-600">(555) 123-4567</p>
                <p className="text-neutral-600">Mon- 123-4567</p>
                <p className="text-neutral-600">Mon-Fri: 9am-5pm</p>
              </div>
            </div>
            <div className="rounded-lg bg-neutral-50 p-6">
              <h3 className="font-semibold mb-2">Business Hours</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Monday - Friday</span>
                  <span className="text-neutral-600">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Saturday</span>
                  <span className="text-neutral-600">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Sunday</span>
                  <span className="text-neutral-600">Closed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Your Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12">
          <div className="aspect-[16/9] w-full rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007%2C%20USA!5e0!3m2!1sen!2sbg!4v1579767901424!5m2!1sen!2sbg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="text-center space-y-4 mt-12">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, and more.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-8 text-left">
            <div className="space-y-2">
              <h3 className="font-semibold">How long does shipping take?</h3>
              <p className="text-neutral-600">
                Standard shipping typically takes 3-5 business days within the continental US. International shipping
                may take 7-14 business days.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Do you offer returns?</h3>
              <p className="text-neutral-600">
                Yes, we offer a 30-day return policy for most items. Custom orders may not be eligible for returns.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Are your products handmade?</h3>
              <p className="text-neutral-600">
                Yes, all of our products are handcrafted by skilled artisans in our studio.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Do you ship internationally?</h3>
              <p className="text-neutral-600">
                Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
