'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';

import Button from '@/components/button';
import Footer from '@/components/footer';
import Header from '@/components/header';
import ShortenTools from '@/components/shorten-tools';
import Icon from '@/types/icon-enum';
import { getIcon } from '@/utils/common';

type QrCodeLayoutProps = {
  children: React.ReactNode;
};

export default function QrCodeLayout(props: QrCodeLayoutProps) {
  const { children } = props;
  const router = useRouter();
  const currentPathname = usePathname();
  const isWifi = currentPathname === '/qrcode/qr-wifi';
  const linkIcon = useMemo(() => {
    return getIcon(
      '/icons/qrcode',
      'link_qr.svg',
      !isWifi ? Icon.ACTIVE : Icon.INACTIVE,
    );
  }, [isWifi]);
  const wifiIcon = useMemo(() => {
    return getIcon(
      '/icons/qrcode',
      'wifi.svg',
      isWifi ? Icon.ACTIVE : Icon.INACTIVE,
    );
  }, [isWifi]);

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
          <div className='mx-auto my-5 flex w-[98%] max-w-[360px] text-[12px] font-[500] sm:w-[100%] sm:text-[16px] md:my-6 md:max-w-[416px] md:text-[20px]'>
            <Button
              onClick={() => {
                router.push('/qrcode/qr-url');
              }}
              className='flex items-center justify-center'
              width='full'
              type={!isWifi ? 'positive' : 'neutral'}
            >
              <div className='transition-all'>
                <Image
                  src={linkIcon}
                  alt='link-icon'
                  width={40}
                  height={40}
                  className='pr-2'
                />
              </div>
              Website URL
            </Button>
            <Button
              width='full'
              type={isWifi ? 'positive' : 'neutral'}
              className='ml-6 flex items-center justify-center'
              onClick={() => {
                router.push('/qrcode/qr-wifi');
              }}
            >
              <div className='ml-[-8px] transition-all'>
                <Image
                  src={wifiIcon}
                  alt='wifi-icon'
                  width={40}
                  height={40}
                  className='pr-2'
                />
              </div>
              Wi-fi
            </Button>
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
        <div className='absolute left-[-70px] top-[740px] -z-10 h-[120px] w-[120px] rounded-full bg-primary'></div>
        <div className='absolute bottom-[9px] right-[-30px] h-[80px] w-[80px] rounded-full bg-primary md:hidden'></div>
        <div className='absolute bottom-[0px] right-[60px] h-[20px] w-[20px] rounded-full bg-primary md:hidden'></div>
      </div>
      <Footer />
    </section>
  );
}
