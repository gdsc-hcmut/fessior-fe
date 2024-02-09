import React from 'react';

import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

type URLsLayoutProps = {
  children: React.ReactNode;
};

function URLsLayout(props: URLsLayoutProps) {
  const { children } = props;

  return (
    <section className='min-h-[100vh]'>
      <Header />
      <Sidebar />
      <div className='pl-[18vw] pt-[85.6px] 2xl:pl-[17vw] 3xl:pl-[16vw]'>
        {children}
      </div>
    </section>
  );
}

export default URLsLayout;
