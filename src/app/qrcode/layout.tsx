import React from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';
import ShortenTools from '@/components/shorten-tools';

type QrCodeLayoutProps = {
  children: React.ReactNode;
};

export default function QrCodeLayout(props: QrCodeLayoutProps) {
  const { children } = props;

  return (
    <section>
      <Header />
      <div className='relative flex flex-col items-center overflow-hidden leading-[1.2] text-primary'>
        <div className='md:max-w-[1000px] lg:flex lg:flex-col lg:items-center'>
          <div className='text-center'>
            <h1 className='mt-[80px] text-[36px] font-[700] leading-[65px] md:mt-[168px] md:text-[48px] lg:text-[60px]'>
              <span className=' md:inline'>Fessior</span> QR Generator
            </h1>
            <p className='hidden leading-[24px] md:block md:text-[20px] lg:mb-0 lg:mt-3 lg:text-[24px]'>
              Convenience, efficiency, and versatility:{' '}
              <br className='md:hidden' /> QR Code Management Made Easy
            </p>
          </div>
          {children}
          <div className='mx-[20px] text-center md:flex md:flex-col md:items-center'>
            <h2 className='text-[36px] font-[700] leading-[65px]'>
              Fessior Tools
            </h2>
            <p className='text-center leading-[24px] md:max-w-[640px]'>
              Your one-stop destination for essential utilities. Discover a
              world of community-driven tools that simplify your daily tasks.
            </p>
            <ShortenTools />
          </div>
        </div>
        <div className='absolute right-[-10px] top-[100px] hidden h-[40px] w-[40px] rounded-full bg-primary md:block'></div>
        <div className='absolute left-[40px] top-[145px] hidden h-[12px] w-[12px] rounded-full bg-primary md:left-[30px] md:h-[28px] md:w-[28px] lg:left-[100px] lg:h-[40px] lg:w-[40px]'></div>
        <div className='absolute left-[-70px] top-[727px] h-[120px] w-[120px] rounded-full bg-primary'></div>
        <div className='absolute bottom-[9px] right-[-30px] h-[80px] w-[80px] rounded-full bg-primary md:hidden'></div>
        <div className='absolute bottom-[0px] right-[60px] h-[20px] w-[20px] rounded-full bg-primary md:hidden'></div>
      </div>
      <Footer />
    </section>
  );
}
