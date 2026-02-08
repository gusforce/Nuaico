"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useNewsletter } from "@/lib/use-newsletter"

export default function NewsletterSubscription() {
  const { email, setEmail, isSubmitting, handleSubmit } = useNewsletter()

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardContent className="p-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-navy">Subscribe to Newsletter</h2>
          <p className="text-gray-600 mb-6">Get the latest news and insights delivered to your inbox weekly.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 h-auto text-base border-gray-300"
            />
            <Button
              type="submit"
              className="w-full bg-gradient-blue hover:opacity-90 text-white p-6 h-auto text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
