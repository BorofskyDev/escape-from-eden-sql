'use client'

import React, { useState, useRef } from 'react'
import { useEditorContext } from './EditorProvider'
import CitationAuthorModal from '@/components/modals/CitationAuthorModal'
import { CitationData } from '@/lib/types/citationFieldTypes'
import { EditorState } from '@tiptap/pm/state'
import { Node as PMNode } from 'prosemirror-model'

function getCitationNodeInSelection(
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

interface SavedStyles {
  [styleLabel: string]: { id: string; name: string; type: 'text' | 'link' }[]
}

export default function EditorToolbar() {
  const { editor, handleAddImage, handleAddLink } = useEditorContext()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Control the citation modal
  const [showCitationModal, setShowCitationModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [initialData, setInitialData] = useState<CitationData | undefined>(
    undefined
  )

  // "Saved styles" that are only for this particular post (session-level).
  const [savedStyles, setSavedStyles] = useState<SavedStyles>({})

  if (!editor) return null

  const focusEditor = () => editor.chain().focus()

  const handleNewCitation = () => {
    setIsEditing(false)
    // Force the modal to be blank
    setInitialData(undefined)
    setShowCitationModal(true)
  }

  const handleEditCitation = () => {
    const found = getCitationNodeInSelection(editor.state, 'citation')
    if (!found) {
      alert('No citation node found in selection to edit!')
      return
    }
    const nodeData = (found.node.attrs as { citationData: CitationData })
      .citationData
    setIsEditing(true)
    setInitialData(nodeData)
    setShowCitationModal(true)
  }

  const handleSubmitCitation = (data: CitationData) => {
    focusEditor()
    if (isEditing) {
      editor.chain().updateCitation({ citationData: data }).run()
    } else {
      editor.chain().addCitation({ citationData: data }).run()
    }
    setShowCitationModal(false)
  }

  // If the user saves a new style in the modal, update local state
  const handleUpdateStyles = (updated: SavedStyles) => {
    setSavedStyles(updated)
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

      {/* Citation Buttons */}
      <button
        type='button'
        onClick={handleNewCitation}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        New Citation
      </button>
      <button
        type='button'
        onClick={handleEditCitation}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        Edit Citation
      </button>

      {/* Link */}
      <button
        type='button'
        onClick={handleAddLink}
        className='px-2 py-1 border rounded text-sm hover:bg-gray-200'
      >
        Link
      </button>

      {/* Citation Modal */}
      <CitationAuthorModal
        open={showCitationModal}
        onClose={() => setShowCitationModal(false)}
        initialData={initialData}
        onSubmitCitation={handleSubmitCitation}
        savedStyles={savedStyles} // pass our local post-level styles
        onUpdateStyles={handleUpdateStyles}
      />
    </div>
  )
}
