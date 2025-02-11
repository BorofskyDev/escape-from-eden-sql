'use client'

import { useState, useEffect } from 'react'
import { getTags, createTag, Tag } from '@/lib/functions/tag'

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
  const [creating, setCreating] = useState<boolean>(false)
  const [newTagName, setNewTagName] = useState<string>('')

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
    let updated: string[]
    if (selectedTagIds.includes(tagId)) {
      updated = selectedTagIds.filter((id) => id !== tagId)
    } else {
      updated = [...selectedTagIds, tagId]
    }
    setSelectedTagIds(updated)
    if (onChange) {
      const selected = tags.filter((tag) => updated.includes(tag.id))
      onChange(selected)
    }
  }

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return
    try {
      const newTag = await createTag(newTagName)
      const updatedTags = [...tags, newTag]
      setTags(updatedTags)
      const updatedSelectedTagIds = [...selectedTagIds, newTag.id]
      setSelectedTagIds(updatedSelectedTagIds)
      if (onChange) {
        onChange(
          updatedTags.filter((tag) => updatedSelectedTagIds.includes(tag.id))
        )
      }
      setNewTagName('')
      setCreating(false)
    } catch (error) {
      console.error('Error creating tag:', error)
    }
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
        {creating ? (
          <div className='flex gap-2'>
            <input
              type='text'
              placeholder='New tag name'
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              className='block w-full border rounded p-2'
            />
            <button
              onClick={handleCreateTag}
              className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'
              type='button'
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setCreating(true)}
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
