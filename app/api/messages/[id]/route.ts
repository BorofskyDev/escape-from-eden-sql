// app/api/messages/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await the params since the type expects a Promise
  const { id } = await params
  try {
    const body = await request.json()
    const updatedMessage = await prisma.message.update({
      where: { id },
      data: { read: body.read },
    })
    return NextResponse.json(updatedMessage)
  } catch (error) {
    console.error('Error updating message:', error)
    return NextResponse.json(
      { error: 'Error updating message' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params
  try {
    await prisma.message.delete({
      where: { id },
    })
    return NextResponse.json({ message: 'Message deleted successfully' })
  } catch (error) {
    console.error('Error deleting message:', error)
    return NextResponse.json(
      { error: 'Error deleting message' },
      { status: 500 }
    )
  }
}
