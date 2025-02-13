'use client'

import { useState } from 'react'
import Modal from './Modal'
import CategoryCreator from '@/components/ui/inputs/CategoryCreator'
import CategoryManager from '@/components/ui/inputs/CategoryManager'

interface ManageCategoriesModalProps {
  open: boolean
  onClose: () => void
}

export default function ManageCategoriesModal({
  open,
  onClose,
}: ManageCategoriesModalProps) {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className='text-xl font-bold mb-4'>Manage Categories</h2>

      <CategoryCreator
        onCategoryCreated={() => {
          setRefreshKey((prev) => prev + 1)
        }}
        onCancel={onClose}
      />
      <div className='mt-4'>
        <CategoryManager key={refreshKey} />
      </div>
    </Modal>
  )
}
