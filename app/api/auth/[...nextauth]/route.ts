import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module 'next-auth' {
  interface User {
    id?: string
  }

  interface Session {
    user?: User
  }
}
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

// We create a single instance of PrismaClient.
// In production, consider the "prisma singleton" pattern to avoid issues with hot reload.
const prisma = new PrismaClient()

const handler = NextAuth({
  // We’re using JWT sessions by default (recommended for Credentials provider).
  session: {
    strategy: 'jwt',
  },

  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // 1. Grab inputs
        const { email, password } = credentials ?? {}

        // 2. Look up the user in the database
        if (!email || !password) {
          throw new Error('Please enter email and password')
        }

        const user = await prisma.user.findUnique({
          where: { email: email },
        })

        // 3. If no user or user’s password doesn’t match, throw an error
        if (!user) {
          throw new Error('No user found')
        }

        // Compare hashed password with provided password
        const isValid = bcrypt.compareSync(password, user.password)
        if (!isValid) {
          throw new Error('Invalid credentials')
        }

        // 4. If successful, return the user object
        return {
          id: user.id,
          email: user.email,
        }
      },
    }),
  ],

  // You can add callbacks here to attach info to the JWT or session
  callbacks: {
    async jwt({ token, user }) {
      // If user is returned (successful sign in), add some fields to the token
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      // `session.user` is what you'll have on the client
      if (token) {
        session.user = {
          id: token.id as string | undefined,
          email: token.email as string | undefined,
        }
      }
      return session
    },
  },

  // Where to go if sign in fails or is needed
  pages: {
    signIn: '/login',
  },
})

// In Next.js App Router, we must export GET and POST:
export { handler as GET, handler as POST }
