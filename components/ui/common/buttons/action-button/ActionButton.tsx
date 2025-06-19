import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './ActionButton.module.scss'

type Variant = 'primary' | 'secondary' | 'caution' | 'delete' | 'disabled'

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

export function ActionButton({
  variant = 'primary',
  className = '',
  disabled,
  children,
  ...rest
}: ActionButtonProps) {
  const isDisabled = disabled || variant === 'disabled'

  return (
    <button
      {...rest}
      disabled={isDisabled}
      className={`${styles.actionButton} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
