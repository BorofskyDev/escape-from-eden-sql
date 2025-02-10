'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme='light'>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  )
}
