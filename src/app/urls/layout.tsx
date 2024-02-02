import React from 'react';

import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

type URLsLayoutProps = {
  children: React.ReactNode;
};

function URLsLayout(props: URLsLayoutProps) {
  const { children } = props;

  return (
    <section className='flex min-h-[100vh] flex-col'>
      <Header />
      <Sidebar />
      <div className='h-[1000px] flex-grow'>{children}</div>
    </section>
  );
}

export default URLsLayout;
