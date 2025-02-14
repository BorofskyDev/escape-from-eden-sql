'use client'

import { motion, useScroll } from 'framer-motion'

export default function ReadingProgressIndicator() {
  // useScroll returns a motion value (0–1) representing scroll progress.
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className='fixed top-0 left-0 right-0 h-2 bg-primary origin-left z-50'
    />
  )
}
