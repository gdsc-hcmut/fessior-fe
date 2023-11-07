import React from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';

type URLsLayoutProps = {
  children: React.ReactNode;
};

function URLsLayout(props: URLsLayoutProps) {
  const { children } = props;

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
