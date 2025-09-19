// lib/hooks/useHeaderHeight.ts
'use client'

import * as React from 'react'

export function useHeaderHeight(headerSelector: string = '#site-header') {
  const [height, setHeight] = React.useState(0)

  React.useEffect(() => {
    const header = document.querySelector<HTMLElement>(headerSelector)
    if (!header) return

    const update = () => setHeight(header.getBoundingClientRect().height)

    update()

    const ro = new ResizeObserver(update)
    ro.observe(header)

    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [headerSelector])

  return height
}
