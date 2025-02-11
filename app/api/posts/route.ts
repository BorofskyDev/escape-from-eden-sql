// app/api/posts/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    // Parse the request JSON once and log it.
    const body = await request.json()
    console.log('Received payload:', body)

    const {
      title,
      description,
      content,
      featuredImage,
      slug,
      categoryId,
      tagIds,
    } = body

    // Validate required fields.
    if (!title || !description || !content || !slug) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: title, description, content, and slug are required.',
        },
        { status: 400 }
      )
    }

    // Create the post using Prisma.
    const post = await prisma.post.create({
      data: {
        title,
        description,
        content,
        featuredImage: featuredImage || null,
        slug,
        published: false, // Always false on creation.
        // publishedAt is left as null.
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        tags:
          tagIds && Array.isArray(tagIds) && tagIds.length > 0
            ? { connect: tagIds.map((id: string) => ({ id })) }
            : undefined,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 })
  }
}
