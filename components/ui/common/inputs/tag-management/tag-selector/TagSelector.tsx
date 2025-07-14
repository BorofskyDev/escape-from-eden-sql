// components/ui/inputs/TagSelector.tsx
'use client'

import { useState, useEffect } from 'react'
import { getTags, Tag } from '@/lib/functions/tag'
import { ActionButton, BodyText, Heading, TagCreator } from '@/components/ui/common'

import styles from './TagSelector.module.scss'

interface TagSelectorProps {
  defaultTagIds?: string[]
  onChange?: (selectedTags: Tag[]) => void
}

export function TagSelector({ defaultTagIds, onChange }: TagSelectorProps) {
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    defaultTagIds || []
  )
  const [showCreator, setShowCreator] = useState<boolean>(false)

  useEffect(() => {
    async function fetchTags() {
      try {
        const fetchedTags = await getTags()
        setTags(fetchedTags)
      } catch (error) {
        console.error('Error fetching tags:', error)
      }
    }
    fetchTags()
  }, [])

  const toggleTag = (tagId: string) => {
    const updated = selectedTagIds.includes(tagId)
      ? selectedTagIds.filter((id) => id !== tagId)
      : [...selectedTagIds, tagId]
    setSelectedTagIds(updated)
    if (onChange) {
      onChange(tags.filter((tag) => updated.includes(tag.id)))
    }
  }

  const handleTagCreated = (newTag: Tag) => {
    const updatedTags = [...tags, newTag]
    setTags(updatedTags)
    const updatedSelectedTagIds = [...selectedTagIds, newTag.id]
    setSelectedTagIds(updatedSelectedTagIds)
    if (onChange) {
      onChange(
        updatedTags.filter((tag) => updatedSelectedTagIds.includes(tag.id))
      )
    }
    setShowCreator(false)
  }

  return (
    <div className={styles.tagSelector}>
      <Heading as='h3' size='container'>
        Tags
      </Heading>
      {tags.length === 0 ? (
        <BodyText>No tags have been created.</BodyText>
      ) : (
        <div className={styles.tags}>
          {tags.map((tag) => {
            const isActive = selectedTagIds.includes(tag.id)
            return (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`${styles.tagButton} ${
                  isActive ? styles.active : ''
                }`}
              >
                {tag.name}
              </button>
            )
          })}
        </div>
      )}
      <div className='mt-2'>
        {showCreator ? (
          <TagCreator
            onTagCreated={handleTagCreated}
            onCancel={() => setShowCreator(false)}
          />
        ) : (
          <ActionButton
            onClick={() => setShowCreator(true)}
            variant='secondary'
          >
            Create Tag
          </ActionButton>
        )}
      </div>
    </div>
  )
}
