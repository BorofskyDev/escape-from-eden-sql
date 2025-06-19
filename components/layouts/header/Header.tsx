// components/layouts/header/Navbar.tsx

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heading, TextLink, ThemeToggleBtn } from '@/components/ui/common'
import { DesktopNav, HamburgerBtn } from './header-components'
import styles from './Header.module.scss'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <TextLink href='/'>
          <Heading as='h2' size='sm'>
            Escape from Eden
          </Heading>
        </TextLink>

        <DesktopNav />

        {/* Desktop Theme Toggle */}
        <div className={styles.header__themeToggle}>
          <ThemeToggleBtn />
        </div>

        {/* Mobile Hamburger Button */}
        <HamburgerBtn isOpen={isOpen} onClick={toggleMenu} />
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.mobileNav}
          >
            <div className={styles.mobileNav__links}>
              <TextLink
                href='/'
                onClick={() => setIsOpen(false)}
                className='hover:text-secondary transition-colors duration-200'
              >
                Home
              </TextLink>

              <TextLink
                href='/search'
                onClick={() => setIsOpen(false)}
                className='hover:text-secondary transition-colors duration-200'
              >
                Search
              </TextLink>

              <TextLink
                href='/about'
                onClick={() => setIsOpen(false)}
                className='hover:text-secondary transition-colors duration-200'
              >
                About
              </TextLink>
              <TextLink
                href='/contact'
                onClick={() => setIsOpen(false)}
                className='hover:text-secondary transition-colors duration-200'
              >
                Contact
              </TextLink>
            </div>
            {/* Place ThemeToggleBtn above the bottom edge */}
            <div className='absolute bottom-10'>
              <ThemeToggleBtn />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
