/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
        inter: ['Inter'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      screens: {
        xxs: '375px',
        xs: '430px',
        ...defaultTheme.screens,
      },
      typography: {
        xs: {
          css: [
            {
              fontSize: rem(10),
              lineHeight: round(20 / 10),
              p: {
                marginTop: em(14, 10),
                marginBottom: em(14, 10),
              },
              '[class~="lead"]': {
                fontSize: em(14, 10),
                lineHeight: round(24 / 14),
                marginTop: em(12, 16),
                marginBottom: em(12, 16),
              },
              blockquote: {
                marginTop: em(20, 14),
                marginBottom: em(20, 14),
                paddingInlineStart: em(16, 14),
              },
              h1: {
                fontSize: em(24, 10),
                marginTop: '0',
                marginBottom: em(20, 26),
                lineHeight: round(32 / 26),
              },
              h2: {
                fontSize: em(20, 10),
                marginTop: em(28, 16),
                marginBottom: em(14, 16),
                lineHeight: round(24 / 16),
              },
              h3: {
                fontSize: em(14, 10),
                marginTop: em(24, 14),
                marginBottom: em(8, 14),
                lineHeight: round(24 / 14),
              },
              h4: {
                marginTop: em(20, 14),
                marginBottom: em(8, 14),
                lineHeight: round(20 / 14),
              },
              img: {
                marginTop: em(24, 14),
                marginBottom: em(24, 14),
              },
              picture: {
                marginTop: em(24, 14),
                marginBottom: em(24, 14),
              },
              'picture > img': {
                marginTop: '0',
                marginBottom: '0',
              },
              video: {
                marginTop: em(24, 14),
                marginBottom: em(24, 14),
              },
              kbd: {
                fontSize: em(12, 14),
                borderRadius: rem(5),
                paddingTop: em(2, 14),
                paddingInlineEnd: em(5, 14),
                paddingBottom: em(2, 14),
                paddingInlineStart: em(5, 14),
              },
              code: {
                fontSize: em(8, 10),
              },
              'h2 code': {
                fontSize: em(18, 20),
              },
              'h3 code': {
                fontSize: em(16, 18),
              },
              pre: {
                fontSize: em(10, 10),
                lineHeight: round(20 / 12),
                marginTop: em(20, 12),
                marginBottom: em(20, 12),
                borderRadius: rem(4),
                paddingTop: em(8, 12),
                paddingInlineEnd: em(12, 12),
                paddingBottom: em(8, 12),
                paddingInlineStart: em(12, 12),
              },
              ol: {
                marginTop: em(12, 10),
                marginBottom: em(16, 14),
                paddingInlineStart: em(22, 14),
              },
              ul: {
                marginTop: em(12, 10),
                marginBottom: em(16, 14),
                paddingInlineStart: em(22, 14),
              },
              li: {
                marginTop: em(4, 14),
                marginBottom: em(4, 14),
              },
              'ol > li': {
                paddingInlineStart: em(6, 14),
              },
              'ul > li': {
                paddingInlineStart: em(6, 14),
              },
              '> ul > li p': {
                marginTop: em(8, 14),
                marginBottom: em(8, 14),
              },
              '> ul > li > p:first-child': {
                marginTop: em(16, 14),
              },
              '> ul > li > p:last-child': {
                marginBottom: em(16, 14),
              },
              '> ol > li > p:first-child': {
                marginTop: em(16, 14),
              },
              '> ol > li > p:last-child': {
                marginBottom: em(16, 14),
              },
              'ul ul, ul ol, ol ul, ol ol': {
                marginTop: em(8, 14),
                marginBottom: em(8, 14),
              },
              dl: {
                marginTop: em(16, 14),
                marginBottom: em(16, 14),
              },
              dt: {
                marginTop: em(16, 14),
              },
              dd: {
                marginTop: em(4, 14),
                paddingInlineStart: em(22, 14),
              },
              hr: {
                marginTop: em(40, 14),
                marginBottom: em(40, 14),
              },
              'hr + *': {
                marginTop: '0',
              },
              'h2 + *': {
                marginTop: '0',
              },
              'h3 + *': {
                marginTop: '0',
              },
              'h4 + *': {
                marginTop: '0',
              },
              table: {
                fontSize: em(10, 10),
                lineHeight: round(18 / 12),
              },
              'thead th': {
                paddingInlineEnd: em(12, 12),
                paddingBottom: em(8, 12),
                paddingInlineStart: em(12, 12),
              },
              'thead th:first-child': {
                paddingInlineStart: '0',
              },
              'thead th:last-child': {
                paddingInlineEnd: '0',
              },
              'tbody td, tfoot td': {
                paddingTop: em(8, 12),
                paddingInlineEnd: em(12, 12),
                paddingBottom: em(8, 12),
                paddingInlineStart: em(12, 12),
              },
              'tbody td:first-child, tfoot td:first-child': {
                paddingInlineStart: '0',
              },
              'tbody td:last-child, tfoot td:last-child': {
                paddingInlineEnd: '0',
              },
              figure: {
                marginTop: em(24, 14),
                marginBottom: em(24, 14),
              },
              'figure > *': {
                marginTop: '0',
                marginBottom: '0',
              },
              figcaption: {
                fontSize: em(12, 14),
                lineHeight: round(16 / 12),
                marginTop: em(8, 12),
              },
            },
            {
              '> :first-child': {
                marginTop: '0',
              },
              '> :last-child': {
                marginBottom: '0',
              },
            },
          ],
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
