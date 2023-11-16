// import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

import type { Metadata } from 'next';
import './globals.css';

// const inter = Inter({ subsets: ['latin'] });
const googleSans = localFont({
  src: [
    {
      path: '../../public/fonts/GoogleSans-Bold-v1.27.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GoogleSans-Regular-v1.27.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Fessior Tools',
  description: 'Utility tools developed by Fessior Community',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang='en'>
      <body className={googleSans.className}>{children}</body>
    </html>
  );
}
