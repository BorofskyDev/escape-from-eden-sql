'use client'

import { Heading, FormField, ActionButton } from '@/components/ui/common'
import { Page } from '@/components/layouts'
import { usePostSearch } from '@/lib/hooks'
import { toPostData } from '@/lib/functions'
import { SmallPostCard } from '@/components/ui/cards'
import styles from './SearchPosts.module.scss'

export function SearchPosts() {
  const {
    filters,
    posts,
    loading,
    error,
    hasMore,
    hasQuery,
    setFilter,
    submit,
    loadMore,
  } = usePostSearch({ limit: 10, debounceMs: 400 })

  return (
    <Page>
      <Heading as='h1' size='page'>
        Search Blog
      </Heading>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        className={styles.form}
      >
        <FormField
          label='Search'
          placeholder='Search title/description/content'
          value={filters.title}
          onChange={(e) => setFilter('title', e.currentTarget.value)}
        />

        <div className={styles.row}>
          <FormField
            label='Start date'
            type='date'
            value={filters.startDate}
            onChange={(e) => setFilter('startDate', e.currentTarget.value)}
          />
          <FormField
            label='End date'
            type='date'
            value={filters.endDate}
            onChange={(e) => setFilter('endDate', e.currentTarget.value)}
          />
        </div>

        <FormField
          label='Category slug'
          placeholder='e.g. politics'
          value={filters.category}
          onChange={(e) => setFilter('category', e.currentTarget.value)}
        />

        <FormField
          label='Tag slug'
          placeholder='e.g. ai'
          value={filters.tag}
          onChange={(e) => setFilter('tag', e.currentTarget.value)}
        />

        <div className={styles.actions}>
          <ActionButton type='submit'>Search</ActionButton>
        </div>
      </form>

      {loading && <p className={styles.status}>Loading…</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !hasQuery && posts.length === 0 && (
        <p className={styles.hint}>Add a filter to search posts.</p>
      )}
      {!loading && hasQuery && posts.length === 0 && (
        <p className={styles.status}>No posts found.</p>
      )}

      <div className={styles.results}>
        {posts.map((post) => (
          <SmallPostCard key={post.id} post={toPostData(post)} />
        ))}
      </div>

      {hasMore && !loading && (
        <div className={styles.loadMoreWrap}>
          <ActionButton onClick={loadMore} variant='secondary'>
            Load More
          </ActionButton>
        </div>
      )}
    </Page>
  )
}
