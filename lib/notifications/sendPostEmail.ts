// lib/notifications/sendPostEmail.ts

import { prisma } from '@/lib/prisma'
// For sending emails, you might use nodemailer, an external service, or something else:
import nodemailer from 'nodemailer'

// Example function signature
export async function sendNewPostNotification(postId: string) {
  // 1) Get the post details
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      title: true,
      featuredImage: true,
      description: true,
      slug: true,
    },
  })
  if (!post) return

  // 2) Get all active subscribers (i.e. unsubscribedAt is null)
  const subscribers = await prisma.subscriber.findMany({
    where: { unsubscribedAt: null },
    select: { email: true },
  })

  // 3) Build an email for each subscriber
  // Realistically, you’d batch or blind copy them, or queue each email individually, depending on your approach
  for (const { email } of subscribers) {
    // Example with nodemailer:
    const transporter = nodemailer.createTransport({
      // your SMTP details or service credentials
      // e.g., host: 'smtp.example.com', port: 587, auth: { user: '...', pass: '...' }
    })

    await transporter.sendMail({
      from: '"My Blog" <noreply@myblog.com>',
      to: email,
      subject: `New Post: ${post.title}`,
      html: `
        <h1>${post.title}</h1>
        <img src="${post.featuredImage}" alt="${post.title}" />
        <p>${post.description}</p>
        <p><a href="https://yoursite.com/blog/${post.slug}">Read more</a></p>

        <!-- Unsubscribe link (uses our DELETE route above) -->
        <p>
          <a href="https://yoursite.com/api/subscriber?email=${encodeURIComponent(
            email
          )}" data-method="DELETE">
            Unsubscribe
          </a>
        </p>
      `,
    })
  }
}
