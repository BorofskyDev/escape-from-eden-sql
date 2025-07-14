'use client'

import React, { useState, useRef } from 'react'
import { useEditorContext } from '../EditorProvider'
import FootnoteModal from '@/components/ui/modals/FootnoteModal'
import { Heading } from '@/components/ui/common/typography'
import { ToolbarButton } from '@/components/ui/common/buttons'
import styles from './EditorToolbar.module.scss'

import {
  getFootnoteNodeInSelection,
  handleSubmitFootnote,
  focusEditor,
} from '@/lib/functions/editor-toolbar'

export function EditorToolbar() {
  const { editor, handleAddImage, handleAddLink } = useEditorContext()

  const [showFootnoteModal, setShowFootnoteModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [initialTitle, setInitialTitle] = useState<string | undefined>()
  const [initialContent, setInitialContent] = useState<string | undefined>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!editor) return null

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
    setIsEditing(true)
    setInitialTitle(found.node.attrs.title)
    setInitialContent(found.node.attrs.content)
    setShowFootnoteModal(true)
  }

  const handleSubmitFootnoteWrapper = (title: string, content: string) => {
    handleSubmitFootnote(editor, isEditing, title, content)
    setShowFootnoteModal(false)
  }

  return (
    <div className={styles.editorToolbar}>
      <Heading as='h3' size='section-sub'>
        Text Editor Toolbox
      </Heading>
      <div className={styles.toolbarButtons}>
        {/* Text Styles */}
        <ToolbarButton onClick={() => focusEditor(editor).toggleBold().run()}>
          Bold
        </ToolbarButton>
        <ToolbarButton onClick={() => focusEditor(editor).toggleItalic().run()}>
          Italic
        </ToolbarButton>
        <ToolbarButton
          onClick={() => focusEditor(editor).toggleUnderline().run()}
        >
          Underline
        </ToolbarButton>
        <ToolbarButton onClick={() => focusEditor(editor).toggleStrike().run()}>
          Strike
        </ToolbarButton>
        <ToolbarButton onClick={() => focusEditor(editor).toggleCode().run()}>
          Inline Code
        </ToolbarButton>

        {/* Headings */}
        <ToolbarButton onClick={() => focusEditor(editor).setParagraph().run()}>
          Paragraph
        </ToolbarButton>
        {[3, 4, 5, 6].map((level) => (
          <ToolbarButton
            key={level}
            onClick={() =>
              focusEditor(editor)
                .toggleHeading({ level: level as 3 | 4 | 5 | 6 })
                .run()
            }
          >
            H{level}
          </ToolbarButton>
        ))}

        {/* Lists */}
        <ToolbarButton
          onClick={() => focusEditor(editor).toggleBulletList().run()}
        >
          Bullet List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => focusEditor(editor).toggleOrderedList().run()}
        >
          Ordered List
        </ToolbarButton>

        {/* Blocks */}
        <ToolbarButton
          onClick={() => focusEditor(editor).toggleCodeBlock().run()}
        >
          Code Block
        </ToolbarButton>
        <ToolbarButton
          onClick={() => focusEditor(editor).toggleBlockquote().run()}
        >
          Blockquote
        </ToolbarButton>
        <ToolbarButton onClick={() => focusEditor(editor).setHardBreak().run()}>
          Hard Break
        </ToolbarButton>

        {/* Undo/Redo */}
        <ToolbarButton onClick={() => focusEditor(editor).undo().run()}>
          Undo
        </ToolbarButton>
        <ToolbarButton onClick={() => focusEditor(editor).redo().run()}>
          Redo
        </ToolbarButton>

        {/* Media */}
        <ToolbarButton onClick={() => fileInputRef.current?.click()}>
          Image
        </ToolbarButton>
        <input
          type='file'
          accept='image/*'
          ref={fileInputRef}
          onChange={handleAddImage}
          style={{ display: 'none' }}
        />

        {/* Link */}
        <ToolbarButton onClick={handleAddLink}>Link</ToolbarButton>

        {/* Footnotes */}
        <ToolbarButton onClick={handleNewFootnote}>New Footnote</ToolbarButton>
        <ToolbarButton onClick={handleEditFootnote}>
          Edit Footnote
        </ToolbarButton>

        {/* Modal */}
        {showFootnoteModal && (
          <FootnoteModal
            open={showFootnoteModal}
            onClose={() => setShowFootnoteModal(false)}
            initialTitle={initialTitle}
            initialContent={initialContent}
            onSubmitFootnote={handleSubmitFootnoteWrapper}
          />
        )}
      </div>
    </div>
  )
}
