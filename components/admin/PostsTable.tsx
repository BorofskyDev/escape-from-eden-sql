'use client'

import { useState } from 'react'
import { usePosts, Post } from '@/lib/hooks/usePosts'
import { formatDate } from '@/lib/functions/formatDate'
import EditPostModal from '@/components/modals/EditPostModal'
import Image from 'next/image'
import { deletePost } from '@/lib/functions/deletePost'

export default function PostsTable() {
  const [page, setPage] = useState(1)
  const { posts, hasNextPage, loading, error, refetch } = usePosts(page)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)

  const handleRowClick = (post: Post) => {
    setSelectedPost(post)
    setEditModalOpen(true)
  }

  const handleDelete = async (post: Post, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent the row click event
    const confirmed = window.confirm(
      `Are you sure you want to delete the post "${post.title}"?`
    )
    if (!confirmed) return

    try {
      await deletePost(post.id)
      if (refetch) {
        refetch()
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Failed to delete post:', err.message)
      } else {
        console.error('Failed to delete post:', err)
      }
      alert('Failed to delete post. Please try again.')
    }
  }

  return (
    <div className='mt-16'>
      <h2 className='text-xl font-bold mb-4 text-center'>Posts</h2>
      {loading && <p>Loading posts...</p>}
      {error && <p className='text-red-600'>Error: {error.message}</p>}
      {!loading && !error && (
        <table className='min-w-full border-collapse '>
          <thead>
            <tr className='bg-primary'>
              <th className='border p-2 text-bg1'>Thumbnail</th>
              <th className='border p-2 text-bg1'>Title</th>
              <th className='border p-2 text-bg1'>Status</th>
              <th className='border p-2 text-bg1'>Last Updated</th>
              <th className='border p-2 text-bg1'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className='cursor-pointer hover:bg-secondary transition-all duration-200 hover:text-bg1'
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
                <td className='border p-2 capitalize'>{post.title}</td>
                <td className={`border p-2 ${post.published ? 'bg-secondary text-bg1' : ''}`}>
                  {post.published ? 'Published' : 'Draft'}
                </td>
                <td className='border p-2'>{formatDate(post.updatedAt)}</td>
                <td className='border p-2'>
                  <button
                    onClick={(e) => handleDelete(post, e)}
                    className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination controls: Always rendered when not loading */}
      {!loading && (
        <div className='flex justify-between mt-4'>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`bg-primary text-bg1 px-4 py-2 rounded transition-all duration-200 ${
              page === 1
                ? 'cursor-not-allowed opacity-50'
                : 'hover:bg-secondary'
            }`}
          >
            Prev
          </button>
          <button
            onClick={() => hasNextPage && setPage((prev) => prev + 1)}
            disabled={!hasNextPage}
            className={`bg-primary text-bg1 px-4 py-2 rounded transition-all duration-200 ${
              !hasNextPage
                ? 'cursor-not-allowed opacity-50'
                : 'hover:bg-secondary'
            }`}
          >
            Next
          </button>
        </div>
      )}

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
