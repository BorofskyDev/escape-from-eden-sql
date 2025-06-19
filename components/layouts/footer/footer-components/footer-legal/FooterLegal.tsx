import { Heading, TextLink } from "@/components/ui/common";
import styles from './FooterLegal.module.scss'


export function FooterLegal() {
    return (
      <div className={styles.footerLegal}>
        <Heading as='h3' size='container' >Legal</Heading>
        <ul className={styles.footerLegal__list}>
          <li>
            <TextLink href='/privacy-policy'>Privacy Policy</TextLink>
          </li>
          <li>
            <TextLink href='/cookies-policy'>Cookies</TextLink>
          </li>
          <li>
            <TextLink href='/terms'>Terms and Agreement</TextLink>
          </li>
          <li>
            <TextLink href='/accessibility'>Accessibility Statement</TextLink>
          </li>
          <li>
            <TextLink href='/copyright-notice'>Copyright Notice</TextLink>
          </li>
        </ul>
      </div>
    )
}