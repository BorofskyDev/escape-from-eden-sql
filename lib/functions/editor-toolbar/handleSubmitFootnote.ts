import { Editor } from '@tiptap/react'

export function handleSubmitFootnote(
  editor: Editor,
  isEditing: boolean,
  title: string,
  content: string
) {
  editor.chain().focus()

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
}
