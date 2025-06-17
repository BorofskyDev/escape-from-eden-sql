// components/ui/inputs/TagSelector.tsx
'use client'

import { useState, useEffect } from 'react'
import { getTags, Tag} from '@/lib/functions/tag'
import TagCreator from './TagCreator'

interface TagSelectorProps {
  defaultTagIds?: string[]
  onChange?: (selectedTags: Tag[]) => void
}

export default function TagSelector({
  defaultTagIds,
  onChange,
}: TagSelectorProps) {
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
    <div>
      <label className='block text-sm font-medium text-gray-700'>Tags</label>
      {tags.length === 0 ? (
        <div className='mt-1 text-sm text-gray-500'>
          No tags have been created.
        </div>
      ) : (
        <div className='mt-1 flex flex-wrap gap-2'>
          {tags.map((tag) => {
            const isActive = selectedTagIds.includes(tag.id)
            return (
              <button
                key={tag.id}
                type='button'
                onClick={() => toggleTag(tag.id)}
                className={`px-3 py-1 border rounded ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
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
          <button
            onClick={() => setShowCreator(true)}
            className='mt-2 text-blue-600 hover:underline'
            type='button'
          >
            Create Tag
          </button>
        )}
      </div>
    </div>
  )
}
