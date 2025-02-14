'use client'

import React, { useState } from 'react'

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
    <button
      onClick={handleCopy}
      className='px-4 py-2 bg-primary text-bg1 rounded hover:bg-secondary transition-all duration-200'
    >
      {copied ? 'Copied!' : 'Copy Link'}
    </button>
  )
}

export default CopyLinkButton
