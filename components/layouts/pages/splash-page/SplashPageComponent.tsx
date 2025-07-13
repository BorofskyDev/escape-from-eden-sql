import RecentPostsSection from '../../sections/recent-posts-section/RecentPostsSection'
import AboutSection from '../../sections/about-section/AboutSection'
import AllPostsSection from '../../sections/all-posts-section/AllPostsSection'
import { BodyText, Heading } from '@/components/ui/common'
import { GeneralSection, Page, SubscribeContainer } from '@/components/layouts'
import styles from './SplashPageComponent.module.scss'

export function SplashPageComponent() {
  return (
    <Page>
      <div className={styles.splashPage__heading}>
        <Heading as='h1' size='page'>
          Escape from Eden
        </Heading>
        <BodyText variant='body-lg'>
          A former conservative Christian philosopher turned agnostic
          progressive explores his new world of unbelief
        </BodyText>
      </div>
      <GeneralSection id='main'>
        <AboutSection />
        <RecentPostsSection />
        <AllPostsSection />
        <SubscribeContainer />
      </GeneralSection>
    </Page>
  )
}
