'use client'

import { TextareaHTMLAttributes, useId } from 'react'
import styles from './TextAreaInput.module.scss'

interface TextAreaInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  hideLabel?: boolean
  className?: string
}

export function TextAreaInput({
  label,
  hideLabel = false,
  id,
  className = '',
  ...rest
}: TextAreaInputProps) {
  const generatedId = useId()
  const textAreaId = id ?? generatedId

  return (
    <div className={`${styles.field} ${className}`}>
      <label
        htmlFor={textAreaId}
        className={hideLabel ? styles.visuallyHidden : undefined}
      >
        {label}
      </label>

      <textarea id={textAreaId} {...rest} className={styles.textAreaInput} />
    </div>
  )
}
