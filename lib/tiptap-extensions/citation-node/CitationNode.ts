// lib/tiptap-extensions/citation-node/CitationNode.ts
import { Node, mergeAttributes, CommandProps } from '@tiptap/core'
import { Node as ProseMirrorNode } from 'prosemirror-model'
import { v4 as uuidv4 } from 'uuid'

/** Represents one named field (e.g., "Author", "Title", "URL") */
export interface CitationField {
  id: string
  name: string
  /** Added type property for better handling of link citations */
  type?: 'text' | 'link'
  value: string
}

/** The core data we store in node.attrs.citationData */
export interface CitationData {
  citationId?: string // unique ID for reference
  styleName?: string // optional label or style
  fields: CitationField[] // unlimited custom fields
}

/** If your Tiptap commands pass partial data, we use this for creation/update */
export interface CitationNodeAttributes {
  citationData: CitationData
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    citationNode: {
      /**
       * Insert a new citation node at the selection.
       * If partial data is given, we fill in defaults (new ID, empty fields, etc.).
       */
      addCitation: (attrs?: Partial<CitationNodeAttributes>) => ReturnType

      /**
       * Update an existing citation node if the selection/cursor is inside one.
       */
      updateCitation: (attrs: Partial<CitationNodeAttributes>) => ReturnType
    }
  }
}

/**
 * Helper to scan the doc selection range. If we find a node named `nodeName`,
 * we return the first match (node + position). Otherwise return null.
 */
function getCitationNodeInSelection(
  props: CommandProps,
  nodeName: string
): { pos: number; node: ProseMirrorNode } | null {
  const { state } = props
  const { from, to } = state.selection
  let foundNode: { pos: number; node: ProseMirrorNode } | null = null

  state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.type.name === nodeName) {
      foundNode = { node, pos }
      return false // stop searching once found
    }
  })
  return foundNode
}

export const CitationNode = Node.create({
  name: 'citation',

  inline: true,
  group: 'inline',
  draggable: false,

  // The node's single attribute: `citationData`.
  addAttributes() {
    return {
      citationData: {
        default: {
          citationId: '',
          styleName: '',
          fields: [],
        } as CitationData,

        parseHTML: (element: Element) => {
          const domElement = element as HTMLElement
          const data = domElement.getAttribute('data-citation')
          if (data) {
            try {
              return JSON.parse(data)
            } catch (error) {
              console.warn('Failed to parse data-citation JSON:', error)
            }
          }
          return {
            citationId: '',
            styleName: '',
            fields: [],
          }
        },

        renderHTML: (attributes) => {
          return {
            'data-citation': JSON.stringify(attributes.citationData),
          }
        },
      },
    }
  },

  // Tiptap uses this to parse existing HTML (like <span data-citation="...">).
  parseHTML() {
    return [{ tag: 'span[data-citation]' }]
  },

  // How the node appears inline in the editor UI
  renderHTML({ node, HTMLAttributes }) {
    const data = (node.attrs as { citationData: CitationData }).citationData
    let displayText: string = '[CITATION]'

    if (data.fields && data.fields.length > 0) {
      const firstField = data.fields[0]
      if (firstField.type === 'link') {
        try {
          // Parse the value which should be a JSON string containing { title, href }
          const linkData = JSON.parse(firstField.value)
          // Create a clickable link. Note that downstream processing must allow HTML.
          displayText = `<a href="${linkData.href}" target="_blank" rel="noopener noreferrer">${linkData.title}</a>`
        } catch {
          displayText = `[CITE: ${firstField.value || '???'}]`
        }
      } else {
        displayText = `[CITE: ${firstField.value || '???'}]`
      }
    } else if (data.styleName) {
      displayText = `[CITE: ${data.styleName}]`
    }

    return [
      'span',
      mergeAttributes(HTMLAttributes, { class: 'tiptap-citation-node' }),
      displayText,
    ]
  },

  // Our custom Tiptap commands
  addCommands() {
    return {
      addCitation:
        (attrs) =>
        ({ chain }) => {
          const citationData: CitationData = {
            citationId: uuidv4(),
            styleName: attrs?.citationData?.styleName || '',
            fields: attrs?.citationData?.fields || [],
          }
          return chain()
            .insertContent({
              type: this.name,
              attrs: { citationData },
            })
            .run()
        },

      updateCitation: (attrs) => (props) => {
        const { state, dispatch } = props
        const found = getCitationNodeInSelection(props, this.name)
        if (!found) {
          console.warn('No citation node found in selection to update.')
          return false
        }

        const { node, pos } = found
        const existingData = (node.attrs as { citationData: CitationData })
          .citationData

        const newCitationData: CitationData = {
          ...existingData,
          ...attrs.citationData,
          // If fields is provided, it overwrites existing fields
          fields: attrs.citationData?.fields ?? existingData.fields,
          citationId:
            attrs.citationData?.citationId ||
            existingData.citationId ||
            uuidv4(),
        }

        const tr = state.tr.setNodeMarkup(pos, state.schema.nodes.citation, {
          citationData: newCitationData,
        })

        if (dispatch) {
          dispatch(tr)
        }

        return true
      },
    }
  },
})
