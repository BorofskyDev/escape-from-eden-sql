import { prisma } from "@/lib/prisma"
import crypto from "crypto"
import { sendPasswordResetEmail } from "./sendPasswordResetEmail"

const TOKEN_TTL_MS = 60 * 60 * 1000

export async function createResetToken(email: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return // silent failure (prevents user enumeration)

  // wipe old tokens for this user
  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } })

  const rawToken = crypto.randomBytes(32).toString('hex')
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')

  await prisma.passwordResetToken.create({
    data: {
      tokenHash,
      userId: user.id,
      expiresAt: new Date(Date.now() + TOKEN_TTL_MS),
    },
  })

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${rawToken}`
  await sendPasswordResetEmail(user.email, resetUrl)
}
