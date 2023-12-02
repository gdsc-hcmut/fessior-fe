'use client';

import React from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { useQueryFeatureFlags } from '@/hooks/useQueryFeatureFlags';

type URLsLayoutProps = {
  children: React.ReactNode;
};

function URLsLayout(props: URLsLayoutProps) {
  const { children } = props;
  const { isPending, error, data } = useQueryFeatureFlags();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  console.log('+++++ data', data);

  return (
    <section>
      Layout for (url-shortener) group
      <Header />
      {children}
      <Footer />
    </section>
  );
}

export default URLsLayout;
