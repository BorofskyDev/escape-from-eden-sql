import { GeneralSection } from '../general-section/GeneralSection'
import { BodyText, TextLink, Heading } from '@/components/ui/common'
import styles from './AboutSection.module.scss'

export default function AboutSection() {
  return (
    <GeneralSection id='about' className={styles.aboutSection}>
      <Heading as='h2' size='section'>Escape from Eden</Heading>
      <BodyText>
        Escape from eden is an independent publication for those who can&apos;t
        unsee the cracks. Part personal essay, part cultural critique,
        discussing how faith, philosophy, tech, and various systems shape us.
      </BodyText>

      <BodyText>
        I&apos;m writing mostly for myself, but also for those burned by
        institutions and still choose to ask hard questions. We&apos;ve been
        promised a utopia, a Garden of Eden, if we just follow the system the
        right way. We were given easy answers in lieu of honest ones.
      </BodyText>
      <BodyText>
        We choose to embrace clarity, honesty, and a recalcitrant approach to
        all those who&apos;d rather us go quietly.
      </BodyText>

      <TextLink href='/about'>Lean More About Me</TextLink>
    </GeneralSection>
  )
}
