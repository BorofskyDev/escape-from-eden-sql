'use client'

import { InputHTMLAttributes, useId } from 'react'
import styles from './GeneralInput.module.scss'

interface GeneralInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Visible text for assistive tech. Required for a11y. */
  label: string
  /** Hide the label visually but keep it for screen-readers. */
  hideLabel?: boolean
  className?: string
}

export function GeneralInput({
  label,
  hideLabel = false,
  id,
  className = '',
  ...rest
}: GeneralInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={`${styles.field} ${className}`}>
      <label
        htmlFor={inputId}
        className={hideLabel ? styles.visuallyHidden : undefined}
      >
        {label}
      </label>

      <input id={inputId} {...rest} className={styles.generalInput} />
    </div>
  )
}
