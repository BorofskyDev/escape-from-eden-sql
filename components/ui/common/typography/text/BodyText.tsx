// components/ui/common/typography/text/Text.tsx

import React, { ReactNode } from 'react'
import styles from './BodyText.module.scss'

export type TextVariant =
  | 'body'
  | 'body-sm'
  | 'body-lg'
  | 'lead'
  | 'caption'
  | 'label'
  | 'note'
  | 'accent'
  | 'error'

interface BodyTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant
  children: ReactNode
  className?: string
}

export const BodyText: React.FC<BodyTextProps> = ({
  variant = 'body',
  children,
  className = '',
  ...rest
}) => {
  return (
    <p
      className={`${styles.text} ${styles[`text--${variant}`]} ${className}`}
      {...rest}
    >
      {children}
    </p>
  )
}

