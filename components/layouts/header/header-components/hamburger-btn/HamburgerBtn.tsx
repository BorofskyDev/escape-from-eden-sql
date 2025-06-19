import { motion } from 'framer-motion'
import styles from './HamburgerBtn.module.scss'

interface HamburgerBtnProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

export function HamburgerBtn({
  isOpen,
  onClick,
  className,
}: HamburgerBtnProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles.hamburgerBtn} ${className || ''}`}
      aria-label='Toggle menu'
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 11 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        animate={isOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
      />
    </button>
  )
}
