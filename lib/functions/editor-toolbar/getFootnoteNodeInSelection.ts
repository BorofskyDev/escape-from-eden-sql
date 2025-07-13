import { EditorState } from '@tiptap/pm/state'
import { Node as PMNode } from 'prosemirror-model'

export function getFootnoteNodeInSelection(
  state: EditorState,
  nodeName: string
): { pos: number; node: PMNode } | null {
  const { from, to } = state.selection
  let foundNode: { pos: number; node: PMNode } | null = null
  state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.type.name === nodeName) {
      foundNode = { node, pos }
      return false
    }
  })
  return foundNode
}
