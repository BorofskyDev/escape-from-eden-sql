'use client'

import { AnchorHTMLAttributes, ReactNode } from 'react'
import Link from 'next/link'
import { icons } from '@/lib/icons/icons'
import styles from './TextLink.module.scss'

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>

interface TextLinkProps extends AnchorProps {
  href: string
  external?: boolean
  children: ReactNode
  noUnderline?: boolean
  className?: string
}

const isClearlyExternal = (url: string) => /^(https?:\/\/|mailto:)/i.test(url)

export function TextLink({
  href,
  external,
  children,
  noUnderline = false,
  className = '',
  ...rest
}: TextLinkProps) {
  const isExternal = external ?? isClearlyExternal(href)

  if (isExternal) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={`${noUnderline ? styles.noUnderline : styles.textLink} ${className}`}
        aria-label={
          rest['aria-label'] ??
          (typeof children === 'string'
            ? `${children} (opens in new tab)`
            : undefined)
        }
        {...rest}
      >
        {children}
        <svg
          className={styles.textLink__icon}
          aria-hidden='true'
          focusable='false'
          viewBox='0 0 50 50'
        >
          <path d={icons.external} />
        </svg>
      </a>
    )
  }
  return (
    <Link href={href} className={` ${noUnderline ? styles.noUnderline : styles.textLink} ${className}`} {...rest}>
      {children}
    </Link>
  )
}
