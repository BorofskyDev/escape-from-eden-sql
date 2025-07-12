// components/ui/inputs/FormField.tsx
'use client'

import styles from './FormField.module.scss'

interface FormFieldProps {
  label: string
  placeholder?: string
  variant?: 'input' | 'textarea'
  type?: string
  rows?: number
  value?: string
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

export function FormField({
  label,
  placeholder,
  variant = 'input',
  type = 'text',
  rows = 2,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div className={styles.formField}>
      <label className={styles.label}>{label}</label>
      {variant === 'textarea' ? (
        <textarea
          className={styles.userInput}
          placeholder={placeholder}
          rows={rows}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          className={styles.userInput}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  )
}
