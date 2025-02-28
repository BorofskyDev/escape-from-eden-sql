'use client'

import React, { useRef } from 'react'
import { useEditorContext } from './EditorProvider'

export default function EditorToolbar() {
  const { editor, handleAddImage, handleAddLink } = useEditorContext()
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!editor) return null

  const focusEditor = () => editor.chain().focus()

  return (
    <div className='flex flex-wrap gap-2 mb-2'>
      {/* Basic text formatting */}
      <button
        type='button'
        onClick={() => focusEditor().toggleBold().run()}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        Bold
      </button>
      <button
        type='button'
        onClick={() => focusEditor().toggleItalic().run()}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        Italic
      </button>
      <button
        type='button'
        onClick={() => focusEditor().toggleStrike().run()}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        Strike
      </button>
      <button
        type='button'
        onClick={() => focusEditor().toggleCode().run()}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        Inline Code
      </button>

      {/* Paragraph / Headings */}
      <button
        type='button'
        onClick={() => focusEditor().setParagraph().run()}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        Paragraph
      </button>
      {[1, 2, 3, 4, 5, 6].map((level) => (
        <button
          type='button'
          key={level}
          onClick={() => focusEditor().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()}
          className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
        >
          H{level}
        </button>
      ))}

      {/* Lists */}
      <button
        type='button'
        onClick={() => focusEditor().toggleBulletList().run()}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        Bullet List
      </button>
      <button
        type='button'
        onClick={() => focusEditor().toggleOrderedList().run()}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        Ordered List
      </button>

      {/* Blockquote, Code Block, Hard Break */}
      <button
        type='button'
        onClick={() => focusEditor().toggleCodeBlock().run()}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        Code Block
      </button>
      <button
        type='button'
        onClick={() => focusEditor().toggleBlockquote().run()}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        Blockquote
      </button>
      <button
        type='button'
        onClick={() => focusEditor().setHardBreak().run()}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        Hard Break
      </button>

      {/* Undo / Redo */}
      <button
        type='button'
        onClick={() => focusEditor().undo().run()}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        Undo
      </button>
      <button
        type='button'
        onClick={() => focusEditor().redo().run()}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        Redo
      </button>

      {/* Image Upload */}
      <button
        type='button'
        onClick={() => fileInputRef.current?.click()}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        Image
      </button>
      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        onChange={handleAddImage}
        style={{ display: 'none' }}
      />

      {/* Link */}
      <button
        type='button'
        onClick={handleAddLink}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        Link
      </button>
    </div>
  )
}
