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
  { params }: { params: { id: string } }
) {
  const { id } = params
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
      categoryId,
      tagIds,
    } = body

    // 1. Retrieve the existing post to check its published status.
    const existingPost = await prisma.post.findUnique({
      where: { id },
      select: { published: true, publishedAt: true },
    })

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // 2. Determine if the post is transitioning from unpublished to published.
    // Ensure that published is a boolean. If it might be sent as a string (e.g., "true"), coerce it.
    const isNowPublished = published === true || published === 'true'
    const wasUnpublished = !existingPost.published

    // 3. Set publishedAt if the post is being published now for the first time.
    const newPublishedAt =
      wasUnpublished && isNowPublished ? new Date() : existingPost.publishedAt

    // 4. Update the post.
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

    // 5. If the post was just published, trigger the notification.
    if (wasUnpublished && isNowPublished) {
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
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = params
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
