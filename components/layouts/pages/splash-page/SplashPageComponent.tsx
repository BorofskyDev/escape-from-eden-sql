import RecentPostsSection from '../../sections/RecentPostsSection'
import AboutSection from '../../sections/AboutSection'
import AllPostsSection from '../../sections/AllPostsSection'
import SubscribeContainer from '../../containers/SubscribeContainer'
import { BodyText, Heading } from '@/components/ui/common'
import { GeneralSection, Page } from '@/components/layouts'
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
        <SubscribeContainer />
        <RecentPostsSection />
        <AboutSection />
        <AllPostsSection />
      </GeneralSection>
    </Page>
  )
}
