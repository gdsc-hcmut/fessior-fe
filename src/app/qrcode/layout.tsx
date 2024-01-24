import React from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';

type QrCodeLayoutProps = {
  children: React.ReactNode;
};

export default function QrCodeLayout(props: QrCodeLayoutProps) {
  const { children } = props;

  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
}
