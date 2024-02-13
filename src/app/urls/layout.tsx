import Image from 'next/image';
import React from 'react';

import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

type URLsLayoutProps = {
  children: React.ReactNode;
};

function URLsLayout(props: URLsLayoutProps) {
  const { children } = props;

  return (
    <section className='relative min-h-[100vh]'>
      <Header />
      {children}
      <div className='absolute bottom-[-1px] right-0'>
        <Image
          src='/images/url/decor.svg'
          alt='Decor image'
          width={0}
          height={0}
          className='hidden h-auto w-[70vw] md:block xl:w-[42vw]'
        />
        <Image
          src='/images/url/decor_mobile.svg'
          alt='Decor image'
          width={0}
          height={0}
          className='h-auto w-[100vw] md:hidden'
        />
      </div>
    </section>
  );
}

export default URLsLayout;
