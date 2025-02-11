// app/api/categories/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Fetch all non-deleted categories
    const categories = await prisma.category.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.error()
  }
}

export async function POST(request: Request) {
  try {
    const { name, slug } = await request.json()

    // Create a new category with a unique slug
    const category = await prisma.category.create({
      data: { name, slug },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Error creating category' },
      { status: 500 }
    )
  }
}
