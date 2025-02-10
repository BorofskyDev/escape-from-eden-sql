import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/login',
  },
})

// Protect only admin routes
export const config = {
  matcher: ['/admin/:path*'],
}
