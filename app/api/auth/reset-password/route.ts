// app/api/auth/reset-password/route.ts
import { NextResponse } from 'next/server'
import { resetPassword } from '@/lib/functions'

export async function POST(req: Request) {
  const { token, password } = await req.json()
  await resetPassword(token, password) // throws on bad/expired token
  return NextResponse.json({ ok: true })
}
