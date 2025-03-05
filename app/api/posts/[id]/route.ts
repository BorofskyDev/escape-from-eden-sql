// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendNewPostNotification } from '@/lib/notifications/sendPostEmail'

/**
 * GET /api/posts/[id]
 * Retrieves a single post with its related data.
 */
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
        category: { select: { id: true, name: true } },
        tags: { select: { id: true, name: true } },
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

/**
 * PATCH /api/posts/[id]
 * Updates a post and, if the post is being published (transitioning from unpublished to published),
 * sends an email notification to all subscribers.
 */
// app/api/posts/[id]/route.ts
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
      publishedAt, // Extract publishedAt from the payload
      categoryId,
      tagIds,
    } = body

    // Retrieve the existing post to check its published status.
    const existingPost = await prisma.post.findUnique({
      where: { id },
      select: { published: true, publishedAt: true },
    })

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Determine if the post is transitioning from unpublished to published.
    const isNowPublished = published === true || published === 'true'
    const wasUnpublished = !existingPost.published

    // Calculate the new publishedAt:
    // If the post is being published for the first time, use the incoming value (if provided)
    // or default to the current time; otherwise, keep the existing value.
    const newPublishedAt =
      wasUnpublished && isNowPublished
        ? publishedAt
          ? new Date(publishedAt)
          : new Date()
        : existingPost.publishedAt

    // Update the post.
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        description,
        content,
        featuredImage,
        published: isNowPublished,
        publishedAt: newPublishedAt,
        category: categoryId
          ? { connect: { id: categoryId } }
          : { disconnect: true },
        tags:
          tagIds && Array.isArray(tagIds)
            ? {
                set: [],
                connect: tagIds.map((tagId: string) => ({ id: tagId })),
              }
            : { set: [] },
      },
    })

    // Only trigger the notification if:
    // 1. The post is transitioning from unpublished to published.
    // 2. The scheduled publishedAt is in the past (or now).
    if (
      wasUnpublished &&
      isNowPublished &&
      newPublishedAt instanceof Date &&
      newPublishedAt.getTime() <= Date.now()
    ) {
      await sendNewPostNotification(id)
    }

    return NextResponse.json(updatedPost)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('Error updating post:', errorMessage)
    return NextResponse.json({ error: 'Error updating post' }, { status: 500 })
  }
}

/**
 * DELETE /api/posts/[id]
 * Deletes a post by its ID.
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string } >}
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
