'use client'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { Page, GeneralSection } from '@/components/layouts'
import { Heading, BodyText } from '@/components/ui/common'
import { ContactForm } from '@/components/ui/forms/'
import styles from './ContactPageComponent.module.scss'

export default function ContactPageComponent() {
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
      <Page>
        <GeneralSection id='main' className={styles.contactPageComponent}>
          <Heading as='h1' size='page'>
            Contact
          </Heading>
          <div className={styles.contactPageComponent__text}>
            <BodyText>
              This is primarily for any media personalities who drunkenly come
              across this page and want to ask questions. I will tell you right
              now: I will not debate you. Spend your time sending the message if
              you must, but I will almost certainly not reply. This site is for
              my thoughts; if you do not like them, do not come to the site.
            </BodyText>

            <BodyText>
              Outside of that, I am very open to interviews, answering
              good-faith questions when time permits, or being a guest author.
              Please use the contact form for that, not to debate me.
            </BodyText>
          </div>
        </GeneralSection>
        <ContactForm />
      </Page>
    </GoogleReCaptchaProvider>
  )
}
