'use client'

import { ReactNode, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

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
 * A generic Modal that:
 * - Fades/zooms in using Framer Motion.
 * - Closes when clicking outside or pressing the "X".
 * - Can optionally animate from a given origin coordinate.
 */
export default function Modal({ open, onClose, children, origin }: ModalProps) {
  // Close if user clicks Escape, for example
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleKeyDown)
    } else {
      window.removeEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, handleKeyDown])

  // For outside-click detection
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
        <>
          {/* Overlay */}
          <motion.div
            className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
          />
          {/* Modal Container */}
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              transformOrigin,
            }}
            transition={{ duration: 0.3 }}
            onClick={handleOverlayClick}
          >
            {/* Actual Modal Content */}
            <div
              onClick={handleModalClick}
              className='bg-bg2 rounded-md shadow-xl p-6 relative max-w-md w-full'
            >
              {/* Close Button (X) */}
              <button
                className='absolute top-2 right-2 text-gray-500 hover:text-gray-800'
                onClick={onClose}
              >
                ✕
              </button>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
