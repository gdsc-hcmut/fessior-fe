import React from 'react';

import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

type URLsLayoutProps = {
  children: React.ReactNode;
};

function URLsLayout(props: URLsLayoutProps) {
  const { children } = props;

  return (
    <section>
      <Header />
      {children}
    </section>
  );
}

export default URLsLayout;
