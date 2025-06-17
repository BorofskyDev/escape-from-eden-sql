import { ReactNode } from 'react'
import styles from './GeneralSection.module.scss'

interface GeneralSectionProps {
  id: string
  className?: string
  children: ReactNode
}

export function GeneralSection({
  id,
  className = '',
  children,
}: GeneralSectionProps) {
  return (
    <section id={id} className={`${styles.generalSection} ${className}`}>
      {children}
    </section>
  )
}
