'use client'

import { EditorContent } from '@tiptap/react'
import { useEditorContext } from './EditorProvider'

export default function EditorCanvas() {
  const { editor } = useEditorContext()

  if (!editor) return null

  return (
    <EditorContent
      editor={editor}
      className='editorCanvas border rounded py-4 px-10 h-dvh overflow-auto'
    />
  )
}
