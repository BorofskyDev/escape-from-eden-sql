import { ReactNode } from 'react'
import styles from './ColToRowContainer.module.scss'

type GapKey = 'sm' | 'md' | 'lg'

interface Props {
  children: ReactNode
  className?: string
  gap?: GapKey // only the three tokens now
}

export function ColToRowContainer({
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
    <div className={`${styles.colToRowContainer} ${gapClass} ${className}`}>
      {children}
    </div>
  )
}
