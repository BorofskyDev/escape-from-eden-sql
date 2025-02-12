'use client'
import { ReactNode } from 'react'
import clsx from 'clsx'

interface GeneralBodyTextProps {
  children: ReactNode
  className?: string
}

export default function GeneralBodyText({
  children,
  className,
}: GeneralBodyTextProps) {
  return (
    <p className={clsx('w-full mx-auto text-md text-text1', className)}>
      {children}
    </p>
  )
}
