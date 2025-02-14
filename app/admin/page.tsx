'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'
import CreatePostModal from '@/components/modals/CreatePostModal'
import PostsTable from '@/components/admin/PostsTable'
import ManageCategoriesModal from '@/components/modals/ManageCategoriesModal'
import ManageTagsModal from '@/components/modals/ManageTagsModal'
import GeneralSection from '@/components/layouts/sections/GeneralSection'
import PageTitle from '@/components/typography/PageTitle'

export default function AdminPage() {
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
    <GeneralSection>
      <PageTitle>Admin Dashboard</PageTitle>

      {/* Blog Settings Section */}
      <section className='border p-4 rounded shadow mb-8'>
        <h2 className='text-xl font-semibold mb-2 text-center'>
          Blog Settings
        </h2>
        <div className='mt-10 flex justify-around items-center  place-items-center'>
          <button
            onClick={handleOpen}
            className='bg-primary px-4 py-2 text-bg1 rounded transition-all duration-200 hover:bg-secondary'
          >
            Create New Post
          </button>
          <CreatePostModal
            open={open}
            onClose={() => setOpen(false)}
            origin={modalOrigin}
          />

          <button
            onClick={() => setManageCategoriesOpen(true)}
            className='bg-primary px-4 py-2 text-bg1 rounded transition-all duration-200 hover:bg-secondary'
          >
            Manage Categories
          </button>
          <button
            onClick={() => setManageTagsOpen(true)}
            className='bg-primary px-4 py-2 text-bg1 rounded transition-all duration-200 hover:bg-secondary'
          >
            Manage Tags
          </button>
        </div>
        <PostsTable />
      </section>

      {/* Messages Section */}
      <section className='border p-4 rounded shadow mb-8'>
        <h2 className='text-xl font-semibold mb-2'>Messages</h2>
        <p className='text-gray-700'>Here are your latest messages.</p>
        {/* Insert your messages UI here */}
      </section>

      {/* Sign Out Button at the end */}
      <div className='flex justify-end'>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
        >
          Sign Out
        </button>
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
    </GeneralSection>
  )
}
