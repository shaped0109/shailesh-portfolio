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
        // Brand accent — Claude coral/terracotta
        brand: {
          50:  '#fdf3ef',
          100: '#fae4da',
          200: '#f5c7b3',
          300: '#eda485',
          400: '#e37d58',
          500: '#DA7756',
          600: '#c45e3b',
          700: '#a34730',
          800: '#7f3826',
          900: '#5c2a1c',
          DEFAULT: '#DA7756',
        },
        // Secondary warm accent
        amber: {
          DEFAULT: '#E8956D',
          light: '#f0ac88',
          dark: '#c4714f',
        },
        // Dark mode surfaces — warm charcoal (Claude-style)
        dark: {
          base:     '#1C1917',
          surface:  '#211E1B',
          elevated: '#2C2825',
          card:     '#272320',
          border:   '#3D3733',
          muted:    '#504945',
        },
        // Light mode surfaces — warm cream (Claude-style)
        light: {
          base:     '#FAF9F6',
          surface:  '#F5F2EC',
          elevated: '#FFFFFF',
          card:     '#EDE9E1',
          border:   '#DDD8CE',
          muted:    '#C8C2B6',
        },
        // Text tokens — warm-tinted
        ink: {
          primary:   '#F2EDE6',
          secondary: '#A89F96',
          muted:     '#6E6560',
          inverse:   '#1C1917',
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
        'teal-sm':  '0 2px 8px rgba(218, 119, 86, 0.18)',
        'teal-md':  '0 4px 20px rgba(218, 119, 86, 0.28)',
        'teal-lg':  '0 8px 40px rgba(218, 119, 86, 0.38)',
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
