import Link from 'next/link'

export default function AboutSection() {
  return (
    <section id='about' className='my-16 h-full flex flex-col gap-6 align-middle justify-center'>
      <h2 className='text-center text-5xl font-header my-6'>About</h2>
      <p>
        Everything in my life, my education, my values, my personality, my
        relationships, my everything was wrapped around conservative evangelical
        Christianity. Studying, lessons from life, and over a decade of
        questioning resulted in a complete destructuring of my faith and
        beliefs.{' '}
      </p>
      <br />
      <br />
      <p>
        This blog is the result of those ponderings. These are my individual
        views, my way of coping in this made world and trying to make sense of
        it all.{' '}
      </p>

      <Link
        href='/about'
        className='text-center text-primary text-xl font-semibold hover:underline transition-all duration-200 hover:text-secondary'
      >
        Lean More About Me
      </Link>
    </section>
  )
}
