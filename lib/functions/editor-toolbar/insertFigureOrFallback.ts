import type { Editor } from '@tiptap/core'

export type FigureAttrs = {
  src: string
  alt: string
  title?: string | null
  caption?: string | null
}

/**
 * Insert our figure node if present; otherwise insert a plain image and (optional) caption paragraph.
 * Creates a fresh chain for each run to avoid mismatched transactions.
 */
export function insertFigureOrFallback(editor: Editor, attrs: FigureAttrs) {
  const { src, alt, title, caption } = attrs
  if (!src || !alt) return

  const hasFigure =
    !!editor.schema.nodes['figureImage'] ||
    editor.extensionManager.extensions.some((e) => e.name === 'figureImage')

  if (hasFigure) {
    editor
      .chain()
      .focus()
      .insertContent({
        type: 'figureImage',
        attrs: { src, alt, title: title ?? null, caption: caption ?? null },
      })
      .run()
    return
  }

  // Fallback path (no custom node registered)
  editor
    .chain()
    .focus()
    .setImage({ src, alt, title: title ?? undefined })
    .run()

  if (caption) {
    editor
      .chain()
      .focus()
      .insertContent({
        type: 'paragraph',
        content: [{ type: 'text', text: caption }],
      })
      .run()
  }
}
