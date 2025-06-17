'use client'
import { ReactNode } from 'react'
import clsx from 'clsx'

interface PageTitleProps {
  children: ReactNode
  className?: string
}

export default function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1
      className={clsx(
        'w-full mx-auto my-20 text-center text-7xl lg:text-9xl text-text1 capitalize',
        className
      )}
    >
      {children}
    </h1>
  )
}
