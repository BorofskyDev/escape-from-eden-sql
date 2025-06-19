// components/layouts/header/MobileNav.tsx

'use client'

import { motion } from 'framer-motion'
import { TextLink, ThemeToggleBtn } from '@/components/ui/common'
import styles from './MobileNav.module.scss'

interface MobileNavProps {
  onLinkClick: () => void
  className?: string
}

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'Search' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function MobileNav({ onLinkClick, className }: MobileNavProps) {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${styles.mobileNav} ${className || ''}`}
    >
      <div className={styles.mobileNav__links}>
        {navigationLinks.map(({ href, label }) => (
          <TextLink key={href} href={href} onClick={onLinkClick}>
            {label}
          </TextLink>
        ))}
      </div>

      <ThemeToggleBtn />
    </motion.nav>
  )
}
