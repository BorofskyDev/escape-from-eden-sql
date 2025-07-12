// components/ui/inputs/SlugGenerator.tsx


import styles from './SlugGenerator.module.scss'

interface SlugGeneratorProps {
  title: string
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ /g, '-') // Convert spaces to hyphens
    .replace(/'/g, '-') // Convert apostrophes to hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove all other characters
}

export function SlugGenerator({ title }: SlugGeneratorProps) {
  const slug = generateSlug(title)
  return (
    <div className={styles.slugGenerator}>
      <label className={styles.label}>Slug</label>
      <input
        type='text'
        value={slug}
        readOnly
        className={styles.userInput}
      />
    </div>
  )
}
