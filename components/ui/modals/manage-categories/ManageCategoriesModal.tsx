'use client'

import { useState } from 'react'
import { Modal } from '../modal/Modal'
import { CategoryCreator, Heading, CategoryManager } from '@/components/ui/common'
import styles from './ManageCategoriesModal.module.scss'

interface ManageCategoriesModalProps {
  open: boolean
  onClose: () => void
}

export function ManageCategoriesModal({
  open,
  onClose,
}: ManageCategoriesModalProps) {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <Modal open={open} onClose={onClose}>
      <Heading as='h2' size='container'>Manage Categories</Heading>

      <CategoryCreator
        onCategoryCreated={() => {
          setRefreshKey((prev) => prev + 1)
        }}
        onCancel={onClose}
      />
      <div className={styles.categoryManagerContainer}>
        <CategoryManager key={refreshKey} />
      </div>
    </Modal>
  )
}
