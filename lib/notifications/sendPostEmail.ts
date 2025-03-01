// lib/notifications/sendPostEmail.ts
import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'

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

  // 3) Create a transporter using your SMTP settings from .env
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false }, // false to allow self-signed certificates
  })

  // 4) Send an email to each subscriber
  for (const { email } of subscribers) {
    await transporter.sendMail({
      from: '"My Blog" <noreply@myblog.com>',
      to: email,
      subject: `New Post: ${post.title}`,
      html: `
        <h1>${post.title}</h1>
        <img src="${post.featuredImage}" alt="${post.title}" />
        <p>${post.description}</p>
        <p><a href="https://yoursite.com/blog/${post.slug}">Read more</a></p>
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
