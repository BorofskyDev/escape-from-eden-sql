'use client'

import { signOut } from 'next-auth/react'
import { useState } from 'react'
import CreatePostModal from '@/components/modals/blog-ui/CreatePostModal'

export default function AdminPage() {
    const [open, setOpen] = useState(false)

    function handleOpen(e: React.MouseEvent) {
      // If you want the fancy "zoom from click" effect
      // We grab the click coordinates to pass as "origin"
      const rect = (e.target as HTMLElement).getBoundingClientRect()
      const origin = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      }

      setModalOrigin(origin)
      setOpen(true)
    }

    const [modalOrigin, setModalOrigin] = useState<
      { x: number; y: number } | undefined
    >(undefined)

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>This is the admin page</h1>
      <button
        onClick={handleOpen}
        className='bg-green-600 px-4 py-2 text-white'
      >
        Create New Post
      </button>

      <CreatePostModal
        open={open}
        onClose={() => setOpen(false)}
        origin={modalOrigin}
      />
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
      >
        Sign Out
      </button>
    </div>
  )
}
