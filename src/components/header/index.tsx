'use client';

import { clsx } from 'clsx';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import Nav from '@/components/nav';
import useEventListener from '@/hooks/useEventListener';
import useScreenSize from '@/hooks/useScreenSize';


const TRANS_HEADER_PAGES = ['/'];
const LG_FILL_HEADER_BOUND = 150;
const MB_FILL_HEADER_BOUND = 100;

export default function Header() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHome, setIsHome] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { screenSize } = useScreenSize();
  const pathname = usePathname();

  useEventListener('scroll', () => setScrollY(window.scrollY));

  useEffect(() => setScrollY(window.scrollY), []);

  useEffect(() => {
    const fillHeaderFrom =
      screenSize === 'lg' ? LG_FILL_HEADER_BOUND : MB_FILL_HEADER_BOUND;
    setIsHome(
      !!TRANS_HEADER_PAGES.includes(pathname) &&
        typeof window !== 'undefined' &&
        !(scrollY >= fillHeaderFrom) &&
        isCollapsed,
    );
  }, [scrollY, isCollapsed, pathname, screenSize]);

  return (
    <div
      className={clsx(
        'fixed z-[10] flex h-[80px] w-[100%] items-center justify-between p-[22px] md:h-[90px] lg:h-[108px] lg:p-[32px]',
        !(isHome && isCollapsed) &&
          'bg-white shadow-[0px_6px_15px_rgba(64,79,104,0.05)]',
      )}
    >
      <div className='flex h-[100%] items-center'>
        <Image
          src={
            isHome
              ? '/logo_transparent_white.svg'
              : '/logo_transparent_navy.svg'
          }
          alt=''
          width={0}
          height={0}
          className='me-[4px] h-[100%] w-auto'
        />
        <h4
          className={clsx(
            'text-[20px] font-[700] leading-[1px] md:text-[24px] lg:text-[28px]',
            isHome ? 'text-white' : 'text-primary',
          )}
        >
          Fessior Tools
        </h4>
      </div>
      <Nav
        isHome={isHome}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      {/* TODO: Apply authentication */}
    </div>
  );
}
