import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { Baloo_Chettan_2 } from 'next/font/google';

import AuthModal from '@/components/auth-md-lg';
import { AuthContextProvider } from '@/contexts/authContext';
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
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID!}>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <html lang='en'>
            <body
              className={clsx(balooChettan2.className, 'text-default-text')}
            >
              {children}
              <AuthModal />
            </body>
          </html>
        </QueryClientProvider>
      </AuthContextProvider>
    </GoogleOAuthProvider>
  );
}
