import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all non-deleted tags.
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

// POST: Create a new tag.
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

// PATCH: Update a tag.
export async function PATCH(request: Request) {
  try {
    const { id, name, slug } = await request.json()
    if (!id) {
      return NextResponse.json({ error: 'Tag id is required' }, { status: 400 })
    }
    const updatedTag = await prisma.tag.update({
      where: { id },
      data: { name, slug },
    })
    return NextResponse.json(updatedTag)
  } catch (error) {
    console.error('Error updating tag:', error)
    return NextResponse.json({ error: 'Error updating tag' }, { status: 500 })
  }
}

// DELETE: Delete a tag.
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: 'Tag id is required' }, { status: 400 })
    }
    const deletedTag = await prisma.tag.delete({
      where: { id },
    })
    return NextResponse.json(deletedTag)
  } catch (error) {
    console.error('Error deleting tag:', error)
    return NextResponse.json({ error: 'Error deleting tag' }, { status: 500 })
  }
}
