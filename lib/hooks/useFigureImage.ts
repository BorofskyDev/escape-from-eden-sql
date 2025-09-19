'use client'

import { useRef, useState } from 'react'
import type { Editor } from '@tiptap/core'
import { insertFigureOrFallback } from '@/lib/functions'

export type ImageUploadFn = (file: File) => Promise<string> | string

type UseFigureImageOptions = {
  /**
   * Provide your uploader (returns a public URL). If omitted, falls back to URL.createObjectURL.
   */
  uploadImage?: ImageUploadFn
}

export function useFigureImage(
  editor: Editor | null,
  opts: UseFigureImageOptions = {}
) {
  const { uploadImage } = opts

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [pendingSrc, setPendingSrc] = useState<string | null>(null)
  const [pendingTitle, setPendingTitle] = useState<string | null>(null)

  const openFilePicker = () => fileInputRef.current?.click()

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = '' // allow reselection of the same file
    if (!file) return
    setIsUploading(true)
    try {
      const url = uploadImage
        ? await Promise.resolve(uploadImage(file))
        : URL.createObjectURL(file)
      setPendingSrc(url)
      setPendingTitle(file.name)
      setShowImageModal(true)
    } finally {
      setIsUploading(false)
    }
  }

  function onSubmitImage({
    alt,
    caption,
  }: {
    alt: string
    caption?: string | null
  }) {
    if (!editor || !pendingSrc) {
      setShowImageModal(false)
      return
    }

    // If selection is in a code block (or similar), exit first to a valid position.
    if (editor.isActive('codeBlock')) editor.commands.exitCode()

    insertFigureOrFallback(editor, {
      src: pendingSrc,
      alt: alt || '',
      title: pendingTitle ?? null,
      caption: caption ?? null,
    })

    // Optional: place cursor after inserted block
    editor.commands.setTextSelection(editor.state.selection.to)

    // cleanup
    setShowImageModal(false)
    setPendingSrc(null)
    setPendingTitle(null)
  }

  function closeImageModal() {
    setShowImageModal(false)
  }

  return {
    // state/refs
    fileInputRef,
    showImageModal,
    isUploading,

    // actions
    openFilePicker,
    onFileChange,
    onSubmitImage,
    closeImageModal,
  }
}
