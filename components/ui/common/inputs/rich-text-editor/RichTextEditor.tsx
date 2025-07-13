'use client'

import React from 'react'
import { EditorProvider } from './editor-components/EditorProvider'
import { EditorCanvas, EditorToolbar } from './editor-components'

interface RichTextEditorProps {
  onChange?: (html: string) => void
  initialHTML?: string
}

export function RichTextEditor({ onChange, initialHTML }: RichTextEditorProps) {
  return (
    <EditorProvider initialHTML={initialHTML} onChange={onChange}>
      <div>
        <EditorToolbar />
        <EditorCanvas />
      </div>
    </EditorProvider>
  )
}
