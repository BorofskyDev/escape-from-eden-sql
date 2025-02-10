'use client'

import Modal from '../Modal'

// For now, no real functionality. Just placeholders
interface CreatePostModalProps {
  open: boolean
  onClose: () => void
  // Optional: origin, if you want the fancy "zoom from click" effect
  origin?: { x: number; y: number }
}

export default function CreatePostModal({
  open,
  onClose,
  origin,
}: CreatePostModalProps) {
  return (
    <Modal open={open} onClose={onClose} origin={origin}>
      <div className='flex flex-col gap-4'>
        <h2 className='text-xl font-semibold'>Create a New Post</h2>

        {/* Title */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Title
          </label>
          <input
            type='text'
            className='mt-1 block w-full border rounded p-2'
            placeholder='Enter post title'
            // No onChange since we're ignoring logic for now
          />
        </div>

        {/* Description */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <textarea
            className='mt-1 block w-full border rounded p-2'
            rows={2}
            placeholder='Enter a short post description'
          />
        </div>

        {/* Content */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Content
          </label>
          <textarea
            className='mt-1 block w-full border rounded p-2'
            rows={4}
            placeholder='Write your blog post content here...'
          />
        </div>

        {/* Category (Single) */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Category
          </label>
          <select className='mt-1 block w-full border rounded p-2'>
            <option value=''>Select a Category</option>
            {/* Future: Map categories from DB */}
          </select>
        </div>

        {/* Tags (Multiple) */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Tags
          </label>
          <input
            type='text'
            className='mt-1 block w-full border rounded p-2'
            placeholder='Comma-separated tags'
          />
        </div>

        {/* Published checkbox */}
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            className='h-4 w-4'
            // No onChange for now
          />
          <label className='text-sm font-medium text-gray-700'>Published</label>
        </div>

        {/* Slug */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Slug
          </label>
          <input
            type='text'
            className='mt-1 block w-full border rounded p-2'
            placeholder='Unique slug (e.g., my-first-post)'
          />
        </div>

        {/* Placeholder for Submit and Cancel (no real logic yet) */}
        <div className='flex justify-end gap-2 mt-4'>
          <button
            className='bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'
            // On future: handle form submission
          >
            Create
          </button>
        </div>
      </div>
    </Modal>
  )
}
