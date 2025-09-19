import { Node, mergeAttributes } from '@tiptap/core'

export interface FigureImageAttrs {
  src: string
  alt: string
  title?: string | null
  caption?: string | null
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    figureImage: {
      /**
       * Insert a figure-image node
       */
      setFigureImage: (attrs: FigureImageAttrs) => ReturnType
      /**
       * Update attributes of the currently selected figure-image node
       */
      updateFigureImage: (attrs: Partial<FigureImageAttrs>) => ReturnType
    }
  }
}

/**
 * Renders: <figure data-type="figure-image"><img ... /><figcaption>...</figcaption></figure>
 * - `alt` is required (default '')
 * - `caption` is optional (string attribute; not editable inline as separate node)
 * - This is an atom so users don’t accidentally “type into” the figure; caption edited via UI
 */
export const CustomImageWithCaption = Node.create({
  name: 'figureImage',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      src: {
        default: '',
        parseHTML: (el: HTMLElement) =>
          el.querySelector('img')?.getAttribute('src') || '',
      },
      alt: {
        default: '',
        parseHTML: (el: HTMLElement) =>
          el.querySelector('img')?.getAttribute('alt') || '',
      },
      title: {
        default: null,
        parseHTML: (el: HTMLElement) =>
          el.querySelector('img')?.getAttribute('title'),
      },
      caption: {
        default: null,
        parseHTML: (el: HTMLElement) => {
          const cap = el.querySelector('figcaption')
          if (!cap) return null
          // Keep plain text; if you want HTML, switch to innerHTML (and sanitize)
          return cap.textContent || null
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'figure[data-type="figure-image"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const { src, alt, title, caption } = HTMLAttributes as FigureImageAttrs

    const imgAttrs = mergeAttributes({ src, alt }, title ? { title } : {})

    return [
      'figure',
      { 'data-type': 'figure-image' },
      ['img', imgAttrs],
      ['figcaption', {}, caption || ''],
    ]
  },

  addCommands() {
    return {
      setFigureImage:
        (attrs: FigureImageAttrs) =>
        ({ chain }) => {
          if (!attrs?.src || !attrs?.alt) return false
          return chain().focus().insertContent({ type: this.name, attrs }).run()
        },

      updateFigureImage:
        (attrs: Partial<FigureImageAttrs>) =>
        ({ chain }) =>
          chain().focus().updateAttributes(this.name, attrs).run(),
    }
  },
})
