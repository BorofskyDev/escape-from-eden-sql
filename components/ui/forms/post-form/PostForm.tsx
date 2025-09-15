'use client'

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
import { usePostForm, type PostFormData } from '@/lib/hooks/usePostForm'

interface PostFormProps {
  mode: 'create' | 'edit'
  initialData?: PostFormData
  onSuccess?: () => void
}

export function PostForm(props: PostFormProps) {
  const {
    title,
    description,
    content,
    existingFeaturedImageUrl,
    featuredImageAlt,
    categoryId,
    tags,
    published,
    publishDate,
    hasAnyFeaturedImage,
    loading,
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
    submit,
  } = usePostForm(props)

  return (
    <div className={styles.postForm}>
      <FormField
        label='Title'
        placeholder='Enter post title'
        variant='input'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {props.mode === 'create' && <SlugGenerator title={title} />}

      <FormField
        label='Description'
        placeholder='Enter a short description'
        variant='textarea'
        rows={2}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <ImageInput
        label='Featured Image'
        width={400}
        height={250}
        existingImage={existingFeaturedImageUrl}
        onImageSelect={(file) => setFeaturedImageFile(file)}
      />

      <FormField
        label={`Featured Image Alt Text ${
          hasAnyFeaturedImage ? ' (required)' : ''
        }`}
        placeholder='Describe the image for screen readers…'
        variant='input'
        value={featuredImageAlt}
        onChange={(e) => setFeaturedImageAlt(e.target.value)}
      />

      <RichTextEditor
        onChange={(html) => setContent(html)}
        initialHTML={content}
      />

      <CategorySelector
        defaultCategoryId={categoryId}
        onSelect={(cat) => setCategoryId(cat?.id)}
      />

      <TagSelector
        defaultTagIds={tags}
        onChange={(updated) => setTags(updated.map((t) => t.id))}
      />

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
              onChange={(e) => setPublishDate(e.target.value)}
              className='border rounded p-1'
            />
            <ActionButton type='button' onClick={setPublishNow}>
              Publish Now
            </ActionButton>
          </div>
        )}
      </div>

      <div className={styles.actionButtons}>
        <LinkTag href='/admin'>Cancel</LinkTag>
        <ActionButton onClick={submit} disabled={loading}>
          {loading
            ? props.mode === 'create'
              ? 'Creating...'
              : 'Updating...'
            : props.mode === 'create'
            ? 'Create'
            : 'Update'}
        </ActionButton>
      </div>
    </div>
  )
}
