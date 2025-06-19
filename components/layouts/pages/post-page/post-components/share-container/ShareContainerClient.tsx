// components/layouts/containers/ShareContainerClient.tsx
'use client'

import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import CopyLinkButton from '@/components/ui/common/buttons/copy-link-button/CopyLinkButton'
import ShareModal from '@/components/ui/modals/share-modal/ShareModal'
import styles from './ShareContainerClient.module.scss'
import { ActionButton } from '@/components/ui/common'

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
    <div className={styles.shareContainer}>
      {/* Copy Link Button */}
      <CopyLinkButton url={url} />

      {/* Button to open the modal with more share options */}
      <ActionButton onClick={openModal}>More Share Options</ActionButton>

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
