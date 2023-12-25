import { clsx } from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import useScreenSize from '@/hooks/useScreenSize';
import { navItems } from '@/libs/api/nav-items';
import { NavItem } from '@/libs/api/types/nav-item';
import { getActiveIcon } from '@/utils/common';

type NavProps = {
  isHome?: boolean;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
};

export default function Nav(props: NavProps) {
  const { isHome, isCollapsed, setIsCollapsed } = props;
  const { screenSize } = useScreenSize();

  if (screenSize === 'sm') {
    return (
      <>
        <div className='flex justify-between'>
          <button
            onClick={() => {
              setIsCollapsed(false);
            }}
          >
            <Image
              src={
                isHome
                  ? '/icons/collapse_nav_white.svg'
                  : '/icons/collapse_nav_loyal.svg'
              }
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
                <button
                  onClick={() => {
                    setIsCollapsed(true);
                  }}
                  className='aspect-square w-[28px] rounded-[8px] border-[1px] border-primary p-[8px]'
                >
                  <Image
                    src={
                      isHome
                        ? '/icons/close_white.svg'
                        : '/icons/close_loyal.svg'
                    }
                    alt=''
                    width={0}
                    height={0}
                    className='h-[100%] w-auto'
                  />
                </button>
              </div>
              <NavList items={navItems} />
            </div>
          </div>
        )}
      </>
    );
  } else if (screenSize === 'md') {
    return (
      <div>
        <div className='flex h-[100%] items-center justify-between'>
          <User className='me-[16px]' border whiteTheme={isHome} />
          <div className='w-[32px]'>
            {isCollapsed ? (
              <button
                className='h-[100%]'
                onClick={() => {
                  setIsCollapsed(false);
                }}
              >
                <Image
                  src={
                    isHome
                      ? '/icons/collapse_nav_white.svg'
                      : '/icons/collapse_nav_loyal.svg'
                  }
                  alt=''
                  width={0}
                  height={0}
                  className='h-[100%] w-auto'
                />
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsCollapsed(true);
                }}
                className={clsx(
                  isHome ? 'border-white' : 'border-primary ',
                  'aspect-square w-[32px] self-end rounded-[8px] border-[1px] p-[8px]',
                )}
              >
                <Image
                  src={
                    isHome ? '/icons/close_white.svg' : '/icons/close_loyal.svg'
                  }
                  alt=''
                  width={0}
                  height={0}
                  className='h-[100%] w-auto'
                />
              </button>
            )}
          </div>
        </div>
        {!isCollapsed && (
          <div className='absolute left-0 right-0 top-[90px] h-[300px] border-t-[1px] bg-white px-[20px] py-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'>
            <NavList items={navItems} />
          </div>
        )}
      </div>
    );
  } else if (screenSize === 'lg') {
    return (
      <div className='flex items-center justify-between'>
        {!isHome && (
          <div className='flex items-center'>
            <NavList items={navItems} />
          </div>
        )}
        <User
          className='me-[16px] ms-[35px]'
          optionDropdown
          border
          whiteTheme={isHome}
        />
      </div>
    );
  }
}

export function NavList({ items }: { items: NavItem[] }) {
  return (
    <ul className='md:flex md:h-[100%] md:w-[100%] md:flex-col md:flex-wrap md:content-start md:justify-between lg:flex-row'>
      {items.map((item) => (
        <NavItem key={item.text} {...item} />
      ))}
    </ul>
  );
}

export function NavItem(props: NavItem) {
  const { text, imgSrc, imgAlt, logout, href, children } = props;

  const [showingChildren, setShowingChildren] = useState(false);
  const { screenSize, loaded } = useScreenSize();
  const childrenRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const active = href === pathname;
  const isMdScreen = screenSize === 'md';
  const isLgScreen = screenSize === 'lg';
  const childrenActive = !!children?.find((item) => item.href === pathname);

  useEffect(() => {
    if (!loaded) return;
    if ((!isLgScreen && childrenActive) || isMdScreen) {
      setShowingChildren(true);
    }
  }, [loaded, childrenActive, isLgScreen, isMdScreen]);

  useOnClickOutside(childrenRef, () => setShowingChildren(false));

  const handleClick = () => {
    if (children) {
      if (!isMdScreen) setShowingChildren(!showingChildren);
    } else {
      router.push(href);
    }
  };

  if (screenSize === 'lg') {
    return (
      !logout && (
        <div ref={childrenRef} className='relative'>
          <li
            onClick={handleClick}
            className={clsx(
              'mx-[20px] text-[20px] hover:cursor-pointer hover:underline',
              (active || childrenActive) && 'text-primary underline',
            )}
          >
            {text}
          </li>
          {children && showingChildren && (
            <ul className='absolute left-0 mt-[8px] overflow-hidden whitespace-nowrap rounded-[8px] border-[1px] bg-white'>
              {children?.map((item) => (
                <li
                  key={item.text}
                  onClick={() => router.push(item.href)}
                  className='flex h-[40px] cursor-pointer items-center px-[12px] hover:bg-primary/[.1] focus:bg-primary/[.1]'
                >
                  {item.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      )
    );
  }

  return (
    <>
      <li
        onClick={handleClick}
        className={clsx(
          'flex items-center justify-between rounded-[8px] px-[20px] py-[16px] hover:cursor-pointer hover:bg-primary/[.1] md:max-w-[300px]',
          active && 'bg-primary/[.1]',
          !children ? 'md:w-[100%]' : 'md:min-w-[30%]',
        )}
      >
        <div className='flex items-center'>
          <Image
            src={active || childrenActive ? getActiveIcon(imgSrc) : imgSrc}
            alt={imgAlt}
            width={0}
            height={0}
            className='h-[100%] w-auto'
          />
          <h6
            className={clsx(
              'ms-[16px] font-[500]',
              logout
                ? 'text-red-500'
                : active
                ? 'text-primary'
                : 'text-[#696969]',
            )}
          >
            {text}
          </h6>
        </div>
        {children && (
          <Image
            src={
              showingChildren
                ? getActiveIcon('/icons/collapse.svg')
                : '/icons/collapse.svg'
            }
            alt=''
            width={0}
            height={0}
            className='h-auto w-auto md:hidden'
          />
        )}
      </li>
      {children && showingChildren && (
        <div className='ms-[32px]'>
          <NavList items={children} />
        </div>
      )}
    </>
  );
}

type UserProps = {
  border?: boolean;
  className?: string;
  whiteTheme?: boolean;
  optionDropdown?: boolean;
};

export function User(props: UserProps) {
  const { border, className, whiteTheme, optionDropdown } = props;

  const [showingOption, setShowingOption] = useState(false);
  const optionRef = useRef(null);

  useOnClickOutside(optionRef, () => setShowingOption(false));

  const handleUserClick = () => {
    if (optionDropdown) setShowingOption(!showingOption);
  };

  return (
    <div
      ref={optionRef}
      onClick={handleUserClick}
      className={clsx(
        border &&
          (whiteTheme
            ? 'border-[1px] border-white'
            : 'border-[1px] border-primary'),
        'relative flex items-center rounded-full hover:cursor-pointer',
        className,
      )}
    >
      <Image
        src={whiteTheme ? '/images/user_white.svg' : '/images/user_loyal.svg'}
        alt=''
        width={0}
        height={0}
        className='aspect-square h-[100%] w-auto rounded-full'
      />
      <div
        className={clsx(
          whiteTheme && 'text-white',
          'my-[2px] me-[24px] ms-[12px] flex flex-col justify-between',
        )}
      >
        <p className='text-[12px]'>Welcome</p>
        <h6 className='text-[16px] font-[500]'>Username</h6>
      </div>
      {optionDropdown && (
        <>
          <Image
            src={
              showingOption
                ? getActiveIcon('/icons/collapse_grey.svg')
                : '/icons/collapse_grey.svg'
            }
            alt=''
            width={0}
            height={0}
            className='me-[12px] h-[100%] w-auto'
          />
          {showingOption && (
            <ul className='absolute left-0 top-[52px] mt-[8px] w-[172px] overflow-hidden whitespace-nowrap rounded-[8px] border-[1px] bg-white'>
              <li
                onClick={() => {
                  console.log('clicked');
                }}
                className='flex h-[44px] cursor-pointer items-center px-[12px] hover:bg-primary/[.1] hover:text-primary focus:bg-primary'
              >
                <Image
                  src='/icons/user_profile.svg'
                  alt=''
                  width={0}
                  height={0}
                  className='me-[16px] h-[24px] w-auto'
                />
                <p className='font-[500]'>User Profile</p>
              </li>
              <li
                onClick={() => {
                  console.log('clicked');
                }}
                className='flex h-[44px] cursor-pointer items-center px-[12px] text-red-500 hover:bg-primary/[.1] focus:bg-primary'
              >
                <Image
                  src='/icons/logout.svg'
                  alt=''
                  width={0}
                  height={0}
                  className='me-[16px] h-[24px] w-auto'
                />
                <p className='font-[500]'>Log out</p>
              </li>
            </ul>
          )}
        </>
      )}
    </div>
  );
}
