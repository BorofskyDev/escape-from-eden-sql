'use client'

import { EditorContent } from '@tiptap/react'
import { useEditorContext } from '../EditorProvider'
import styles from './EditorCanvas.module.scss'

export default function EditorCanvas() {
  const { editor } = useEditorContext()

  if (!editor) return null

  return <EditorContent editor={editor} className={styles.editorCanvas} />
}
