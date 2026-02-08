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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success("Thanks for subscribing! Check your inbox soon.")
    setEmail("")
    setIsSubmitting(false)
  }

  return { email, setEmail, isSubmitting, handleSubmit }
}
