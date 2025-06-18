// components/layout/footer/Footer.tsx

import { FooterLegal, FooterMedia, FooterNav } from './footer-components'

export default function Footer() {
  return (
    <footer className='bg-bg1 py-8'>
      <div className='max-w-7xl mx-auto px-6 md:px-8 lg:px-16'>
        <div className='flex flex-col md:flex-row md:justify-between text-center md:text-left'>
          <FooterNav />
          <FooterMedia />
          <FooterLegal />
        </div>
      </div>
    </footer>
  )
}
