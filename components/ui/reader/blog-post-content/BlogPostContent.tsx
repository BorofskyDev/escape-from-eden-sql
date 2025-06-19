'use client'

import React, { useState, useMemo } from 'react'
import parse, { Element } from 'html-react-parser'
import FootnoteReaderModal from '@/components/ui/modals/FootnoteReaderModal'
import styles from './BlogPostContent.module.scss'

interface FootnoteData {
  title: string
  content: string
}

interface BlogPostReaderContentProps {
  html: string
}

export function BlogPostReaderContent({
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
                color: 'var(--text)',
                marginLeft: '1px',
              }}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'var(--text-secondary)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'var(--text)')
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
    <div className={styles.blogPostContent}>
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
