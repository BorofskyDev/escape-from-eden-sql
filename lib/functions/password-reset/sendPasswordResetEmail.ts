import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: Number(process.env.SMTP_PORT) === 465, // true for SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendPasswordResetEmail(to: string, url: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Reset your Escape-from-Eden password',
    html: `<p>Hello! A password-reset request was made for this address.</p>
           <p><a href="${url}">Click here to reset your password</a>
           (link active for one hour).</p>
           <p>If you didn’t ask for this, you can ignore the email.</p>`,
  })
}
