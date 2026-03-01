/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'moroccan-blue': '#3B82F6',
        'moroccan-blue-glow': 'rgba(59, 130, 246, 0.4)',
        'mocha-mousse': '#A48072',
        'deep-black': '#020202',
        'intense-blue': '#1d4ed8',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        script: ['Dancing Script', 'cursive'],
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'reveal': 'reveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        reveal: {
          from: {
            opacity: '0',
            transform: 'translateY(20px) scale(0.98)',
            filter: 'blur(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
            filter: 'blur(0)',
          },
        },
      },
      boxShadow: {
        'hugh': '0 50px 120px -30px rgba(59, 130, 246, 0.3)',
        'huge': '0 40px 100px -20px rgba(0, 0, 0, 0.8)',
        'edge': '0 0 0 1px rgba(255, 255, 255, 0.05), 0 20px 50px -10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
