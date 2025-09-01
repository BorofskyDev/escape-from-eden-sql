import { GeneralSection } from '../general-section/GeneralSection'
import { BodyText, TextLink, Heading } from '@/components/ui/common'
import styles from './AboutSection.module.scss'

export default function AboutSection() {
  return (
    <GeneralSection id='about' className={styles.aboutSection}>
      <Heading as='h2' size='section'>
        Journal of a Recalcitrant
      </Heading>
      <Heading as='h3' size='md'>
        re·cal·ci·trant
      </Heading>
      <BodyText>
        &quot;Having an obstinately uncooperative attitude toward authority
        and/or discipline.&quot; That is how Google&apos;s dictionary defines
        it, but that isn&apos;t a very good definition if you ask me.
      </BodyText>

      <BodyText>
        Despite being raised in an authoritarian culture, I&apos;ve always taken
        issue with authority. Sometimes to my own detriment, but sometimes for
        my own good. When I&apos;ve found myself in systems that demand
        submission, there is something within me that instinctively says
        &quot;no&quot;.
      </BodyText>
      <BodyText>
        I once found myself in a totalitarian environment, though on a personal
        level, it was in a seminary studying under far-right leadership that had
        taken over the Southern Baptist convention. At the time I was a true
        believer in their ways, yet still rebelled out of nature.
      </BodyText>
      <BodyText>
        I now find myself in a new type of totalitarian system, this time on a
        national and even global level, that has taken over my nation and seeks
        even more. This time, however, I am not a believer in their ways. I am
        obstinately opposed to what they believe and practice. I stand opposed
        to them and speak out in the only way I know how. I rebel not out of a
        sense of needing to rebel, but because I love liberty and democracy. I
        am a recalcitrant.
      </BodyText>

      <TextLink href='/about'>Lean More About Me</TextLink>
    </GeneralSection>
  )
}
