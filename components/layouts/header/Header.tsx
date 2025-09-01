// components/layouts/header/Navbar.tsx

'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Heading, TextLink, ThemeToggleBtn } from '@/components/ui/common'
import { DesktopNav, HamburgerBtn, MobileNav } from './header-components'
import styles from './Header.module.scss'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <TextLink href='/'>
          <Heading as='h2' size='sm'>
            Journal of a Recalcitrant
          </Heading>
        </TextLink>
        <DesktopNav />
        <div className={styles.header__themeToggle}>
          <ThemeToggleBtn />
        </div>
        <HamburgerBtn isOpen={isOpen} onClick={toggleMenu} />
      </div>
      <AnimatePresence>
        {isOpen && <MobileNav onLinkClick={closeMenu} />}
      </AnimatePresence>
    </header>
  )
}
