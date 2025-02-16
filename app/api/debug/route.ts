// app/api/debug/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Run a minimal query
    const result = await prisma.$queryRaw`SELECT 1 AS test`
    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('DB connection error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
