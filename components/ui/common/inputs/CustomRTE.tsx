// components/ui/inputs/CustomRTE.tsx
'use client'

import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'

interface RichTextEditorProps {
  initialContent: string
  onChange: (html: string) => void
}

export default function CustomRTE({
  initialContent,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false }), Underline],
    content: initialContent,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  // Clean up editor on unmount
  useEffect(() => {
    return () => {
      editor?.destroy()
    }
  }, [editor])

  if (!editor) return null

  return (
    <div className='border p-2 rounded'>
      {/* Toolbar for formatting */}
      <div className='flex space-x-2 mb-2'>
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
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
        >
          Underline
        </button>
        <button
          type='button'
          onClick={() => {
            const url = window.prompt('Enter URL')
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
          className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
        >
          Link
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
