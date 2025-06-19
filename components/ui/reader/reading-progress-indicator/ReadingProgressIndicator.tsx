'use client'

import { motion, useScroll } from 'framer-motion'
import styles from './ReadingProgressIndicator.module.scss'

export function ReadingProgressIndicator() {
  // useScroll returns a motion value (0–1) representing scroll progress.
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className={styles.readingProgressIndicator}
    />
  )
}
