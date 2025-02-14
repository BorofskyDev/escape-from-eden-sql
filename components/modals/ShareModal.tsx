'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Modal from '@/components/modals/Modal'

interface ShareModalProps {
  url: string
  title: string
  description: string
  onClose: () => void
}

const ShareModal: React.FC<ShareModalProps> = ({
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
      <div className='flex flex-col space-y-4'>
        <h2 className='text-xl font-bold'>Share this post</h2>
        <div className='flex flex-col space-y-2'>
          <motion.a
            href={facebookShare}
            target='_blank'
            rel='noopener noreferrer'
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
          >
            Share on Facebook
          </motion.a>
          <motion.a
            href={twitterShare}
            target='_blank'
            rel='noopener noreferrer'
            className='px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition'
          >
            Share on Twitter
          </motion.a>
          <motion.a
            href={linkedInShare}
            target='_blank'
            rel='noopener noreferrer'
            className='px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition'
          >
            Share on LinkedIn
          </motion.a>
          <motion.a
            href={whatsappShare}
            target='_blank'
            rel='noopener noreferrer'
            className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition'
          >
            Share on WhatsApp
          </motion.a>
        </div>
      </div>
    </Modal>
  )
}

export default ShareModal
