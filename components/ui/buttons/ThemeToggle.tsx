// components/ui/buttons/ThemeToggleBtn.tsx

'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeToggleBtn() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure that the theme is only rendered on the client.
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      className='px-4 py-2 border border-accent rounded focus:outline-none'
    >
      {theme === 'light' ? 'go dark' : 'go light'}
    </button>
  )
}
