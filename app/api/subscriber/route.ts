// app/api/subscriber/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' // or wherever your Prisma client is

// This route will handle BOTH subscribe and unsubscribe, each by different HTTP verbs or query params.
// Alternatively, you could split them into /subscriber/subscribe and /subscriber/unsubscribe.

export async function POST(request: NextRequest) {
  // Subscribe endpoint
  try {
    const { email } = (await request.json()) as { email?: string }
    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 })
    }

    // Create (or re-subscribe) a user in your DB
    // If a user unsubscribed in the past, you can reset unsubscribedAt here.
    await prisma.subscriber.upsert({
      where: { email },
      update: { unsubscribedAt: null },
      create: { email },
    })

    return NextResponse.json({ success: true, message: 'Subscribed!' })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  // Unsubscribe endpoint
  try {
    // You can pass an email or ID in the query param, body, or a route param—whatever you prefer.
    // For example, let's read an 'email' from the query param:
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 })
    }

    // Mark unsubscribedAt so we know they're no longer active
    await prisma.subscriber.update({
      where: { email },
      data: { unsubscribedAt: new Date() },
    })

    return NextResponse.json({
      success: true,
      message: `Unsubscribed ${email} successfully.`,
    })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
