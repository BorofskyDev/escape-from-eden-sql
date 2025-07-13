import styles from './ToolbarButton.module.scss'

interface ToolbarButtonProps {
  onClick: () => void
  children: React.ReactNode
}

export function ToolbarButton({ onClick, children }: ToolbarButtonProps) {
  return (
    <button type='button' onClick={onClick} className={styles.toolbarButton}>
      {children}
    </button>
  )
}
