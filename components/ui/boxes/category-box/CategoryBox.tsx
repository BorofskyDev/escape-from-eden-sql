import Link from 'next/link'
import styles from './CategoryBox.module.scss'

interface CategoryBoxProps {
  categoryName: string
  categoryId: string
  className?: string
}

export function CategoryBox({
  categoryName,
  categoryId,
  className,
}: CategoryBoxProps) {
  return (
    <Link
      href={`/categories/${categoryId ?? 'unknown'}`}
      className={`${styles.categoryBox} ${className}`}
    >
      {categoryName}
    </Link>
  )
}
