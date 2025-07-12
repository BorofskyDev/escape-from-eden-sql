'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'
import ManageCategoriesModal from '@/components/ui/modals/ManageCategoriesModal'
import ManageTagsModal from '@/components/ui/modals/ManageTagsModal'
import { Page } from '@/components/layouts'
import { CreatePostModal } from '@/components/ui/modals'
import MessagesList from '@/components/admin/MessageList'
import {
  ActionButton,
  BodyText,
  Heading,
  LinkTag,
} from '@/components/ui/common'
import styles from './AdminPageComponent.module.scss'
import { AdminPostsTable } from '@/components/admin'

export function AdminPageComponent() {
  const [open, setOpen] = useState(false)
  const [modalOrigin, setModalOrigin] = useState<
    { x: number; y: number } | undefined
  >(undefined)

  // States for the new modals:
  const [manageCategoriesOpen, setManageCategoriesOpen] = useState(false)
  const [manageTagsOpen, setManageTagsOpen] = useState(false)

  function handleOpen(e: React.MouseEvent) {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    const origin = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
    setModalOrigin(origin)
    setOpen(true)
  }

  return (
    <Page className={styles.adminPage}>
      <Heading as='h1' size='page'>
        Admin Dashboard
      </Heading>

      {/* Blog Settings Section */}
      <section className={styles.blogSettingsSection}>
        <Heading as='h2' size='section'>
          Blog Settings
        </Heading>
        <div className={styles.linkList}>
          <ActionButton
            onClick={handleOpen}
            className='bg-primary px-4 py-2 text-bg1 rounded transition-all duration-200 hover:bg-secondary'
          >
            Create New Post
          </ActionButton>
          <CreatePostModal
            open={open}
            onClose={() => setOpen(false)}
            origin={modalOrigin}
          />

          <ActionButton
            variant='secondary'
            onClick={() => setManageCategoriesOpen(true)}
          >
            Manage Categories
          </ActionButton>
          <ActionButton
            variant='secondary'
            onClick={() => setManageTagsOpen(true)}
          >
            Manage Tags
          </ActionButton>
          <LinkTag href='/admin/subscribers'>Manage Subscribers</LinkTag>
        </div>
        <AdminPostsTable />
      </section>

      {/* Messages Section */}
      <section className={styles.messagesSection}>
        <Heading as='h2' size='section'>
          Messages
        </Heading>
        <BodyText>Here are your latest messages.</BodyText>
        <MessagesList />
      </section>

      {/* Sign Out Button at the end */}
      <div className='flex justify-end'>
        <ActionButton
          variant='caution'
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          Sign Out
        </ActionButton>
      </div>

      {/* Conditionally render the new modals */}
      {manageCategoriesOpen && (
        <ManageCategoriesModal
          open={manageCategoriesOpen}
          onClose={() => setManageCategoriesOpen(false)}
        />
      )}
      {manageTagsOpen && (
        <ManageTagsModal
          open={manageTagsOpen}
          onClose={() => setManageTagsOpen(false)}
        />
      )}
    </Page>
  )
}
