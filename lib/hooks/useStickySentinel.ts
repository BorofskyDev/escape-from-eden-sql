// lib/hooks/useStickySentinel.ts
'use client'

import * as React from 'react'

export function useStickySentinel() {
  const sentinelRef = React.useRef<HTMLDivElement | null>(null)
  const [isStuck, setIsStuck] = React.useState(false)

  React.useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        // If the sentinel is NOT intersecting (scrolled past), toolbar is stuck
        setIsStuck(!entry.isIntersecting)
      },
      { rootMargin: '0px', threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { sentinelRef, isStuck }
}
