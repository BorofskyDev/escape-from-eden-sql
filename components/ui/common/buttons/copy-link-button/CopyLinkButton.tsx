'use client'

import React, { useState } from 'react'
import { icons } from '@/lib/icons/icons'
import { Icon } from '@/components/ui/common/'
import styles from './CopyLinkButton.module.scss'

interface CopyLinkButtonProps {
  url: string
}

const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({ url }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Error copying link:', error)
    }
  }

  return (
    <button className={styles.copyLinkButton} onClick={handleCopy}>
      {copied ? 'Copied!' : 'Copy Link'}
      {copied ? (
        <Icon className={styles.copyLinkButton__icon} icon={icons.copied} />
      ) : (
        <Icon className={styles.copyLinkButton__icon} icon={icons.copyLink} />
      )}
    </button>
  )
}

export default CopyLinkButton
