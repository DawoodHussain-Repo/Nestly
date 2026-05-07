import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary, #E03F4F)',
        'primary-dark': 'var(--primary-dark, #B8333F)',
        'primary-light': 'var(--primary-light, #ED6B7D)',
        ink: 'var(--ink, #1a1a1a)',
        'stone-dark': 'var(--stone-dark, #4a4a4a)',
        'stone-light': 'var(--stone-light, #888888)',
        'stone-lighter': 'var(--stone-lighter, #BBBBBB)',
        linen: 'var(--linen, #F5F3F0)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        sans: ['var(--font-sans, "Libre Franklin")', 'sans-serif'],
        serif: ['var(--font-serif, "Libre Baskerville")', 'serif'],
      },
      borderRadius: {
        sm: 'var(--radius, 0.375rem)',
      },
      spacing: {
        'section-padding': '3rem',
        'section-padding-lg': '5rem',
      },
    },
  },
  plugins: [],
}

export default config
