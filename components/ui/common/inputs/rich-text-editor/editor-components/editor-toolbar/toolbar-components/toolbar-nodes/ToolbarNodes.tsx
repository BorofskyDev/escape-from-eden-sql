'use client'

import React from 'react'
import { Editor } from '@tiptap/core'
import { ToolbarButton } from '@/components/ui/common/buttons'
import { focusEditor } from '@/lib/functions/editor-toolbar'
import FootnoteModal from '@/components/ui/modals/FootnoteModal'
import ImageDetailsModal from '@/components/ui/modals/image-detail-modal/ImageDetailModal'

interface ToolbarNodesProps {
  editor: Editor
  // Image props
  openFilePicker: () => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isUploading: boolean
  showImageModal: boolean
  onSubmitImage: (data: { alt: string; caption?: string | null }) => void
  closeImageModal: () => void
  // Link
  handleAddLink: () => void
  // Footnotes
  handleNewFootnote: () => void
  handleEditFootnote: () => void
  showFootnoteModal: boolean
  closeFootnoteModal: () => void
  initialTitle?: string
  initialContent?: string
  handleSubmitFootnoteWrapper: (title: string, content: string) => void
}

export function ToolbarNodes({
  editor,
  openFilePicker,
  fileInputRef,
  onFileChange,
  isUploading,
  showImageModal,
  onSubmitImage,
  closeImageModal,
  handleAddLink,
  handleNewFootnote,
  handleEditFootnote,
  showFootnoteModal,
  closeFootnoteModal,
  initialTitle,
  initialContent,
  handleSubmitFootnoteWrapper,
}: ToolbarNodesProps) {
  return (
    <>
      {/* Undo/Redo */}
      <ToolbarButton onClick={() => focusEditor(editor).undo().run()}>
        Undo
      </ToolbarButton>
      <ToolbarButton onClick={() => focusEditor(editor).redo().run()}>
        Redo
      </ToolbarButton>

      {/* Media */}
      <ToolbarButton onClick={openFilePicker}>
        {isUploading ? 'Uploading…' : 'Image'}
      </ToolbarButton>
      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        onChange={onFileChange}
        style={{ display: 'none' }}
      />

      {/* Link */}
      <ToolbarButton onClick={handleAddLink}>Link</ToolbarButton>

      {/* Footnotes */}
      <ToolbarButton onClick={handleNewFootnote}>New Footnote</ToolbarButton>
      <ToolbarButton onClick={handleEditFootnote}>Edit Footnote</ToolbarButton>

      {/* Modals */}
      {showFootnoteModal && (
        <FootnoteModal
          open={showFootnoteModal}
          onClose={closeFootnoteModal}
          initialTitle={initialTitle}
          initialContent={initialContent}
          onSubmitFootnote={handleSubmitFootnoteWrapper}
        />
      )}

      {showImageModal && (
        <ImageDetailsModal
          open={showImageModal}
          onClose={closeImageModal}
          onSubmit={onSubmitImage}
        />
      )}
    </>
  )
}
