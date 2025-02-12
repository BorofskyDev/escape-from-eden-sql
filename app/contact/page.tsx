// app/contact/page.tsx
'use client'
import ContactForm from '@/components/ui/forms/ContactForm'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export default function ContactPage() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      <section className='my-40 max-w-7xl mx-auto px-6 md:px-8 lg:px-16'>
        <h1 className='w-full mx-auto my-20 text-center text-7xl lg:text-9xl text-text1 capitalize'>
          Contact
        </h1>
        <p className='w-full mx-auto text-md text-text1'>
          This is primarily for any media personalities who drunkenly come
          across this page and want to ask questions. I will tell you right now:
          I will not debate you. Spend your time sending the message if you
          must, but I will almost certainly not reply. This site is for my
          thoughts; if you do not like them, do not come to the site.
        </p>
        <br />
        <br />
        <p className='w-full mb-10 mx-auto text-md text-text1'>
          Outside of that, I am very open to interviews, answering good-faith
          questions when time permits, or being a guest author. Please use the
          contact form for that, not to debate me.
        </p>
        <ContactForm />
      </section>
    </GoogleReCaptchaProvider>
  )
}
