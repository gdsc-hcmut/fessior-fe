import React from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';

type URLsLayoutProps = {
  children: React.ReactNode;
};

function URLsLayout(props: URLsLayoutProps) {
  const { children } = props;

  return (
    <section className='flex min-h-[100vh] flex-col'>
      Layout for (url-shortener) group
      <Header />
      <div className='flex-grow'>{children}</div>
      <Footer />
    </section>
  );
}

export default URLsLayout;
