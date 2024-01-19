import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1300px',
      },
      colors: {
        white: '#ffffff',
        primary: '#0B2878',
        'default-text': '#252641',
        disabled: '#6d7eae',
        red: '#db4437',
        green: '#0f9d58',
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
