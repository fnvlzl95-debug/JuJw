/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#fdfcfa',
          secondary: '#f5f4f1',
          surface: '#ffffff',
        },
        text: {
          default: '#1a1a1a',
          muted: '#6b6b6b',
          subtle: '#9a9a9a',
        },
        accent: {
          DEFAULT: '#a08c5b',
          hover: '#8a7a50',
        },
        border: '#e5e4e1',
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Noto Serif KR', 'Cormorant Garamond', 'serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        'content': '1200px',
      },
    },
  },
  plugins: [],
}
