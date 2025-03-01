// lib/tiptap-extensions/footnote-node/FootnoteNode.ts
import { Node, mergeAttributes, RawCommands, Editor } from '@tiptap/core'

type Chain = ReturnType<Editor['chain']>

export const FootnoteNode = Node.create({
  name: 'footnote',

  group: 'inline',
  inline: true,
  atom: true, // Treat as a single, indivisible unit.
  selectable: true, // Allow selection so it can be edited.

  addAttributes() {
    return {
      title: {
        default: '',
        parseHTML: (element: Element) =>
          element.getAttribute('data-footnote-title') || '',
        renderHTML: (attributes) => ({
          'data-footnote-title': attributes.title,
        }),
      },
      content: {
        default: '',
        parseHTML: (element: Element) =>
          element.getAttribute('data-footnote-content') || '',
        renderHTML: (attributes) => ({
          'data-footnote-content': attributes.content,
        }),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'span[data-footnote]' }]
  },

  renderHTML({ node, HTMLAttributes }) {
    // Only display the title in the main document.
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-footnote': '',
        class: 'footnote',
      }),
      node.attrs.title,
    ]
  },

  addCommands() {
    return {
      insertFootnote:
        (title: string, content: string) =>
        ({ chain }: { chain: Chain }) => {
          return (
            chain
              .insertContent({
                type: this.name,
                attrs: { title, content },
              })
              // Insert a trailing space so the node isn’t stuck to adjacent text.
              .insertContent(' ')
              .run()
          )
        },
      updateFootnote:
        (title: string, content: string) =>
        ({
          commands,
        }: {
          commands: {
            updateAttributes: (
              name: string,
              attrs: { title: string; content: string }
            ) => boolean
          }
        }) => {
          return commands.updateAttributes(this.name, { title, content })
        },
    } as Partial<RawCommands>
  },
})
