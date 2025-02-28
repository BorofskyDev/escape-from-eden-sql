// CitationFieldTypes.ts

export interface CitationField {
  id: string
  name: string
  type: 'text' | 'link'
  value: string

  // Additional metadata for styling / punctuation
  punctuationAfter?: string // e.g. ',', '.', '(', ')', or ''
  format?: 'none' | 'italic' | 'bold' | 'underline'
}

export interface CitationData {
  citationId?: string
  styleName?: string
  fields: CitationField[]
}

/**
 * If you want ephemeral "saved styles" only for this post
 */
export interface SavedStyles {
  [styleLabel: string]: Omit<CitationField, 'value'>[]
}
