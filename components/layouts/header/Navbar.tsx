// components/layouts/header/Navbar.tsx

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggleBtn from '@/components/ui/buttons/ThemeToggle'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className='w-full fixed top-0 z-50 bg-bg1 shadow'>
      <div className='max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-4 flex items-center justify-between'>
        {/* Site Title */}
        <Link href='/' className='text-primary font-bold capitalize font-header text-xl'>
          Escape from Eden
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden lg:flex space-x-8'>
          <Link
            href='/'
            className='hover:text-secondary transition-colors duration-200'
          >
            Home
          </Link>
          <Link
            href='/about'
            className='hover:text-secondary transition-colors duration-200'
          >
            About
          </Link>
          <Link
            href='/contact'
            className='hover:text-secondary transition-colors duration-200'
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Theme Toggle */}
        <div className='hidden lg:block'>
          <ThemeToggleBtn />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className='lg:hidden flex flex-col justify-center items-center space-y-1 relative z-50'
          aria-label='Toggle menu'
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className='block h-0.5 w-6 bg-current'
          />
          <motion.span
            animate={isOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className='block h-0.5 w-6 bg-current'
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className='block h-0.5 w-6 bg-current'
          />
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='lg:hidden fixed inset-0 bg-bg1 flex flex-col items-center justify-center z-40'
          >
            <div className='flex flex-col space-y-6 text-center text-xl'>
              <Link
                href='/'
                onClick={() => setIsOpen(false)}
                className='hover:text-secondary transition-colors duration-200'
              >
                Home
              </Link>
              
              <Link
                href='/about'
                onClick={() => setIsOpen(false)}
                className='hover:text-secondary transition-colors duration-200'
              >
                About
              </Link>
              <Link
                href='/contact'
                onClick={() => setIsOpen(false)}
                className='hover:text-secondary transition-colors duration-200'
              >
                Contact
              </Link>
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
