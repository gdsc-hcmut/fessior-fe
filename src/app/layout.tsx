import { QueryClientProvider } from '@tanstack/react-query';
import { Baloo_Chettan_2 } from 'next/font/google';

import queryClient from '@/querier/client';

import type { Metadata } from 'next';

import '@/styles/globals.css';

const balooChettan2 = Baloo_Chettan_2({ subsets: ['latin'] });

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
        <body className={balooChettan2.className}>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
