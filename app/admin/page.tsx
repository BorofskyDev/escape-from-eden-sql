'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'
import CreatePostModal from '@/components/modals/blog-ui/CreatePostModal'
import PostsTable from '@/components/admin/PostsTable'
import GeneralSection from '@/components/layouts/sections/GeneralSection'

export default function AdminPage() {
  const [open, setOpen] = useState(false)
  const [modalOrigin, setModalOrigin] = useState<
    { x: number; y: number } | undefined
  >(undefined)

  function handleOpen(e: React.MouseEvent) {
    // Grab the click coordinates for a zoom effect
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
      <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>

      {/* Blog Settings Section */}
      <section className='border p-4 rounded shadow'>
        <h2 className='text-xl font-semibold mb-2'>Blog Settings</h2>
        <div className='space-y-4'>
          <button
            onClick={handleOpen}
            className='bg-primary px-4 py-2 text-bg1 rounded'
          >
            Create New Post
          </button>
          <CreatePostModal
            open={open}
            onClose={() => setOpen(false)}
            origin={modalOrigin}
          />
        </div>
        <PostsTable />
      </section>

      {/* Messages Section */}
      <section className='border p-4 rounded shadow'>
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
    </GeneralSection>
  )
}
