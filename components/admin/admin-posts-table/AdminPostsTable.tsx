'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePosts } from '@/lib/hooks/usePosts'
import { Post } from '@prisma/client'
import { formatDate } from '@/lib/functions/formatDate'
import Image from 'next/image'
import { deletePost } from '@/lib/functions/deletePost'
import styles from './AdminPostsTable.module.scss'
import { ActionButton, BodyText, Heading } from '@/components/ui/common'
import clsx from 'clsx'

export function AdminPostsTable() {
  const [page, setPage] = useState(1)
  const { posts, hasNextPage, loading, error, refetch } = usePosts(page)

  const router = useRouter()

  const handleRowClick = (post: Post) => {
    router.push(`/admin/edit-post/${post.id}`)
  }

  const handleDelete = async (post: Post, e: React.MouseEvent) => {
    e.stopPropagation()
    const confirmed = window.confirm(
      `Are you sure you want to delete the post "${post.title}"?`
    )
    if (!confirmed) return
    try {
      await deletePost(post.id)
      refetch?.()
    } catch (err: unknown) {
      console.error('Failed to delete post:', err)
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
                role='button'
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleRowClick(post)
                }}
              >
                <td className={styles.image}>
                  <Image
                    src={post.featuredImage || '/placeholder-image.jpg'}
                    alt={post.featuredImageAlt || 'Post thumbnail'}
                    width={1280}
                    height={1060}
                    // if on Next 13+, prefer style={{ objectFit: 'cover' }} over deprecated props
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                </td>
                <td className={styles.rowContainer}>{post.title}</td>
                <td
                  className={clsx(
                    styles.rowContainer,
                    post.published && styles.rowContainer__published
                  )}
                >
                  {post.published ? 'Published' : 'Draft'}
                </td>
                <td className={styles.rowContainer}>
                  {formatDate(
                    typeof post.updatedAt === 'string'
                      ? post.updatedAt
                      : post.updatedAt.toISOString() 
                  )}
                </td>
                <td className={clsx(styles.rowContainer, styles.deleteButton)}>
                  <button onClick={(e) => handleDelete(post, e)}>Delete</button>
                  {/* Optional explicit edit button (so you don't rely on row click) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/admin/edit-post/${post.id}`)
                    }}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && (
        <div className={styles.paginationControls}>
          <ActionButton
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </ActionButton>
          <ActionButton
            onClick={() => hasNextPage && setPage((p) => p + 1)}
            disabled={!hasNextPage}
          >
            Next
          </ActionButton>
        </div>
      )}
    </section>
  )
}
