// components/ui/buttons/ThemeToggleBtn.tsx

'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import styles from './ThemeToggle.module.scss'

export function ThemeToggleBtn() {
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
      className={styles.themeToggleBtn}
    >
      {theme === 'light' ? 'Toggle Dark' : 'Toggle Light'}
    </button>
  )
}
