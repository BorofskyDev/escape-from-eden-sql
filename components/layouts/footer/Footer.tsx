// components/layout/footer/Footer.tsx

import { FooterLegal, FooterMedia, FooterNav } from './footer-components'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <FooterNav />
      <FooterMedia />
      <FooterLegal />
    </footer>
  )
}
