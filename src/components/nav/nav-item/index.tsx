import clsx from 'clsx';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useRef, useContext, useEffect } from 'react';

import AuthContext from '@/contexts/authContext';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import useScreenSize from '@/hooks/useScreenSize';
import { NavItem } from '@/libs/api/types/nav-item';
import Icon from '@/types/icon-enum';
import ScreenSize from '@/types/screen-size-enum';
import { getIcon } from '@/utils/common';

import NavList from '../nav-list';

export default function NavItem(props: NavItem) {
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

  const lgChildrenListClass = clsx(
    'absolute left-0 mt-[8px] overflow-hidden whitespace-nowrap rounded-[8px] bg-white transition-all duration-500',
    showingChildren ? 'h-[80px] border-[1px]' : 'h-0 border-white',
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
            <ul className={lgChildrenListClass}>
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
