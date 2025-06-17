'use client'

import React, { useState, useMemo } from 'react'
import parse, { Element } from 'html-react-parser'
import FootnoteReaderModal from '@/components/modals/FootnoteReaderModal'

interface FootnoteData {
  title: string
  content: string
}

interface BlogPostReaderContentProps {
  html: string
}

export default function BlogPostReaderContent({
  html,
}: BlogPostReaderContentProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Extract all footnotes into an array.
  const footnotes = useMemo(() => {
    const result: FootnoteData[] = []
    parse(html, {
      replace: (domNode) => {
        if (
          domNode instanceof Element &&
          domNode.name === 'span' &&
          'data-footnote' in domNode.attribs
        ) {
          const title = domNode.attribs['data-footnote-title'] || ''
          const content = domNode.attribs['data-footnote-content'] || ''
          result.push({ title, content })
        }
      },
    })
    return result
  }, [html])

  // Replace each footnote node with a superscript number.
  const transformedContent = useMemo(() => {
    let counter = 0
    return parse(html, {
      replace: (domNode) => {
        if (
          domNode instanceof Element &&
          domNode.name === 'span' &&
          'data-footnote' in domNode.attribs
        ) {
          const index = counter
          counter++
          return (
            <sup
              key={index}
              style={{
                cursor: 'pointer',
                fontSize: '0.75rem',
                verticalAlign: 'super',
                color: 'var(--primary)',
                marginLeft: '1px',
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
      {activeIndex !== null && footnotes[activeIndex] && (
        <FootnoteReaderModal
          open={true}
          footnoteIndex={activeIndex}
          footnoteData={footnotes[activeIndex]}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </div>
  )
}
