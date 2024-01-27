import { clsx } from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useContext } from 'react';

import CloseButton from '@/components/close-button';
import AuthContext from '@/contexts/authContext';
import useAuthRouter from '@/hooks/useAuthRouter';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import useScreenSize from '@/hooks/useScreenSize';
import { navItems } from '@/libs/api/nav-items';
import { NavItem } from '@/libs/api/types/nav-item';
import AuthType from '@/types/auth-type-enum';
import Icon from '@/types/icon-enum';
import ScreenSize from '@/types/screen-size-enum';
import { getIcon } from '@/utils/common';

type NavProps = {
  isHome?: boolean;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
};

type NavListProps = { items: NavItem[] };

type UserProps = {
  border?: boolean;
  className?: string;
  whiteTheme?: boolean;
  optionDropdown?: boolean;
};

type AuthButtonProps = {
  isHome?: boolean;
  isLogin?: boolean;
  className?: string;
};

export function AuthButton(props: AuthButtonProps) {
  const { isHome, isLogin, className } = props;

  const authRouter = useAuthRouter();

  const buttonClass = clsx(
    'h-[30px] md:h-[36px] lg:px-[24px] lg:h-[44px] rounded-[16px] md:rounded-full border-[1px] px-[20px] text-center align-middle text-[12px] md:text-[16px] font-[500] tracking-[0.32px]',
    isHome
      ? isLogin
        ? 'text-white bg-transparent border-white'
        : 'text-primary bg-white border-white'
      : isLogin
      ? 'text-primary bg-white border-primary'
      : 'text-white bg-primary border-primary',
    className,
  );

  return (
    <button
      onClick={() => {
        authRouter(isLogin ? AuthType.LOGIN : AuthType.SIGN_UP);
      }}
      className={buttonClass}
    >
      {isLogin ? 'Log in' : 'Sign up'}
    </button>
  );
}

export default function Nav(props: NavProps) {
  const { meProfile, isAuthStatusReady } = useContext(AuthContext);

  const { isHome, isCollapsed, setIsCollapsed } = props;
  const { screenSize, loaded } = useScreenSize();

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
          <User className='me-[28px]' border whiteTheme={isHome} />
          <div className='flex w-[32px] items-center'>{collapseButton}</div>
        </div>
        <div
          className={clsx(
            isCollapsed
              ? 'h-0 border-none py-0'
              : 'h-[300px] border-t-[1px] bg-white py-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]',
            'absolute left-0 right-0 top-[72px] overflow-hidden px-[20px] transition-all duration-500',
          )}
        >
          <div className='h-[236px]'>
            <NavList items={navItems} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='flex max-w-[800px] flex-grow items-center justify-end'>
      {!isHome && (
        <div className='flex flex-grow items-center'>
          <NavList items={navItems} />
        </div>
      )}
      <User
        className='me-[12px] ms-[20px]'
        optionDropdown
        border
        whiteTheme={isHome}
      />
    </div>
  );
}

export function NavList(props: NavListProps) {
  const { items } = props;

  return (
    <ul className='md:flex md:h-[100%] md:w-[100%] md:flex-col md:flex-wrap md:content-start md:justify-between lg:flex-row lg:justify-around'>
      {items.map((item) => (
        <NavItem key={item.text} {...item} />
      ))}
    </ul>
  );
}

export function NavItem(props: NavItem) {
  const { text, iconFilename, imgAlt, isLogout, path, children } = props;

  const [showingChildren, setShowingChildren] = useState(false);
  const { screenSize, loaded } = useScreenSize();
  const childrenRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const { logout } = useContext(AuthContext);

  const active = path === pathname;
  const isMdScreen = screenSize === ScreenSize.MD;
  const isLgScreen = screenSize === ScreenSize.LG;
  const childrenActive = !!children?.find((item) => item.path === pathname);

  useEffect(() => {
    if (!loaded) return;
    if ((!isLgScreen && childrenActive) || isMdScreen) {
      setShowingChildren(true);
    }
  }, [loaded, childrenActive, isLgScreen, isMdScreen]);

  useOnClickOutside(childrenRef, () => setShowingChildren(false));

  const handleClick = () => {
    if (isLogout) {
      logout();
    }

    if (children) {
      if (!isMdScreen) setShowingChildren(!showingChildren);
    } else {
      router.push(path);
    }
  };

  const lgItemTitleClass = clsx(
    'text-[18px] tracking-[0.4px] hover:cursor-pointer hover:underline',
    (active || childrenActive) && 'text-primary underline',
  );

  const smItemClass = clsx(
    'relative flex flex-col md:max-w-[250px] md:ms-[20px]',
    children ? '' : 'md:w-[100%]',
  );

  const smItemTitleClass = clsx(
    'flex items-center justify-between rounded-[8px] px-[20px] py-[16px] transition-all hover:cursor-pointer',
    active && (isLogout ? 'bg-red/[.1]' : 'bg-royal-300/[.1]'),
    isLogout ? 'hover:bg-red/[.1]' : ' hover:bg-royal-300/[.1]',
  );

  const itemTitleClass = clsx(
    'ms-[16px] font-[500]',
    isLogout ? 'text-red' : active ? 'text-primary' : 'text-[#696969]',
  );

  const childrenContainerClass = clsx(
    'ms-[32px] overflow-hidden transition-[height] duration-500 md:transition-none',
    showingChildren ? 'h-[112px]' : 'h-0',
  );

  const itemIcon = getIcon(
    '/icons/header',
    iconFilename,
    isLogout ? null : active || childrenActive ? Icon.ACTIVE : Icon.INACTIVE,
  );

  const collapseIcon = getIcon(
    '/icons/header',
    'collapse.svg',
    showingChildren ? Icon.ACTIVE : Icon.INACTIVE,
  );

  if (screenSize === ScreenSize.LG) {
    return (
      !isLogout && (
        <div ref={childrenRef} className='relative'>
          <li onClick={handleClick} className={lgItemTitleClass}>
            {text}
          </li>
          {children && (
            <ul
              className={clsx(
                'absolute left-0 mt-[8px] overflow-hidden whitespace-nowrap rounded-[8px] bg-white transition-all duration-500',
                showingChildren ? 'h-[80px] border-[1px]' : 'h-0 border-white',
              )}
            >
              {children?.map((item) => (
                <li
                  key={item.text}
                  onClick={() => router.push(item.path)}
                  className='flex h-[40px] cursor-pointer items-center px-[12px] hover:bg-royal-300/[.1] focus:bg-royal-300/[.1]'
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
      <li onClick={handleClick} className={smItemClass}>
        <div className={smItemTitleClass}>
          <div className='flex items-center'>
            <Image
              src={itemIcon}
              alt={imgAlt}
              width={0}
              height={0}
              className='h-[100%] w-auto'
            />
            <h6 className={itemTitleClass}>{text}</h6>
          </div>
          {children && (
            <Image
              src={collapseIcon}
              alt=''
              width={0}
              height={0}
              className='h-auto w-auto md:hidden'
            />
          )}
        </div>
        <div className='relative'>
          {children && (
            <div className={childrenContainerClass}>
              <NavList items={children} />
            </div>
          )}
        </div>
      </li>
    </>
  );
}

export function User(props: UserProps) {
  const { border, className, whiteTheme, optionDropdown } = props;

  const [showingOption, setShowingOption] = useState(false);
  const { screenSize } = useScreenSize();
  const optionRef = useRef(null);

  const { logout, meProfile } = useContext(AuthContext);

  useOnClickOutside(optionRef, () => setShowingOption(false));

  const handleUserClick = () => {
    if (optionDropdown) setShowingOption(!showingOption);
  };

  const userClass = clsx(
    border &&
      (whiteTheme
        ? 'border-[1px] border-white'
        : 'border-[1px] border-primary'),
    'relative flex items-center rounded-full hover:cursor-pointer lg:min-w-[170px] md:min-w-[145px]',
    className,
  );

  const usernameClass = clsx(
    whiteTheme && 'text-white',
    'my-[2px] md:me-[20px] lg:me-[16px] ms-[12px] md:ms-[8px] flex flex-col justify-between',
  );

  const optionClass = clsx(
    'absolute left-0 top-[52px] mt-[8px] w-[172px] overflow-hidden whitespace-nowrap rounded-[8px] bg-white duration-500 transition-[max-height,border]',
    showingOption ? 'max-h-[88px] border-[1px]' : 'max-h-0 border-white',
  );

  const userAvatar =
    meProfile && meProfile.picture
      ? meProfile.picture
      : whiteTheme
      ? '/images/header/user_white.svg'
      : '/images/header/user_royal.svg';

  const collapseIcon = getIcon(
    '/icons/header/',
    whiteTheme ? 'collapse_white.svg' : 'collapse_grey.svg',
    showingOption ? Icon.ACTIVE : Icon.INACTIVE,
  );

  return (
    <div ref={optionRef} onClick={handleUserClick} className={userClass}>
      <Image
        src={userAvatar}
        alt=''
        width={
          screenSize === ScreenSize.SM
            ? 52
            : screenSize === ScreenSize.MD
            ? 42
            : screenSize === ScreenSize.LG
            ? 52
            : 0
        }
        height={
          screenSize === ScreenSize.SM
            ? 52
            : screenSize === ScreenSize.MD
            ? 42
            : screenSize === ScreenSize.LG
            ? 52
            : 0
        }
        className='aspect-square h-[52px] w-auto rounded-full md:h-[42px] lg:h-[48px]'
      />
      <div className={usernameClass}>
        <p className='mb-[-4px] text-[12px] tracking-[0.24px]'>Welcome</p>
        <h6 className='text-[20px] font-[500] tracking-[0.4px] md:text-[16px] md:tracking-[0.32px] lg:text-[16px]'>
          {meProfile?.firstName}
        </h6>
      </div>
      <div className='flex-grow'></div>
      {optionDropdown && (
        <>
          <Image
            src={collapseIcon}
            alt=''
            width={0}
            height={0}
            className='me-[12px] h-[100%] w-auto'
          />

          <ul className={optionClass}>
            <li
              onClick={() => {}}
              className='flex h-[44px] cursor-pointer items-center px-[12px] transition-all hover:bg-royal-300/[.1] hover:text-primary focus:bg-primary'
            >
              <Image
                src='/icons/header/user_profile.svg'
                alt=''
                width={0}
                height={0}
                className='me-[16px] h-[24px] w-auto'
              />
              <p className='font-[500]'>User Profile</p>
            </li>
            <li
              onClick={logout}
              className='flex h-[44px] cursor-pointer items-center px-[12px] text-red transition-all hover:bg-red/[.1] focus:bg-primary'
            >
              <Image
                src='/icons/header/logout.svg'
                alt=''
                width={0}
                height={0}
                className='me-[16px] h-[24px] w-auto'
              />
              <p className='font-[500]'>Log out</p>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
