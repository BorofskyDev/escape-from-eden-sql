import { ReactNode } from 'react'
import styles from './ColContainer.module.scss'

type GapKey = 'sm' | 'md' | 'lg'

interface Props {
  children: ReactNode
  className?: string
  gap?: GapKey 
}

export function ColContainer({
  children,
  className = '',
  gap = 'md',
}: Props) {
  const gapClass =
    gap === 'sm'
      ? styles['gap-sm']
      : gap === 'lg'
      ? styles['gap-lg']
      : styles['gap-md']

  return (
    <div className={`${styles.colContainer} ${gapClass} ${className}`}>
      {children}
    </div>
  )
}
