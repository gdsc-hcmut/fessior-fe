'use client';

import { clsx } from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import AuthModal from '@/components/auth/auth-modal';
import Brand from '@/components/brand';
import Nav from '@/components/nav';
import useEventListener from '@/hooks/useEventListener';
import useScreenSize from '@/hooks/useScreenSize';
import AuthType from '@/types/auth-type-enum';
import ScreenSize from '@/types/screen-size-enum';

const TRANS_HEADER_PAGES = ['/'];
const LG_FILL_HEADER_BOUND = 150;
const MB_FILL_HEADER_BOUND = 100;

export default function Header() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHome, setIsHome] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { screenSize, loaded } = useScreenSize();
  const pathname = usePathname();
  const authType = useSearchParams().get('auth');

  useEventListener('scroll', () => setScrollY(window.scrollY));

  useEffect(() => setScrollY(window.scrollY), []);

  useEffect(() => {
    const fillHeaderFrom =
      screenSize === ScreenSize.LG
        ? LG_FILL_HEADER_BOUND
        : MB_FILL_HEADER_BOUND;
    setIsHome(
      !!TRANS_HEADER_PAGES.includes(pathname) &&
        typeof window !== 'undefined' &&
        !(scrollY >= fillHeaderFrom) &&
        isCollapsed,
    );
  }, [scrollY, isCollapsed, pathname, screenSize]);

  const headerClass = clsx(
    'fixed z-[10] transition-all flex w-[100%] items-center justify-between py-[22px] px-[20px] md:py-[14px] lg:px-[28px] lg:py-[18px]',
    !(isHome && isCollapsed) &&
      'bg-white shadow-[0px_6px_15px_rgba(64,79,104,0.05)]',
  );

  if (!loaded) return;

  return (
    <>
      <div></div>
      <div className={headerClass}>
        <Brand theme={isHome ? 'white' : 'primary'} />
        <Nav
          isHome={isHome}
          pathname={pathname}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>
      {authType && <AuthModal authType={authType as AuthType} />}
    </>
  );
}
