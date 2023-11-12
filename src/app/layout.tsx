import { QueryClientProvider } from '@tanstack/react-query';
import { Inter } from 'next/font/google';

import queryClient from '@/querier/client';

import type { Metadata } from 'next';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
        <body className={inter.className}>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
