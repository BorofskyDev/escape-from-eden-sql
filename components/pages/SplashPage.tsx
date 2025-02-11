import RecentPostsSection from "../layouts/sections/RecentPostsSection";

export default function SplashPage() {
    return (
        <section className='pt-40 px-6 md:px-8 lg:px-16 mx-auto max-w-7xl'>
            <h1 className='w-full mx-auto text-center text-7xl lg:text-9xl text-text1 capitalize'>Escape from Eden</h1>
            <RecentPostsSection />
        </section>
    )
}