'use client'
import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
}

export default function Section({ children, className }: SectionProps) {
  return (
    <section
      className={`my-40 max-w-7xl mx-auto px-6 md:px-8 lg:px-16 ${
        className || ''
      }`}
    >
      {children}
    </section>
  )
}
