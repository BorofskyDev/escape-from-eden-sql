// components/CreatePostModal.tsx
'use client'

import { useState } from 'react'
import Modal from '../Modal'
import FormField from '@/components/ui/inputs/FormField'
import SlugGenerator from '@/components/ui/inputs/SlugGenerator'
import CategorySelector from '@/components/ui/inputs/CategorySelector'
import type { Category} from '@/lib/functions/category'
import TagSelector from '@/components/ui/inputs/TagSelector'
import type { Tag} from '@/lib/functions/tag'
import ImageInput from '@/components/ui/inputs/ImageInput'
import RichTextEditor from '@/components/ui/inputs/RichTextEditor'
import { createPost } from '@/lib/functions/createPost'
import { uploadImage } from '@/lib/functions/uploadImage'

// A helper function to generate a slug from the title.
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/'/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

interface CreatePostModalProps {
  open: boolean
  onClose: () => void
  origin?: { x: number; y: number }
}

export default function CreatePostModal({
  open,
  onClose,
  origin,
}: CreatePostModalProps) {
  // State for our controlled fields.
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      let featuredImageUrl: string | undefined
      if (featuredImageFile) {
        // Upload the image and get the URL.
        featuredImageUrl = await uploadImage(featuredImageFile)
      }
      // Generate the slug from the title.
      const slug = generateSlug(title)

      // Construct our payload.
      const payload = {
        title,
        description,
        content,
        featuredImage: featuredImageUrl,
        slug,
        published: false, // Always false on creation.
        categoryId: category?.id,
        tagIds: tags.map((tag) => tag.id),
      }

      // Call our reusable function to create the post.
      await createPost(payload)

      // Optionally clear your form or notify success.
      onClose()
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} origin={origin}>
      <div className='h-full mt-40 flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>Create a New Post</h2>

        {/* Title Field */}
        <FormField
          label='Title'
          placeholder='Enter post title'
          variant='input'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Slug Generator (read-only) */}
        <SlugGenerator title={title} />

        {/* Description */}
        <FormField
          label='Description'
          placeholder='Enter a short post description'
          variant='textarea'
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Featured Image */}
        <ImageInput
          label='Featured Image'
          width={400}
          height={250}
          onImageSelect={(file) => setFeaturedImageFile(file)}
        />

        {/* Rich Text Editor for Content */}
        <RichTextEditor onChange={(html) => setContent(html)} />

        {/* Category Selector */}
        <CategorySelector onSelect={(cat) => setCategory(cat)} />

        {/* Tag Selector */}
        <TagSelector onChange={(selectedTags) => setTags(selectedTags)} />

        {/* Submit and Cancel Buttons */}
        <div className='flex justify-end gap-2 mt-4'>
          <button
            className='bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400'
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </div>
    </Modal>
  )
}
