import Link from 'next/link'
import styles from './LinkTag.module.scss'

export function LinkTag({
  
  href,
  children,
  className = '',
}: {

  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
     
      href={href}
      className={`${styles.linkTag} ${className}`}
    >
      {children}
    </Link>
  )
}
