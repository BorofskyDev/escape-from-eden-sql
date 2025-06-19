import { Heading ,TextLink } from '@/components/ui/common'
import styles from './FooterNav.module.scss'


export function FooterNav() {
    return (
      <div className={styles.footerNav}>
        <Heading as='h3' size='container'>Navigation</Heading>
        <ul className={styles.footerNav__list}>
          <li>
            <TextLink href='/'>Home</TextLink>
          </li>
          <li>
            <TextLink href='/about'>About</TextLink>
          </li>
          <li>
            <TextLink href='/contact'>Contact</TextLink>
          </li>
          <li>
            <TextLink href='/login'>Login</TextLink>
          </li>
          <li>
            <TextLink href='/admin'>Admin</TextLink>
          </li>
        </ul>
      </div>
    )
}