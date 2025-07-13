import { Editor } from '@tiptap/react'

export function focusEditor(editor: Editor) {
  return editor.chain().focus()
}
