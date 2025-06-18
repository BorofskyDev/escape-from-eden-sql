import { Heading, BodyText, TextLink } from "@/components/ui/common";
import styles from './FooterMedia.module.scss'


export function FooterMedia() {
    return (
      <div className={styles.footerMedia}>
        <Heading as='h3' size='container'>Social Media</Heading>
        <BodyText>
          Designed and developed by{' '}
          <TextLink external href='https://joelborofsky.com' target='_blank'>
            JBSky Dev
          </TextLink>{' '}
        </BodyText>
      </div>
    )
}