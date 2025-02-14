// components/layouts/containers/ShareContainerClient.tsx
'use client'

import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import CopyLinkButton from '@/components/ui/buttons/CopyLinkButton'
import ShareModal from '@/components/modals/ShareModal'

interface ShareContainerProps {
  url: string
  title: string
  description: string
}

const ShareContainerClient: React.FC<ShareContainerProps> = ({
  url,
  title,
  description,
}) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <div className='flex items-center space-x-4'>
      {/* Copy Link Button */}
      <CopyLinkButton url={url} />

      {/* Button to open the modal with more share options */}
      <button
        onClick={openModal}
        className='px-4 py-2 bg-secondary text-bg1 rounded hover:bg-accent transition-all duration-200'
      >
        More Share Options
      </button>

      {/* AnimatePresence provides smooth mounting/unmounting for the modal */}
      <AnimatePresence>
        {isModalOpen && (
          <ShareModal
            url={url}
            title={title}
            description={description}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default ShareContainerClient
