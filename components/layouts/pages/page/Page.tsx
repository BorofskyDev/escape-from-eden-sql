import { ReactNode } from 'react'
import styles from './Page.module.scss'

interface PageProps {
  className?: string
  children: ReactNode
}

export function Page({ className = '', children }: PageProps) {
  return <main className={`${styles.page} ${className}`}>{children}</main>
}
