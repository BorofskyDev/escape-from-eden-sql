// EditorToolbar.tsx
'use client'

import React, { useState, useRef } from 'react'
import { useEditorContext } from './EditorProvider'
import FootnoteModal from '@/components/modals/FootnoteModal'
import { EditorState } from '@tiptap/pm/state'
import { Node as PMNode } from 'prosemirror-model'

function getFootnoteNodeInSelection(
  state: EditorState,
  nodeName: string
): { pos: number; node: PMNode } | null {
  const { from, to } = state.selection
  let foundNode: { pos: number; node: PMNode } | null = null
  state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.type.name === nodeName) {
      foundNode = { node, pos }
      return false
    }
  })
  return foundNode
}

export default function EditorToolbar() {
  const { editor, handleAddImage, handleAddLink } = useEditorContext()

  const [showFootnoteModal, setShowFootnoteModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [initialTitle, setInitialTitle] = useState<string | undefined>(
    undefined
  )
  const [initialContent, setInitialContent] = useState<string | undefined>(
    undefined
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!editor) return null

  const focusEditor = () => editor.chain().focus()

  const handleNewFootnote = () => {
    setIsEditing(false)
    setInitialTitle(undefined)
    setInitialContent(undefined)
    setShowFootnoteModal(true)
  }

  const handleEditFootnote = () => {
    const found = getFootnoteNodeInSelection(editor.state, 'footnote')
    if (!found) {
      alert('No footnote node found in selection to edit!')
      return
    }
    const nodeTitle = found.node.attrs.title
    const nodeContent = found.node.attrs.content
    setIsEditing(true)
    setInitialTitle(nodeTitle)
    setInitialContent(nodeContent)
    setShowFootnoteModal(true)
  }

  const handleSubmitFootnote = (title: string, content: string) => {
    focusEditor()
    if (isEditing) {
      editor.commands.updateAttributes('footnote', { title, content })
    } else {
      editor
        .chain()
        .insertContent({
          type: 'footnote',
          attrs: { title, content },
        })
        .insertContent(' ')
        .run()
    }
    setShowFootnoteModal(false)
  }

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
          key={level}
          type='button'
          onClick={() =>
            focusEditor()
              .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
              .run()
          }
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

      {/* Footnote Buttons */}
      <button
        type='button'
        onClick={handleNewFootnote}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        New Footnote
      </button>
      <button
        type='button'
        onClick={handleEditFootnote}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        Edit Footnote
      </button>

      {/* Include FootnoteModal */}
      {showFootnoteModal && (
        <FootnoteModal
          open={showFootnoteModal}
          onClose={() => setShowFootnoteModal(false)}
          initialTitle={initialTitle}
          initialContent={initialContent}
          onSubmitFootnote={handleSubmitFootnote}
        />
      )}
    </div>
  )
}
