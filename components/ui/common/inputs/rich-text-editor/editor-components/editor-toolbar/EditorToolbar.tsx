'use client'

import React from 'react'
import { useEditorContext } from '../EditorProvider'
import { Heading } from '@/components/ui/common/typography'
import styles from './EditorToolbar.module.scss'
import {
  getFootnoteNodeInSelection,
  handleSubmitFootnote,
} from '@/lib/functions/editor-toolbar'
import {
  useFigureImage,
  useHeaderHeight,
  useStickySentinel,
} from '@/lib/hooks/'
import { ToolbarNodes, ToolbarTextBtns } from './toolbar-components'

export function EditorToolbar() {
  const { editor, handleAddLink } = useEditorContext()

  // Footnotes
  const [showFootnoteModal, setShowFootnoteModal] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState(false)
  const [initialTitle, setInitialTitle] = React.useState<string | undefined>()
  const [initialContent, setInitialContent] = React.useState<
    string | undefined
  >()

  // Images (hook)
  const {
    fileInputRef,
    showImageModal,
    isUploading,
    openFilePicker,
    onFileChange,
    onSubmitImage,
    closeImageModal,
  } = useFigureImage(editor /*, { uploadImage } */)

  const headerHeight = useHeaderHeight('#site-header')
  const { sentinelRef, isStuck } = useStickySentinel()

  if (!editor) return null

  // Footnote handlers
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
    <>
      <div ref={sentinelRef} aria-hidden></div>
      <div
        className={`${styles.stickyWrapper} ${isStuck ? styles.isStuck : ''}`}
        style={{ top: headerHeight || 0 }}
      >
        <div className={styles.editorToolbar}>
          <Heading as='h3' size='section-sub'>
            Text Editor Toolbox
          </Heading>

          <div className={styles.toolbarButtons}>
            <ToolbarTextBtns editor={editor} />

            <ToolbarNodes
              editor={editor}
              openFilePicker={openFilePicker}
              fileInputRef={fileInputRef}
              onFileChange={onFileChange}
              isUploading={isUploading}
              showImageModal={showImageModal}
              onSubmitImage={onSubmitImage}
              closeImageModal={closeImageModal}
              handleAddLink={handleAddLink}
              handleNewFootnote={handleNewFootnote}
              handleEditFootnote={handleEditFootnote}
              showFootnoteModal={showFootnoteModal}
              closeFootnoteModal={() => setShowFootnoteModal(false)}
              initialTitle={initialTitle}
              initialContent={initialContent}
              handleSubmitFootnoteWrapper={handleSubmitFootnoteWrapper}
            />
          </div>
        </div>
      </div>
    </>
  )
}
