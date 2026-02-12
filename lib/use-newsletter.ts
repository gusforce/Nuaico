'use client'

import { useState } from "react"
import { z } from "zod"
import { toast } from "sonner"

const emailSchema = z.string().email("Please enter a valid email address")

export function useNewsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = emailSchema.safeParse(email)
    if (!result.success) {
      toast.error(result.error.issues[0].message)
      return
    }
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (response.ok) {
        toast.success("Thanks for subscribing! Check your inbox soon.")
        setEmail("")
      } else if (response.status === 409) {
        toast.info("You're already subscribed!")
        setEmail("")
      } else {
        toast.error(data.error || "Failed to subscribe. Please try again.")
      }
    } catch {
      toast.error("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return { email, setEmail, isSubmitting, handleSubmit }
}
