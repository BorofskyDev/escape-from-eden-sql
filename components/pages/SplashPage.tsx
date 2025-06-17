import RecentPostsSection from '../layouts/sections/RecentPostsSection'
import AboutSection from '../layouts/sections/AboutSection'
import AllPostsSection from '../layouts/sections/AllPostsSection'
import SubscribeContainer from '../layouts/containers/SubscribeContainer'
import { BodyText, Heading } from '@/components/ui/common'
export default function SplashPage() {
  return (
    <section className='pt-40 px-6 md:px-8 lg:px-16 mx-auto max-w-7xl'>
      <Heading as='h1' size='page'>
        Escape from Eden
      </Heading>
      <BodyText variant='body'>
        A former conservative Christian philosopher turned agnostic progressive
        explores his new world of unbelief
      </BodyText>
      <SubscribeContainer />
      <RecentPostsSection />
      <AboutSection />
      <AllPostsSection />
    </section>
  )
}
