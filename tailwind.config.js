/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        ocean: {
          50: '#EFF8FF',
          100: '#DBEFFE',
          200: '#BDE3FE',
          300: '#90CFFB',
          400: '#5CB3F8',
          500: '#3692F3',
          600: '#1A72E8',
          700: '#1459D6',
          800: '#1647AE',
          900: '#173E89',
          950: '#132754',
        },
        glass: {
          white: 'rgba(255,255,255,0.12)',
          'white-md': 'rgba(255,255,255,0.18)',
          'white-lg': 'rgba(255,255,255,0.24)',
          border: 'rgba(255,255,255,0.20)',
          'border-strong': 'rgba(255,255,255,0.35)',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'wave': 'wave 3s ease-in-out infinite',
        'wave2': 'wave 4s ease-in-out infinite reverse',
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'rise': 'rise 0.6s ease-out forwards',
        'drop-in': 'dropIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0) scaleX(1)' },
          '50%': { transform: 'translateY(-8px) scaleX(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.8' },
          '100%': { transform: 'scale(1.3)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        dropIn: {
          '0%': { opacity: '0', transform: 'scale(0.8) translateY(-10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
