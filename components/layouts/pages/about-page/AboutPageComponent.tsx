import { GeneralSection, Page } from '@/components/layouts/'
import { BodyText, Heading } from '@/components/ui/common'
import styles from './AboutPageComponent.module.scss'

export function AboutPageComponent() {
  return (
    <Page>
      <Heading as='h1' size='page'>
        Journal of a recalcitrant
      </Heading>
      <GeneralSection id='main' className={styles.aboutPageComponent}>
        <BodyText>
          To be a recalcitrant is often viewed in a negative light. Someone who
          is always negative, who pushes against authority just to see how far
          they can push. We know them to be difficult, stubborn, the shitposters
          of the world. I want to offer a different take.
        </BodyText>

        <BodyText>
          A recalcitrant isn&apos;t someone who is stubborn for the sake of
          being stubborn, or a naysayer just to be the constant devil&apos;s
          advocate. No, a recalcitrant is about refusing to hand over one&apos;s
          conscience to people who demand obedience more than thought.
        </BodyText>

        <BodyText>
          I first learned what it meant to be a true recalcitrant in a seminary
          run by far-right leaders who had a decade earlier taken over the
          Southern Baptist Convention. I was a believer then, committed to their
          theology, convinced by their orthodoxy, and yet I still resisted. The
          habit of rebellion was already in me, even when I couldn&apos;t yet
          see the system for what it was.
        </BodyText>
        <BodyText>
          Today the setting is different, but the dynamic is familiar. I live in
          a nation where authoritarianism has gone mainstream, where political
          power is consolidated in the hands of those who mistake domination for
          strength. I don&apos;t believe their story, and I won&apos;t submit to
          it. This time my rebellion isn&apos;t instinct alone, it&apos;s
          conviction. I resist because I love liberty. I resist because
          democracy requires it. I resist because I am a recalcitrant.
        </BodyText>
        <BodyText>
          This journal is where I work that resistance out loud. Sometimes that
          means religion, because faith and power are still deeply entangled.
          Sometimes it means politics, economics, or technology, because
          authoritarian systems wear many masks. Always it means asking why
          before saying yes, and refusing to let easy answers stand untested.
        </BodyText>
        <BodyText>
          You&apos;ll find essays here that move between the pesronal and the
          structural. My own history is one case study in how authortarian
          systems form people, and how those people can break free, or not. But
          the point isn&apos;t my story alone. The point is to ask: What happens
          when we stop obeying for obedience&apos;s sake? What happens when we
          choose love over orthodoxy, liberty over control, human dignity over
          the demands of power?
        </BodyText>
        <BodyText>
          If that question matters to you, you&apos;re in the right place. Read,
          share, argue amongst yourselves. I&apos;m not here to offer final
          answers. I&apos;m here to journal the struggle of living a
          recalcitrant life, of refusing to submit to the easy comforts of
          authoritarianism, in church, in politics, or in culture.
        </BodyText>
      </GeneralSection>
    </Page>
  )
}
