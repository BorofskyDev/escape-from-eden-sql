'use client'

import { useState, useEffect } from 'react'
import { getTags, Tag } from '@/lib/functions/tag'

// Optional: functions to update and delete tags might be added in your lib/functions/tag file.
// For example, updateTag(id, payload) and deleteTag(id).

export default function TagManager() {
  const [tags, setTags] = useState<Tag[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTags() {
      try {
        const fetchedTags = await getTags()
        setTags(fetchedTags)
      } catch (err) {
        console.error('Error fetching tags:', err)
        setError('Failed to load tags')
      }
    }
    fetchTags()
  }, [])

  // Handler for editing a tag.
  const handleEditClick = (tag: Tag) => {
    setEditingId(tag.id)
    setEditName(tag.name)
  }

  // Save updated tag (you’d implement updateTag in your lib/functions/tag.ts).
  const handleSave = async (tagId: string) => {
    try {
      // For example:
      // const updated = await updateTag(tagId, { name: editName, slug: generateSlug(editName) })
      // Update local state:
      setTags((prev) =>
        prev.map((tag) => (tag.id === tagId ? { ...tag, name: editName } : tag))
      )
      setEditingId(null)
      setEditName('')
    } catch (err) {
      console.error('Error updating tag:', err)
      setError('Failed to update tag')
    }
  }

  // Handler for deleting a tag (you’d implement deleteTag in your lib/functions/tag.ts).
  const handleDelete = async (tagId: string) => {
    if (!confirm('Are you sure you want to delete this tag?')) return
    try {
      // For example:
      // await deleteTag(tagId)
      // Remove tag from state:
      setTags((prev) => prev.filter((tag) => tag.id !== tagId))
    } catch (err) {
      console.error('Error deleting tag:', err)
      setError('Failed to delete tag')
    }
  }

  return (
    <div>
      <h3 className='text-lg font-bold mb-2'>Tags</h3>
      {error && <p className='text-red-500'>{error}</p>}
      <ul className='space-y-2'>
        {tags.map((tag) => (
          <li key={tag.id} className='flex items-center gap-2'>
            {editingId === tag.id ? (
              <>
                <input
                  type='text'
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className='border rounded p-1'
                />
                <button
                  onClick={() => handleSave(tag.id)}
                  className='bg-blue-500 text-white px-2 py-1 rounded'
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className='text-gray-500'
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{tag.name}</span>
                <button
                  onClick={() => handleEditClick(tag)}
                  className='text-blue-500 hover:underline'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tag.id)}
                  className='text-red-500 hover:underline'
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
