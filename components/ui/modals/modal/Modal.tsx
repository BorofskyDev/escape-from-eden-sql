'use client'

import { ReactNode, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '@/components/ui/common/'
import { icons } from '@/lib/icons/icons'
import styles from './Modal.module.scss'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  /**
   * Optionally specify where the modal "originates" on open/close.
   * If undefined, it defaults to center-center.
   */
  origin?: { x: number; y: number }
}

/**
 * A generic Modal with:
 * - A fixed overlay (full screen) with dark/blur background
 * - A centered scrollable panel if content exceeds viewport
 * - No scrolling on the background (body locked)
 */
export default function Modal({ open, onClose, children, origin }: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  // Manage ESC key
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden' // lock scrolling
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, handleKeyDown])

  // Outside-click detection
  const handleOverlayClick = () => {
    onClose()
  }

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const transformOrigin = origin
    ? `${origin.x}px ${origin.y}px`
    : 'center center'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.modal}
          // ^ no scroll on the container
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Dark / blurred overlay (fills the entire screen) */}
          <motion.div
            className={styles.modal__overlay}
            onClick={handleOverlayClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Centered container for the modal itself */}
          <motion.div
            className={styles.modal__container}
            style={{ transformOrigin }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={handleOverlayClick}
          >
            {/* Scrollable modal panel */}
            <div onClick={handleModalClick} className={styles.modal__panel}>
              {/* Close Button */}
              <button
                type='button'
                className={styles.modal__closeButton}
                onClick={onClose}
              >
                <Icon
                  icon={icons.close}
                  className={styles.modal__closeButton__icon}
                />
              </button>

              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
