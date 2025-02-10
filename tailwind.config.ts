import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class', // Enables dark mode via a class on the <html> element
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // These colors pull from CSS variables that you'll define for light/dark modes
        bg1: 'var(--bg1)',
        bg2: 'var(--bg2)',
        text1: 'var(--text1)',
        text2: 'var(--text2)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        header: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-open-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
