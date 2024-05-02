'use client';

import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';
import AuthContext from '@/contexts/authContext';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout(props: AdminLayoutProps) {
  const { children } = props;

  const [isAllowed, setIsAllowed] = useState(false);
  const router = useRouter();
  const { isLoggedIn, isAuthStatusReady } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthStatusReady) {
      if (!isLoggedIn) {
        router.push('/?auth=login');
      } else {
        setIsAllowed(true);
      }
    }
  }, [isAuthStatusReady, isLoggedIn]);

  if (!isAllowed) {
    return;
  }

  return (
    <section className='flex min-h-screen flex-col'>
      <Header />
      <div className='flex-grow'>{children}</div>
      <Footer />
    </section>
  );
}
