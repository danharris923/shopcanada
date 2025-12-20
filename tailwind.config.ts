import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // === PRIMARY REDS (Canadian Flag) ===
        'maple-red': '#8F020D',
        'burgundy': {
          DEFAULT: '#4C0101',
          dark: '#350100',
        },

        // === DARK NEUTRALS ===
        'soft-black': '#0A0A0A',
        'charcoal': '#1E1E1E',
        'slate': '#444444',
        'silver': {
          DEFAULT: '#979799',
          light: '#CBCACD',
        },

        // === LIGHT BACKGROUNDS ===
        'cream': '#FAF9F7',
        'ivory': '#F5F4F2',
        'warm-grey': '#EDECEA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.75' }],
        'lg': ['1.125rem', { lineHeight: '1.75' }],
        'xl': ['1.25rem', { lineHeight: '1.4' }],
        '2xl': ['1.5rem', { lineHeight: '1.3' }],
        '3xl': ['2rem', { lineHeight: '1.25' }],
        '4xl': ['2.5rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
      },
      boxShadow: {
        'subtle': '0 1px 2px rgba(10, 10, 10, 0.05)',
        'card': '0 4px 6px rgba(10, 10, 10, 0.07)',
        'card-hover': '0 10px 25px rgba(10, 10, 10, 0.1)',
        'elevated': '0 20px 40px rgba(10, 10, 10, 0.15)',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'ticker': 'ticker-scroll 30s linear infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(143, 2, 13, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(143, 2, 13, 0.8)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'ticker-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
