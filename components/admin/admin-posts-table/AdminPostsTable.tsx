'use client'

import { useState } from 'react'
import { usePosts, Post } from '@/lib/hooks/usePosts'
import { formatDate } from '@/lib/functions/formatDate'
import EditPostModal from '@/components/ui/modals/EditPostModal'
import Image from 'next/image'
import { deletePost } from '@/lib/functions/deletePost'
import styles from './AdminPostsTable.module.scss'
import { BodyText, Heading } from '@/components/ui/common'

export function AdminPostsTable() {
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
    <section id='admin-posts-table' className={styles.adminPostsSection}>
      <Heading as='h3' size='section'>
        Posts
      </Heading>
      {loading && <BodyText>Loading posts...</BodyText>}
      {error && <BodyText variant='error'>Error: {error.message}</BodyText>}
      {!loading && !error && (
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.tableCell}>Thumbnail</th>
              <th className={styles.tableCell}>Title</th>
              <th className={styles.tableCell}>Status</th>
              <th className={styles.tableCell}>Last Updated</th>
              <th className={styles.tableCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className={styles.tableRow}
                onClick={() => handleRowClick(post)}
              >
                <td className={styles.image}>
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    objectFit='cover'
                    layout='responsive'
                    width={1280}
                    height={1060}
                  />
                </td>
                <td className={styles.rowContainer}>{post.title}</td>
                <td
                  className={`${styles.rowContainer} ${
                    post.published ? styles.rowContainer__published : ''
                  }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </td>
                <td className={styles.rowContainer}>{formatDate(post.updatedAt)}</td>
                <td className={styles.rowContainer}>
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
    </section>
  )
}
