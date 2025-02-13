'use client'

import { useState } from 'react'
import Modal from './Modal'
import TagCreator from '@/components/ui/inputs/TagCreator'
import TagManager from '@/components/ui/inputs/TagManager'

interface ManageTagsModalProps {
  open: boolean
  onClose: () => void
}

export default function ManageTagsModal({
  open,
  onClose,
}: ManageTagsModalProps) {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className='text-xl font-bold mb-4'>Manage Tags</h2>
      {/* TagCreator lets you create a new tag.
          Increment refreshKey on creation to update TagManager. */}
      <TagCreator
        onTagCreated={() => {
          setRefreshKey((prev) => prev + 1)
        }}
        onCancel={onClose}
      />
      <div className='mt-4'>
        <TagManager key={refreshKey} />
      </div>
    </Modal>
  )
}
