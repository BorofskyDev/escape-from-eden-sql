'use client'

import { signOut } from 'next-auth/react'

export default function AdminPage() {
  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>This is the admin page</h1>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
      >
        Sign Out
      </button>
    </div>
  )
}
