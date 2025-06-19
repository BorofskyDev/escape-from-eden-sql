'use client'

import React from 'react'
import { Modal} from '@/components/ui/modals/'
import { Heading, TextLink } from '@/components/ui/common'
import styles from './ShareModal.module.scss'

interface ShareModalProps {
  url: string
  title: string
  description: string
  onClose: () => void
}

export const ShareModal: React.FC<ShareModalProps> = ({
  url,
  title,
  description,
  onClose,
}) => {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
  const linkedInShare = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`
  const whatsappShare = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`

  return (
    <Modal open onClose={onClose}>
      <div className={styles.shareModal}>
        <Heading as='h2' size='section-sub'>Share this post</Heading>
        <div className={styles.shareModal__links}>
          <TextLink
            href={facebookShare}
            target='_blank'
            rel='noopener noreferrer'
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
          >
            Share on Facebook
          </TextLink>
          <TextLink
            href={twitterShare}
            target='_blank'
            rel='noopener noreferrer'
            className='px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition'
          >
            Share on Twitter
          </TextLink>
          <TextLink
            href={linkedInShare}
            target='_blank'
            rel='noopener noreferrer'
            className='px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition'
          >
            Share on LinkedIn
          </TextLink>
          <TextLink
            href={whatsappShare}
            target='_blank'
            rel='noopener noreferrer'
            className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition'
          >
            Share on WhatsApp
          </TextLink>
        </div>
      </div>
    </Modal>
  )
}

