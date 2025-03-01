// app/accessibility/page.tsx
export default function AccessibilityStatementPage() {
  return (
    <section className='my-40 max-w-7xl mx-auto px-6 md:px-8 lg:px-16'>
      <h1 className='w-full mx-auto my-20 text-center text-7xl lg:text-9xl text-text1 capitalize'>
        Accessibility Statement
      </h1>

      <p className='w-full mx-auto text-md text-text1'>
        At Escape From Eden, we are committed to ensuring digital accessibility
        for all users. We strive to provide a user-friendly experience and make
        our website accessible to everyone, regardless of their abilities or
        devices.
      </p>

      <br />
      <br />

      <p className='w-full mx-auto text-md text-text1'>
        We continuously work to improve the accessibility of our site and
        welcome feedback on areas where we can enhance the user experience. If
        you encounter any accessibility barriers or have suggestions, please
        contact us at{' '}
        <a
          href='mailto:contact@escapefromeden.com'
          className='text-primary hover:underline'
        >
          contact@escapefromeden.com
        </a>
        .
      </p>

      <br />
      <br />

      <p className='w-full mx-auto text-md text-text1'>
        While we are working to ensure full compliance with the Web Content
        Accessibility Guidelines (WCAG) 2.1, we recognize that there may be some
        limitations. We are committed to making ongoing improvements and
        ensuring that all users have a positive experience on our site.
      </p>

      <br />
      <br />

      <p className='w-full mx-auto text-md text-text1'>
        Thank you for your support and feedback as we continue to enhance the
        accessibility of Escape From Eden.
      </p>
    </section>
  )
}
