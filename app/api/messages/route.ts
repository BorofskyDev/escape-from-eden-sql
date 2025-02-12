// app/api/messages/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, content, captchaToken } = body

    // Validate required fields
    if (!name || !email || !content) {
      return NextResponse.json(
        { error: 'Name, email, and content are required.' },
        { status: 400 }
      )
    }

    // Enforce length limits
    if (name.length > 100 || email.length > 100) {
      return NextResponse.json(
        { error: 'Name and email must be 100 characters or less.' },
        { status: 400 }
      )
    }
    if (content.length > 500) {
      return NextResponse.json(
        { error: 'Message content must be 500 characters or less.' },
        { status: 400 }
      )
    }

    // Verify captchaToken using Google reCAPTCHA
    const secret = process.env.RECAPTCHA_SECRET_KEY
    if (!secret) {
      return NextResponse.json(
        { error: 'Captcha secret is not configured.' },
        { status: 500 }
      )
    }
    if (!captchaToken) {
      return NextResponse.json(
        { error: 'Captcha token is missing.' },
        { status: 400 }
      )
    }

    // Prepare data for verification as x-www-form-urlencoded
    const params = new URLSearchParams()
    params.append('secret', secret)
    params.append('response', captchaToken)

    const captchaRes = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      }
    )

    const captchaJson = await captchaRes.json()
    if (!captchaJson.success) {
      return NextResponse.json(
        { error: 'Captcha verification failed.' },
        { status: 400 }
      )
    }

    // Get the user's IP address from headers
    const ipAddress =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      null

    const message = await prisma.message.create({
      data: {
        name,
        email,
        content,
        ipAddress,
      },
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json(
      { error: 'Error creating message' },
      { status: 500 }
    )
  }
}
