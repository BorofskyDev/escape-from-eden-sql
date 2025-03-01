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
    secure: Number(process.env.SMTP_PORT) === 465, // true for port 465, false for others
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false }, // development only
  })

  // 4) Build the HTML email template using inline styles
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>New Post: ${post.title}</title>
      </head>
      <body style="margin:0; padding:0; background-color:#fcfcfc; font-family: 'Open Sans', sans-serif;">
        <div style="max-width:600px; margin:20px auto; background-color:#ebedf5; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.1); overflow:hidden;">
          ${
            post.featuredImage
              ? `<img src="${post.featuredImage}" alt="${post.title}" style="width:100%; display:block;">`
              : ''
          }
          <div style="padding:16px;">
            <h1 style="margin:0; font-size:24px; color:#100e7d; font-family: 'Playfair Display', serif;">
              ${post.title}
            </h1>
            <p style="font-size:14px; color:#0a0a0a; margin:12px 0;">
              ${post.description}
            </p>
            <a href="https://yoursite.com/blog/${
              post.slug
            }" style="display:inline-block; padding:10px 20px; background-color:#100e7d; color:#ffffff; text-decoration:none; border-radius:4px;">
              Read more
            </a>
          </div>
        </div>
        <p style="text-align:center; font-size:12px; color:#6e0c52; margin-top:20px;">
          <a href="https://yoursite.com/api/subscriber?email=${encodeURIComponent(
            subscribers[0]?.email || ''
          )}" style="color:#6e0c52; text-decoration:underline;">
            Unsubscribe
          </a>
        </p>
      </body>
    </html>
  `

  // 5) Send an email to each subscriber
  for (const { email } of subscribers) {
    await transporter.sendMail({
      from: '"Escape From Eden" <noreply@myblog.com>',
      to: email,
      subject: `New Post: ${post.title}`,
      html: htmlContent,
    })
  }
}
