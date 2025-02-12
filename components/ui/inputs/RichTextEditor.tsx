'use client'

import React, { useRef, ChangeEvent } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'

interface RichTextEditorProps {
  onChange?: (html: string) => void
  initialHTML?: string
}

export default function RichTextEditor({
  onChange,
  initialHTML,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false }), Image],
    content: initialHTML || '<p></p>',
    editorProps: {
      attributes: {
        class: 'h-40 prose prose-sm lg:prose-lg mx-auto focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      if (onChange) {
        onChange(html)
      }
    },
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      const file = files[0]
      const url = URL.createObjectURL(file)
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }

  const handleAddLink = () => {
    const url = window.prompt('Enter URL')
    if (url) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    }
  }

  if (!editor) return null

  return (
    <div>
      {/* Toolbar */}
      <div className='flex flex-wrap gap-2 mb-2'>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBold().run()}
          className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
        >
          Bold
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
        >
          Italic
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
        >
          Strike
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleCode().run()}
          className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
        >
          Code
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().setParagraph().run()}
          className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
        >
          Paragraph
        </button>
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <button
            type='button'
            key={level}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()
            }
            className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
          >
            H{level}
          </button>
        ))}
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
        >
          Bullet List
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
        >
          Ordered List
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
        >
          Code Block
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
        >
          Blockquote
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
        >
          Hard Break
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().undo().run()}
          className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
        >
          Undo
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().redo().run()}
          className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
        >
          Redo
        </button>
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
        <button
          type='button'
          onClick={handleAddLink}
          className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
        >
          Link
        </button>
      </div>
      {/* Editor Content */}
      <EditorContent editor={editor} className='border rounded p-4 h-96 overflow-auto' />
    </div>
  )
}
