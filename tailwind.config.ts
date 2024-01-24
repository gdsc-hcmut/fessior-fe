import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '760px',
        lg: '960px',
      },
      colors: {
        white: '#ffffff',
        primary: '#0B2878',
        black: '#000000',
      },
    },
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
};
export default config;
