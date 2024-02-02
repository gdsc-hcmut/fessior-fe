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
      <Header />
      <aside className='fixed left-0 h-full w-[16vw] bg-white shadow-[6px_6px_15px_0_rgba(64,79,104,0.05)]'>
        d
      </aside>
      <div className='h-[1000px] flex-grow'>{children}</div>
    </section>
  );
}

export default URLsLayout;
