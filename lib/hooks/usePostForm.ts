'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { uploadImage } from '@/lib/functions/uploadImage'
import { createPost } from '@/lib/functions/createPost'
import { updatePost } from '@/lib/functions/updatePost'

export interface PostFormData {
  [key: string]: unknown
  id?: string
  title: string
  description: string
  content: string
  featuredImage?: string
  featuredImageAlt?: string | null
  categoryId?: string
  tagIds?: string[]
  published?: boolean
  publishedAt?: string | null
}

export interface UsePostFormOptions {
  mode: 'create' | 'edit'
  initialData?: PostFormData
  onSuccess?: () => void
  // if you sometimes want to skip router push and only run onSuccess:
  redirectAfterSave?: string | null // e.g. '/admin' | null
}

export function usePostForm({
  mode,
  initialData,
  onSuccess,
  redirectAfterSave = '/admin',
}: UsePostFormOptions) {
  const router = useRouter()

  // Core fields
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [content, setContent] = useState(initialData?.content || '')

  // Image + alt
  const [existingFeaturedImageUrl, setExistingFeaturedImageUrl] = useState<
    string | undefined
  >(initialData?.featuredImage)
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null)
  const [featuredImageAlt, setFeaturedImageAlt] = useState(
    initialData?.featuredImageAlt || ''
  )

  // Taxonomy
  const [categoryId, setCategoryId] = useState<string | undefined>(
    initialData?.categoryId
  )
  const [tags, setTags] = useState<string[]>(initialData?.tagIds || [])

  // Publish controls
  const [published, setPublished] = useState<boolean>(
    initialData?.published || false
  )
  const [publishDate, setPublishDate] = useState<string>(
    initialData?.publishedAt
      ? new Date(initialData.publishedAt).toISOString().slice(0, 16)
      : ''
  )

  // UX
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{
    featuredImageAlt?: string
    title?: string
    description?: string
  }>({})

  // Sync external changes to initialData
  useEffect(() => {
    setTitle(initialData?.title || '')
    setDescription(initialData?.description || '')
    setContent(initialData?.content || '')
    setExistingFeaturedImageUrl(initialData?.featuredImage)
    setFeaturedImageAlt(initialData?.featuredImageAlt || '')
    setCategoryId(initialData?.categoryId)
    setTags(initialData?.tagIds || [])
    setPublished(initialData?.published || false)
    setPublishDate(
      initialData?.publishedAt
        ? new Date(initialData.publishedAt).toISOString().slice(0, 16)
        : ''
    )
  }, [initialData])

  // Derived
  const hasAnyFeaturedImage = useMemo(
    () => Boolean(existingFeaturedImageUrl) || Boolean(featuredImageFile),
    [existingFeaturedImageUrl, featuredImageFile]
  )

  const generateSlug = useCallback((titleString: string): string => {
    return titleString
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/'/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  }, [])

  const validate = useCallback((): boolean => {
    const next: typeof errors = {}

    if (!title.trim()) next.title = 'Title is required.'
    if (!description.trim()) next.description = 'Description is required.'

    if (hasAnyFeaturedImage) {
      const alt = (featuredImageAlt ?? '').trim()
      if (!alt)
        next.featuredImageAlt =
          'Alt text is required when a featured image is present.'
      else if (alt.length > 300)
        next.featuredImageAlt = 'Alt text must be 300 characters or fewer.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }, [title, description, hasAnyFeaturedImage, featuredImageAlt])

  const submit = useCallback(async () => {
    if (!validate() || loading) return
    setLoading(true)

    try {
      // Upload new file if selected
      let featuredImageUrl = existingFeaturedImageUrl
      if (featuredImageFile) {
        featuredImageUrl = await uploadImage(featuredImageFile)
      }

      // PublishAt handling
      let finalPublishedAt: string | null = null
      if (published) {
        finalPublishedAt = publishDate
          ? new Date(publishDate).toISOString()
          : new Date().toISOString()
      }

      const slug = generateSlug(title)

      const payload: PostFormData = {
        title,
        description,
        content,
        featuredImage: featuredImageUrl,
        featuredImageAlt: hasAnyFeaturedImage
          ? featuredImageAlt?.trim() || null
          : null,
        categoryId,
        tagIds: tags,
        published,
        publishedAt: finalPublishedAt,
      }

      if (mode === 'create') {
        await createPost({ ...payload, slug })
      } else {
        if (!initialData?.id) throw new Error('No post ID provided for edit')
        await updatePost(initialData.id, payload)
      }

      onSuccess?.()
      if (redirectAfterSave) router.push(redirectAfterSave)
    } finally {
      setLoading(false)
    }
  }, [
    validate,
    loading,
    existingFeaturedImageUrl,
    featuredImageFile,
    published,
    publishDate,
    generateSlug,
    title,
    description,
    content,
    featuredImageAlt,
    categoryId,
    tags,
    mode,
    initialData?.id,
    onSuccess,
    redirectAfterSave,
    router,
    hasAnyFeaturedImage,
  ])

  // handy helper for “Publish Now” button
  const setPublishNow = useCallback(() => {
    setPublishDate(new Date().toISOString().slice(0, 16))
    setPublished(true)
  }, [])

  return {
    // state values
    title,
    description,
    content,
    existingFeaturedImageUrl,
    featuredImageFile,
    featuredImageAlt,
    categoryId,
    tags,
    published,
    publishDate,
    hasAnyFeaturedImage,
    loading,
    errors,

    // setters
    setTitle,
    setDescription,
    setContent,
    setFeaturedImageFile,
    setFeaturedImageAlt,
    setCategoryId,
    setTags,
    setPublished,
    setPublishDate,
    setPublishNow,

    // actions
    submit,
  }
}
