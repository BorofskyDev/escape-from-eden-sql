'use client'

import React from 'react'
import { Editor } from '@tiptap/core'
import { ToolbarButton } from '@/components/ui/common/buttons'
import { focusEditor } from '@/lib/functions/editor-toolbar'

interface Props {
  editor: Editor
}

export function ToolbarTextBtns({ editor }: Props) {
  return (
    <>
      {/* Text Styles */}
      <ToolbarButton onClick={() => focusEditor(editor).toggleBold().run()}>
        <b>B</b>
      </ToolbarButton>
      <ToolbarButton onClick={() => focusEditor(editor).toggleItalic().run()}>
        <i>I</i>
      </ToolbarButton>
      <ToolbarButton onClick={() => focusEditor(editor).toggleStrike().run()}>
        <s>S</s>
      </ToolbarButton>
      <ToolbarButton onClick={() => focusEditor(editor).toggleCode().run()}>
        Inline Code
      </ToolbarButton>

      {/* Headings */}
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
    </>
  )
}
