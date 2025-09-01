import RecentPostsSection from '../../sections/recent-posts-section/RecentPostsSection'
import AboutSection from '../../sections/about-section/AboutSection'
import AllPostsSection from '../../sections/all-posts-section/AllPostsSection'
import { GeneralSection, Page, SubscribeContainer } from '@/components/layouts'
import styles from './SplashPageComponent.module.scss'

export function SplashPageComponent() {
  return (
    <Page className={styles.splashPage}>
      <GeneralSection id='main'>
        <RecentPostsSection />
        <AboutSection />
        <AllPostsSection />
        <SubscribeContainer />
      </GeneralSection>
    </Page>
  )
}
