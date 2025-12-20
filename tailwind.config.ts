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
        // === PRIMARY REDS (from Canadian flag) ===
        'maple-red': '#8F020D',
        'burgundy': {
          DEFAULT: '#4C0101',
          dark: '#350100',
        },

        // === NEUTRALS (DARK) ===
        'soft-black': '#0A0A0A',
        'charcoal': '#1E1E1E',
        'slate': '#444444',
        'silver': {
          DEFAULT: '#979799',
          light: '#CBCACD',
        },

        // === BACKGROUNDS (LIGHT) ===
        'cream': '#FAF9F7',
        'ivory': '#F5F4F2',
        'warm-grey': '#EDECEA',

        // === LEGACY (keep for compatibility) ===
        'savings-green': '#22C55E',
        'trust-blue': '#0066CC',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'marquee': 'marquee 30s linear infinite',
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
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(10, 10, 10, 0.05)',
        'md': '0 4px 6px rgba(10, 10, 10, 0.07)',
        'lg': '0 10px 25px rgba(10, 10, 10, 0.1)',
        'xl': '0 20px 40px rgba(10, 10, 10, 0.15)',
      },
    },
  },
  plugins: [],
}

export default config
