// app/api/auth/forgot-password/route.ts
import { NextResponse } from 'next/server'
import { createResetToken } from '@/lib/functions'

export async function POST(req: Request) {
  const { email } = await req.json()
  await createResetToken(email) // silent even if email not found
  return NextResponse.json({ ok: true })
}
