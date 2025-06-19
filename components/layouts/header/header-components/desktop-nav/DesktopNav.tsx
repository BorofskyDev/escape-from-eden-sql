import { TextLink } from '@/components/ui/common'
import styles from './DesktopNav.module.scss'

export function DesktopNav() {
  return (
    <nav className={styles.desktopNav}>
      <TextLink href='/'>Home</TextLink>
      <TextLink href='/search'>Search</TextLink>
      <TextLink href='/about'>About</TextLink>
      <TextLink href='/contact'>Contact</TextLink>
    </nav>
  )
}
