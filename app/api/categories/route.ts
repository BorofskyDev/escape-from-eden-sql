import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all non-deleted categories.
export async function GET() {
  try {
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

// POST: Create a new category.
export async function POST(request: Request) {
  try {
    const { name, slug, description } = await request.json()
    const category = await prisma.category.create({
      data: { name, slug, description },
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

// PATCH: Update a category.
export async function PATCH(request: Request) {
  try {
    const { id, name, slug, description } = await request.json()
    if (!id) {
      return NextResponse.json(
        { error: 'Category id is required' },
        { status: 400 }
      )
    }
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name, slug, description },
    })
    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { error: 'Error updating category' },
      { status: 500 }
    )
  }
}

// DELETE: Delete a category.
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json(
        { error: 'Category id is required' },
        { status: 400 }
      )
    }
    const deletedCategory = await prisma.category.delete({
      where: { id },
    })
    return NextResponse.json(deletedCategory)
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: 'Error deleting category' },
      { status: 500 }
    )
  }
}
