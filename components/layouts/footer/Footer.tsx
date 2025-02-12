// components/layout/footer/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='bg-bg1 py-8'>
      <div className='max-w-7xl mx-auto px-6 md:px-8 lg:px-16'>
        <div className='flex flex-col md:flex-row md:justify-between text-center md:text-left'>
          {/* Navigation Column */}
          <div className='mb-6 md:mb-0'>
            <h3 className='font-bold mb-2'>Navigation</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/'>Home</Link>
              </li>
              <li>
                <Link href='/about'>About</Link>
              </li>
              <li>
                <Link href='/contact'>Contact</Link>
              </li>
              <li>
                <Link href='/login'>Login</Link>
              </li>
            </ul>
          </div>

          {/* Legal Disclosures Column */}
          <div>
            <h3 className='font-bold mb-2'>Legal</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/privacy-policy'>Privacy Policy</Link>
              </li>
              <li>
                <Link href='/cookies'>Cookies</Link>
              </li>
              <li>
                <Link href='/terms'>Terms and Agreement</Link>
              </li>
              <li>
                <Link href='/accessibility'>Accessibility Statement</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
