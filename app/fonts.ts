import localFont from 'next/font/local'
import { Playfair_Display } from 'next/font/google'

// Atkinson Hyperlegible Next (replacing Open Sans)
export const atkinsonNext = localFont({
  src: [
    // ExtraLight
    {
      path: './fonts/atkinson/AtkinsonHyperlegibleNext-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/atkinson/AtkinsonHyperlegibleNext-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    // Light
    {
      path: './fonts/atkinson/AtkinsonHyperlegibleNext-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/atkinson/AtkinsonHyperlegibleNext-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    // Regular
    {
      path: './fonts/atkinson/AtkinsonHyperlegibleNext-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/atkinson/AtkinsonHyperlegibleNext-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    // Medium
    {
      path: './fonts/atkinson/AtkinsonHyperlegibleNext-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/atkinson/AtkinsonHyperlegibleNext-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    // SemiBold
    {
      path: './fonts/atkinson/AtkinsonHyperlegibleNext-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/atkinson/AtkinsonHyperlegibleNext-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    // Bold
    {
      path: './fonts/atkinson/AtkinsonHyperlegibleNext-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/atkinson/AtkinsonHyperlegibleNext-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    // ExtraBold
    {
      path: './fonts/atkinson/AtkinsonHyperlegibleNext-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/atkinson/AtkinsonHyperlegibleNext-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-atkinson-next',
  fallback: ['system-ui', 'arial'],
})

export const atkinsonMono = localFont({
  src: [
    // ExtraLight
    {
      path: './fonts/atkinson-mono/AtkinsonHyperlegibleMono-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/atkinson-mono/AtkinsonHyperlegibleMono-ExtraLightItalic.ttf',
      weight: '200',
      style: 'italic',
    },
    // Light
    {
      path: './fonts/atkinson-mono/AtkinsonHyperlegibleMono-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/atkinson-mono/AtkinsonHyperlegibleMono-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    // Regular
    {
      path: './fonts/atkinson-mono/AtkinsonHyperlegibleMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/atkinson-mono/AtkinsonHyperlegibleMono-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    // Medium
    {
      path: './fonts/atkinson-mono/AtkinsonHyperlegibleMono-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/atkinson-mono/AtkinsonHyperlegibleMono-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    // SemiBold
    {
      path: './fonts/atkinson-mono/AtkinsonHyperlegibleMono-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/atkinson-mono/AtkinsonHyperlegibleMono-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    // Bold
    {
      path: './fonts/atkinson-mono/AtkinsonHyperlegibleMono-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/atkinson-mono/AtkinsonHyperlegibleMono-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    // ExtraBold
    {
      path: './fonts/atkinson-mono/AtkinsonHyperlegibleMono-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/atkinson-mono/AtkinsonHyperlegibleMono-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-atkinson-mono',
  fallback: ['monospace'],
})


export const playfair = Playfair_Display({
  display: 'swap',
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})
