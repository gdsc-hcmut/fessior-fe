import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '760px',
        lg: '960px',
        xl: '1300px',
        '3xl': '1872px',
      },
      colors: {
        white: '#ffffff',
        primary: '#0B2878',
        'primary-darken': '#082060',
        'default-text': '#252641',
        'primary-white': '#ebf0fd',
        disabled: '#6d7eae',
        red: '#db4437',
        green: '#0f9d58',
        'royal-300': '#6D7EAE',
      },
      animation: {
        fade: 'fadeIn .2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('tailwind-scrollbar-hide')],
};
export default config;
