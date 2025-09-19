'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { ManageCategoriesModal } from '@/components/ui/modals'
import ManageTagsModal from '@/components/ui/modals/ManageTagsModal'
import { Page } from '@/components/layouts'
import MessagesList from '@/components/admin/MessageList'
import {
  ActionButton,
  BodyText,
  Heading,
  LinkTag,
} from '@/components/ui/common'
import { AdminPostsTable } from '@/components/admin'
import styles from './AdminPageComponent.module.scss'

export function AdminPageComponent() {
  const [manageCategoriesOpen, setManageCategoriesOpen] = useState(false)
  const [manageTagsOpen, setManageTagsOpen] = useState(false)

  return (
    <Page className={styles.adminPage}>
      <Heading as='h1' size='page'>
        Admin Dashboard
      </Heading>

      {/* Messages Section */}
      <section className={styles.messagesSection}>
        <Heading as='h2' size='section'>
          Messages
        </Heading>
        <BodyText>Here are your latest messages.</BodyText>
        <MessagesList />
      </section>
      
      {/* Blog Settings Section */}
      <section className={styles.blogSettingsSection}>
        <Heading as='h2' size='section'>
          Blog Settings
        </Heading>
        <div className={styles.linkList}>
          <LinkTag href='/admin/create-post'>Create New Post</LinkTag>

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
