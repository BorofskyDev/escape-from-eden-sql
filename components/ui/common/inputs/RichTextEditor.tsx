'use client'

import React from 'react'
import { EditorProvider } from './editor-components/EditorProvider'
import EditorToolbar from './editor-components/EditorToolbar'
import EditorCanvas from './editor-components/EditorCanvas'

interface RichTextEditorProps {
  onChange?: (html: string) => void
  initialHTML?: string
}

export default function RichTextEditor({
  onChange,
  initialHTML,
}: RichTextEditorProps) {
  return (
    <EditorProvider initialHTML={initialHTML} onChange={onChange}>
      <div>
        <EditorToolbar />
        <EditorCanvas />
      </div>
    </EditorProvider>
  )
}
