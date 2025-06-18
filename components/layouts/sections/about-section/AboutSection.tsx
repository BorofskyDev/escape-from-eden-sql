import { GeneralSection } from '../general-section/GeneralSection'
import { BodyText, Heading, TextLink } from '@/components/ui/common'
import styles from './AboutSection.module.scss'

export default function AboutSection() {
  return (
    <GeneralSection
      id='about'
      className={styles.aboutSection}
    >
      <Heading as='h2' size='section'>About</Heading>
      <BodyText >
        Everything in my life, my education, my values, my personality, my
        relationships, my everything was wrapped around conservative evangelical
        Christianity. Studying, lessons from life, and over a decade of
        questioning resulted in a complete destructuring of my faith and
        beliefs.{' '}
      </BodyText>
      <BodyText>
        This blog is the result of those ponderings. These are my individual
        views, my way of coping in this mad world and trying to make sense of it
        all.{' '}
      </BodyText>

      <TextLink
        href='/about'
        
      >
        Lean More About Me
      </TextLink>
    </GeneralSection>
  )
}
