import { NextResponse } from 'next/server'
import { z } from 'zod'
import { insertNewsletterSubscriber } from '@/lib/db'

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = emailSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const result = await insertNewsletterSubscriber(parsed.data.email)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: result.error === 'Already subscribed' ? 409 : 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
