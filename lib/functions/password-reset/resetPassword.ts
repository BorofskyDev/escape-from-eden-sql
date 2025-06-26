import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function resetPassword(rawToken: string, newPassword: string) {
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')

  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
    include: { user: true },
  })
  if (!record || record.expiresAt < new Date()) {
    throw new Error('Token invalid or expired')
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { password: await bcrypt.hash(newPassword, 12) },
    }),
    prisma.passwordResetToken.delete({ where: { id: record.id } }),
  ])
}
