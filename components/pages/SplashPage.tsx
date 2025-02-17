import RecentPostsSection from "../layouts/sections/RecentPostsSection";
import AboutSection from "../layouts/sections/AboutSection";
import AllPostsSection from "../layouts/sections/AllPostsSection";
// import SubscribeContainer from "../layouts/containers/SubscribeContainer";

export default function SplashPage() {
    return (
        <section className='pt-40 px-6 md:px-8 lg:px-16 mx-auto max-w-7xl'>
            <h1 className='w-full mx-auto text-center text-7xl lg:text-9xl text-text1 capitalize'>Escape from Eden</h1>
            <p className=' my-6 text-xl text-center'>A former conservative Christian philosopher turned agnostic progressive explores his new world of unbelief</p>
           {/* <SubscribeContainer /> */}
            <RecentPostsSection />
            <AboutSection />
            <AllPostsSection />
        </section>
    )
}