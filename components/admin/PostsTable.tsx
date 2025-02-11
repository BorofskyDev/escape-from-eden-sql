// components/admin/PostsTable.tsx
'use client'

import { useState } from 'react'
import { usePosts, Post } from '@/lib/hooks/usePosts'
import { formatDate } from '@/lib/functions/formatDate'
import EditPostModal from '@/components/modals/blog-ui/EditPostModal'
import Image from 'next/image'

export default function PostsTable() {
  const [page, setPage] = useState(1)
  const { posts, hasNextPage, loading, error } = usePosts(page)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)

  const handleRowClick = (post: Post) => {
    setSelectedPost(post)
    setEditModalOpen(true)
  }

  return (
    <div className='mt-8'>
      <h2 className='text-xl font-bold mb-4'>Posts</h2>
      {loading && <p>Loading posts...</p>}
      {error && <p className='text-red-600'>Error: {error.message}</p>}
      {!loading && !error && (
        <table className='min-w-full border-collapse'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border p-2'>Thumbnail</th>
              <th className='border p-2'>Title</th>
              <th className='border p-2'>Status</th>
              <th className='border p-2'>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className='cursor-pointer hover:bg-gray-100'
                onClick={() => handleRowClick(post)}
              >
                <td className='border p-2'>
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    className='w-16 h-16 object-cover'
                    width={1280}
                    height={1060}
                  />
                </td>
                <td className='border p-2'>{post.title}</td>
                <td className='border p-2'>
                  {post.published ? 'Published' : 'Draft'}
                </td>
                <td className='border p-2'>{formatDate(post.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Pagination: "Next" button */}
      {hasNextPage && !loading && (
        <div className='flex justify-end mt-4'>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Next
          </button>
        </div>
      )}
      {/* Edit Post Modal */}
      {editModalOpen && selectedPost && (
        <EditPostModal
          open={editModalOpen}
          post={selectedPost}
          onClose={() => {
            setEditModalOpen(false)
            setSelectedPost(null)
          }}
        />
      )}
    </div>
  )
}
