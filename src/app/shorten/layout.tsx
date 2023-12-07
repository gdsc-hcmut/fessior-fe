import React from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';

type ShortenLayoutProps = {
  children: React.ReactNode;
};

export default function ShortenLayout(props: ShortenLayoutProps) {
  const { children } = props;

  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
}
