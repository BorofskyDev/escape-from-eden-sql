import { GeneralSection } from '../general-section/GeneralSection'
import { BodyText, TextLink } from '@/components/ui/common'
import styles from './AboutSection.module.scss'

export default function AboutSection() {
  return (
    <GeneralSection id='about' className={styles.aboutSection}>
      <BodyText>
        At the age of 7, during the first Gulf War, I grew scared over
        everything I saw on TV and was afraid that we&apos;d be bombed, I&apos;d
        go to Hell, and I would never get to Heaven. And so I said the prayer,
        was baptized, and began my life as a Christian who &quot;made the
        choice.&quot;
      </BodyText>

      <BodyText>
        Had I known what my life would bring after that — the pain, the
        betrayal, the hypocrisy, the sacrifice, the lack of joy and inhumanity —
        I would have just shut the fuck up.
      </BodyText>
      <BodyText>
        I&apos;d endure household trauma exacerbated by a theology that
        supported what was happening. I would be indoctrinated and groomed
        within a radical, yet common form of evangelical Christianity. I&apos;d
        spend nearly a decade professionally studying the faith at one of the
        various Southern Baptist seminaries in the US. I would debate atheists,
        liberals, Communists, and all others while putting up the good fight.
        And in the end, I would be left with the choice that I could love God or
        love my fellow human, but not both.
      </BodyText>
      <BodyText>
        I chose humanity. That choice upended my world and everything I had ever
        known or trusted. But it was a choice that had to be made and it had to
        be honest.{' '}
      </BodyText>
      <BodyText>
        I found freedom in that choice, but it was also scary. Still, I was free
        to explore a world that had previously been unknown to me. This blog is
        an exploration of that freedom and my views of the world with a
        post-Christian perspective.
      </BodyText>

      <TextLink href='/about'>Lean More About Me</TextLink>
    </GeneralSection>
  )
}
