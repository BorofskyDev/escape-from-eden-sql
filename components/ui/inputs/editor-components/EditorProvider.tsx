'use client'

import React, {
  createContext,
  useContext,
  type ChangeEvent,
} from 'react'
import { useEditor, Editor} from '@tiptap/react'
import { CitationNode } from '@/lib/tiptap-extensions/citation-node/CitationNode'
import StarterKit from '@tiptap/starter-kit'
import LinkExtension from '@tiptap/extension-link'
import ImageExtension from '@tiptap/extension-image'

interface EditorContextProps {
  editor: Editor | null
  // Potentially put callbacks for image upload or link insertion here
  handleAddImage: (e: ChangeEvent<HTMLInputElement>) => void
  handleAddLink: () => void
}

const EditorContext = createContext<EditorContextProps>({
  editor: null,
  handleAddImage: () => {},
  handleAddLink: () => {},
})

export function useEditorContext() {
  return useContext(EditorContext)
}

interface EditorProviderProps {
  children: React.ReactNode
  initialHTML?: string
  onChange?: (html: string) => void
}

export function EditorProvider({
  children,
  initialHTML,
  onChange,
}: EditorProviderProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension,
      CitationNode
    ],
    content: initialHTML || '<p></p>',
    editorProps: {
      attributes: {
        class: 'h-40 prose prose-sm lg:prose-lg mx-auto focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange?.(html)
    },
  })

  // If you prefer, you can keep file input logic inside the provider, or move it to a dedicated component
  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (editor) {
      const files = e.target.files
      if (files && files[0]) {
        const file = files[0]
        const url = URL.createObjectURL(file)
        editor.chain().focus().setImage({ src: url }).run()
      }
    }
  }

  const handleAddLink = () => {
    if (!editor) return
    const url = window.prompt('Enter URL')
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    }
  }

  return (
    <EditorContext.Provider value={{ editor, handleAddImage, handleAddLink }}>
      {children}
    </EditorContext.Provider>
  )
}
