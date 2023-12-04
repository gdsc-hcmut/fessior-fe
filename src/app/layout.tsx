// import { Inter } from 'next/font/google';
import { QueryClientProvider } from '@tanstack/react-query';
import localFont from 'next/font/local';

import queryClient from '@/querier/client';

import type { Metadata } from 'next';

import '@/styles/globals.css';

// const inter = Inter({ subsets: ['latin'] });
const googleSans = localFont({
  src: [
    {
      path: '../../public/fonts/GoogleSans-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GoogleSans-Light.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GoogleSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GoogleSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GoogleSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GoogleSans-Black.ttf',
      weight: '900',
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
    <QueryClientProvider client={queryClient}>
      <html lang='en'>
        <body className={googleSans.className}>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
