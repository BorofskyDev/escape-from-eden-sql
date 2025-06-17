'use client'

import { InputHTMLAttributes } from 'react'
import styles from './GeneralInput.module.scss'

type GeneralInputProps = InputHTMLAttributes<HTMLInputElement>

export function GeneralInput({
  className = '',
  ...rest
}: GeneralInputProps) {
  return <input {...rest} className={`${styles.generalInput} ${className}`} />
}
