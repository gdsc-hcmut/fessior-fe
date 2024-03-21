import { clsx } from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import CloseButton from '@/components/close-button';
import AuthContext from '@/contexts/authContext';
import useScreenSize from '@/hooks/useScreenSize';
import { navItems } from '@/libs/api/nav-items';
import ScreenSize from '@/types/screen-size-enum';

import Button from '../button';

import AuthButton from './auth-button';
import NavList from './nav-list';
import User from './user';

type NavProps = {
  isHome?: boolean;
  pathname?: string;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
};

export default function Nav(props: NavProps) {
  const { meProfile, isAuthStatusReady } = useContext(AuthContext);

  const { isHome, pathname, isCollapsed, setIsCollapsed } = props;
  const { screenSize, loaded } = useScreenSize();
  const router = useRouter();

  const collapseIcon = isHome
    ? '/icons/header/collapse_nav_white.svg'
    : '/icons/header/collapse_nav_royal.svg';

  const collapseButton = isCollapsed ? (
    <button
      className='h-[100%]'
      onClick={() => {
        setIsCollapsed(false);
      }}
    >
      <Image
        src={collapseIcon}
        alt=''
        width={0}
        height={0}
        className='h-[100%] w-auto'
      />
    </button>
  ) : (
    <CloseButton
      onClick={() => {
        setIsCollapsed(true);
      }}
      shape='square'
      className='w-[32px] self-end'
    />
  );

  const mdNavListContainerClass = clsx(
    isCollapsed
      ? 'h-0 border-none py-0'
      : 'h-[300px] border-t-[1px] bg-white py-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]',
    'absolute left-0 right-0 top-[72px] overflow-y-hidden px-[20px] transition-all duration-500 scrollbar-hide',
  );

  const pathIsShortenClass = clsx(pathname === '/shorten' ? '' : 'hidden');
  const pathIsUrlClass = clsx(pathname === '/urls' ? '' : 'hidden');

  if (!isAuthStatusReady) return;

  if (!meProfile) {
    if (screenSize === ScreenSize.SM)
      return (
        <div>
          <AuthButton isHome={isHome} isLogin />
        </div>
      );

    return (
      <div>
        <AuthButton isHome={isHome} className='me-[8px] lg:me-[12px]' isLogin />
        <AuthButton isHome={isHome} />
      </div>
    );
  }

  if (!loaded) return;

  if (screenSize === ScreenSize.SM) {
    return (
      <>
        <div className='flex justify-between'>
          <button
            onClick={() => {
              setIsCollapsed(false);
            }}
          >
            <Image
              src={collapseIcon}
              alt=''
              width={0}
              height={0}
              className='h-[100%] w-auto'
            />
          </button>
        </div>
        {!isCollapsed && (
          <div className='fixed bottom-0 left-0 right-0 top-0 bg-white p-[36px]'>
            <div className='flex h-[100%] w-[100%] flex-col'>
              <div className='mb-[36px] mt-[24px] flex items-center justify-between'>
                <User />
                <CloseButton
                  onClick={() => {
                    setIsCollapsed(true);
                  }}
                  className='w-[28px]'
                  shape='square'
                />
              </div>
              <NavList items={navItems} />
            </div>
          </div>
        )}
      </>
    );
  }
  if (screenSize === ScreenSize.MD) {
    return (
      <div>
        <div className='flex h-[100%] items-center justify-between'>
          <User
            className='me-[28px]'
            isOptionDropdown
            border
            whiteTheme={isHome}
          />
          <div className='flex w-[32px] items-center'>{collapseButton}</div>
        </div>
        <div className={mdNavListContainerClass}>
          <div className='h-[236px]'>
            <NavList items={navItems} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{ maxWidth: `${(navItems.length - 1) * 200}px` }}
      className='flex flex-grow items-center justify-end'
    >
      {!isHome && (
        <div className='flex flex-grow items-center'>
          <NavList items={navItems} />
        </div>
      )}
      <Button
        className={pathIsShortenClass}
        onClick={() => {
          router.push('/urls');
        }}
      >
        My URLs
      </Button>
      <Button
        className={pathIsUrlClass}
        onClick={() => {
          router.push('/shorten');
        }}
      >
        Shorten now
      </Button>
      <User
        className='me-[12px] ms-[20px]'
        isOptionDropdown
        border
        whiteTheme={isHome}
      />
    </div>
  );
}
