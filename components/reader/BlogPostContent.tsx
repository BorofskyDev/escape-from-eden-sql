'use client'
import React, { useState, useMemo, useEffect } from 'react'
import parse, { Element } from 'html-react-parser'
import CitationReaderModal, {
  CitationData,
} from '@/components/modals/CitationReaderModal'

interface BlogPostReaderContentProps {
  html: string // sanitized HTML
}

export default function BlogPostReaderContent({
  html,
}: BlogPostReaderContentProps) {
  const [citations, setCitations] = useState<CitationData[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Extract citations with useEffect
  useEffect(() => {
    const foundCitations: CitationData[] = []
    parse(html, {
      replace: (domNode) => {
        if (
          domNode instanceof Element &&
          domNode.name === 'span' &&
          domNode.attribs?.['data-citation']
        ) {
          try {
            const data: CitationData = JSON.parse(
              domNode.attribs['data-citation']
            )
            foundCitations.push(data)
          } catch {
            foundCitations.push({ fields: [] })
          }
        }
      },
    })
    setCitations(foundCitations)
  }, [html])

  // Transform content – we only do element replacement here without side effects
  const transformedContent = useMemo(() => {
    let citationCounter = 0
    return parse(html, {
      replace: (domNode) => {
        if (
          domNode instanceof Element &&
          domNode.name === 'span' &&
          domNode.attribs?.['data-citation']
        ) {
          const index = citationCounter
          citationCounter++
          return (
            <sup
              style={{
                cursor: 'pointer',
                color: 'var(--primary)',
                marginLeft: '2px',
              }}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'var(--secondary)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'var(--primary)')
              }
            >
              {index + 1}
            </sup>
          )
        }
      },
    })
  }, [html])

  return (
    <div>
      {transformedContent}
      {activeIndex !== null && citations[activeIndex] && (
        <CitationReaderModal
          open={true}
          citationIndex={activeIndex}
          citationData={citations[activeIndex]}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </div>
  )
}
