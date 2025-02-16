// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        featuredImage: true,
        published: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
        slug: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        tags: {
          select: { id: true, name: true },
        },
      },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json({ error: 'Error fetching post' }, { status: 500 })
  }
}
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()
    const {
      title,
      description,
      content,
      featuredImage,
      published,
      publishedAt,
      categoryId,
      tagIds,
    } = body

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        description,
        content,
        featuredImage,
        published,
        publishedAt,
        category: categoryId
          ? { connect: { id: categoryId } }
          : { disconnect: true },
        tags:
          tagIds && Array.isArray(tagIds)
            ? {
                set: [],
                connect: tagIds.map((id: string) => ({ id })),
              }
            : { set: [] },
      },
    })
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json({ error: 'Error updating post' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params
  try {
    const deletedPost = await prisma.post.delete({
      where: { id },
    })
    return NextResponse.json(deletedPost)
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 })
  }
}
