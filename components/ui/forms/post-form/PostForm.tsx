'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { uploadImage } from '@/lib/functions/uploadImage'
import { createPost } from '@/lib/functions/createPost'
import { updatePost } from '@/lib/functions/updatePost'
import {
  FormField,
  SlugGenerator,
  ImageInput,
  RichTextEditor,
  CategorySelector,
  Heading,
  BodyText,
  LinkTag,
  GeneralInput,
  ActionButton,
} from '@/components/ui/common/'
import { TagSelector } from '@/components/ui/common'
import styles from './PostForm.module.scss'

export interface PostFormData {
  [key: string]: unknown
  id?: string // only used in edit mode
  title: string
  description: string
  content: string
  featuredImage?: string
  categoryId?: string
  tagIds?: string[]
  published?: boolean
  publishedAt?: string | null
}

interface PostFormProps {
  mode: 'create' | 'edit'
  initialData?: PostFormData
  onSuccess?: () => void // optional callback if you want to refresh a list
}

export function PostForm({ mode, initialData, onSuccess }: PostFormProps) {
  // Local state for fields
  const [title, setTitle] = useState<string>(initialData?.title || '')
  const [description, setDescription] = useState<string>(
    initialData?.description || ''
  )
  const [content, setContent] = useState<string>(initialData?.content || '')

  // We'll display any existing image but store new file in state
  const featuredImage = initialData?.featuredImage
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null)

  const [categoryId, setCategoryId] = useState<string | undefined>(
    initialData?.categoryId
  )
  const [tags, setTags] = useState<string[]>(initialData?.tagIds || [])

  // Publish logic
  const [published, setPublished] = useState<boolean>(
    initialData?.published || false
  )
  const [publishDate, setPublishDate] = useState<string>(
    initialData?.publishedAt
      ? new Date(initialData.publishedAt).toISOString().slice(0, 16)
      : ''
  )
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  // ⬇️ Add this effect to sync new `initialData` with state
  useEffect(() => {
    setTitle(initialData?.title || '')
    setDescription(initialData?.description || '')
    setContent(initialData?.content || '')
    setCategoryId(initialData?.categoryId)
    setTags(initialData?.tagIds || [])
    setPublished(initialData?.published || false)
    setPublishDate(
      initialData?.publishedAt
        ? new Date(initialData.publishedAt).toISOString().slice(0, 16)
        : ''
    )
  }, [initialData])

  // Helper to generate slug from the title
  function generateSlug(titleString: string): string {
    return titleString
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/'/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  }

  async function handleSubmit() {
    setLoading(true)
    try {
      // If user selected a new file, upload it
      let featuredImageUrl = featuredImage
      if (featuredImageFile) {
        featuredImageUrl = await uploadImage(featuredImageFile)
      }

      let finalPublishedAt: string | null = null
      if (published) {
        finalPublishedAt = publishDate
          ? new Date(publishDate).toISOString()
          : new Date().toISOString()
      }
      console.log('Submitting publish date', publishDate)
      console.log('Final published at', finalPublishedAt)

      const slug = generateSlug(title)

      const payload: PostFormData = {
        title,
        description,
        content,
        featuredImage: featuredImageUrl,
        categoryId,
        tagIds: tags,
        published,
        publishedAt: finalPublishedAt,
      }

      if (mode === 'create') {
        await createPost({ ...payload, slug })
      } else {
        if (!initialData?.id) {
          throw new Error('No post ID provided for edit')
        }
        await updatePost(initialData.id, payload)
      }

      if (onSuccess) onSuccess()
      router.push('/admin')
    } catch (error) {
      console.error(
        mode === 'create' ? 'Error creating post:' : 'Error updating post:',
        error
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.postForm}>
      {/* Title */}
      <FormField
        label='Title'
        placeholder='Enter post title'
        variant='input'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Slug is read-only, updated automatically from Title */}
      {mode === 'create' && <SlugGenerator title={title} />}

      {/* Description */}
      <FormField
        label='Description'
        placeholder='Enter a short description'
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
        existingImage={featuredImage}
        onImageSelect={(file) => setFeaturedImageFile(file)}
      />

      {/* Rich Text Content */}
      <RichTextEditor
        onChange={(html) => setContent(html)}
        initialHTML={content}
      />

      {/* Category Selector */}
      <CategorySelector
        defaultCategoryId={categoryId}
        onSelect={(cat) => setCategoryId(cat?.id)}
      />

      {/* Tag Selector */}
      <TagSelector
        defaultTagIds={tags}
        onChange={(updatedTags) => setTags(updatedTags.map((t) => t.id))}
      />

      {/* Publish Options */}
      <div className='border p-2 rounded'>
        <Heading as='h3' size='section-sub'>
          Publish
        </Heading>
        <label className={styles.checkboxLabel}>
          <input
            type='checkbox'
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <BodyText>Select Date</BodyText>
        </label>
        {published && (
          <div className={styles.publishDateContainer}>
            <BodyText>
              Choose a date/time or leave blank to publish immediately.
            </BodyText>
            <GeneralInput
              label='Publish Date'
              type='datetime-local'
              value={publishDate}
              onChange={(e) => {
                console.log('New Publish Date:', e.target.value)
                setPublishDate(e.target.value)
              }}
              className='border rounded p-1'
            />
            <ActionButton
              onClick={() =>
                setPublishDate(new Date().toISOString().slice(0, 16))
              }
            >
              Publish Now
            </ActionButton>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <LinkTag href='/admin'>Cancel</LinkTag>
        <ActionButton onClick={handleSubmit} disabled={loading}>
          {loading
            ? mode === 'create'
              ? 'Creating...'
              : 'Updating...'
            : mode === 'create'
            ? 'Create'
            : 'Update'}
        </ActionButton>
      </div>
    </div>
  )
}
