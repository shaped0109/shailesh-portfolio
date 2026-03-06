/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand accent — deep teal
        brand: {
          50:  '#edfafa',
          100: '#d5f5f6',
          200: '#afecee',
          300: '#7edce2',
          400: '#16bdca',
          500: '#0D9488',
          600: '#0D7A6E',
          700: '#0a5f56',
          800: '#0c4a44',
          900: '#0d3d39',
          DEFAULT: '#0D7A6E',
        },
        // Warm amber accent
        amber: {
          DEFAULT: '#C97B2A',
          light: '#e09040',
          dark: '#a05f1a',
        },
        // Dark mode surfaces
        dark: {
          base:     '#0F0F0F',
          surface:  '#141414',
          elevated: '#1E1E1E',
          card:     '#1A1A1A',
          border:   '#2A2A2A',
          muted:    '#3A3A3A',
        },
        // Light mode surfaces
        light: {
          base:     '#F8F8F6',
          surface:  '#FAFAF8',
          elevated: '#FFFFFF',
          card:     '#F3F3F0',
          border:   '#E4E4E0',
          muted:    '#D0D0CC',
        },
        // Text tokens
        ink: {
          primary:   '#EAEAEA',
          secondary: '#A0A0A0',
          muted:     '#6A6A6A',
          inverse:   '#1A1A1A',
        },
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        tight: '-0.03em',
      },
      lineHeight: {
        relaxed: '1.7',
      },
      spacing: {
        section: '6rem',
        'section-sm': '4rem',
      },
      boxShadow: {
        'teal-sm':  '0 2px 8px rgba(13, 122, 110, 0.15)',
        'teal-md':  '0 4px 20px rgba(13, 122, 110, 0.25)',
        'teal-lg':  '0 8px 40px rgba(13, 122, 110, 0.35)',
        'card-dark': '0 2px 12px rgba(0,0,0,0.4)',
        'card-lift': '0 8px 30px rgba(0,0,0,0.5)',
        'card-light': '0 2px 12px rgba(0,0,0,0.08)',
        'card-lift-light': '0 8px 30px rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    // Custom 'light:' variant — applies when html does NOT have class="dark"
    function({ addVariant }) {
      addVariant('light', 'html:not(.dark) &')
    },
  ],
}
