// app/api/tags/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(tags)
  } catch (error) {
    console.error('Error fetching tags:', error)
    return NextResponse.error()
  }
}

export async function POST(request: Request) {
  try {
    const { name, slug } = await request.json()
    const tag = await prisma.tag.create({
      data: { name, slug },
    })
    return NextResponse.json(tag, { status: 201 })
  } catch (error) {
    console.error('Error creating tag:', error)
    return NextResponse.json({ error: 'Error creating tag' }, { status: 500 })
  }
}
