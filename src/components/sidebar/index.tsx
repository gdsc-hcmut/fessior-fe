'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { useScreenSize } from '@/hooks';
import { sidebarItems } from '@/libs/sidebar-content';
import ScreenSize from '@/types/screen-size-enum';

type SidebarItemProps = {
  item: {
    text: string;
    iconFilename: string;
    imgAlt: string;
    path: string;
  };
};

export function SidebarItem(props: SidebarItemProps) {
  const { item } = props;
  const pathname = usePathname();
  const isActive = pathname === item.path;
  const [isIconActive, setIsIconActive] = useState(isActive);

  const handleMouseEnter = (state: boolean) => {
    setIsIconActive(state);
    const optionName = document.getElementById(item.iconFilename);
    if (optionName && state === true) {
      optionName.style.color = 'white';
    } else if (optionName && state === false && !isActive) {
      optionName.style.color = 'var(--primary)';
    }
  };

  return (
    <Link
      href={item.path}
      key={item.text}
      className={clsx(
        isActive && 'bg-primary',
        'flex h-10 items-center space-x-2 rounded-lg px-2 hover:bg-primary 2xl:h-[44px] 3xl:h-[48px]',
      )}
      onMouseEnter={() => handleMouseEnter(true)}
      onMouseLeave={() => handleMouseEnter(false)}
    >
      <div>
        <Image
          src={`icons/sidebar/active/${item.iconFilename}`}
          alt={item.imgAlt}
          width={0}
          height={0}
          className={clsx(
            'h-5 w-auto 2xl:h-[24px]',
            !isActive && !isIconActive && 'hidden',
          )}
        />
        <Image
          src={`icons/sidebar/inactive/${item.iconFilename}`}
          alt={item.imgAlt}
          width={0}
          height={0}
          className={clsx(
            'h-5 w-auto 2xl:h-[24px]',
            (isActive || isIconActive) && 'hidden',
          )}
        />
      </div>
      <p
        id={item.iconFilename}
        className={clsx(
          'font-medium 3xl:text-[18px]',
          isActive ? 'text-white' : 'text-primary',
        )}
      >
        {item.text}
      </p>
    </Link>
  );
}
type SidebarProps = {
  isCollapsed: boolean;
  hideSidebar: () => void;
};
export default function Sidebar(props: SidebarProps) {
  const { screenSize } = useScreenSize();
  const { isCollapsed, hideSidebar } = props;

  if (screenSize === ScreenSize.SM || screenSize === ScreenSize.MD) {
    return (
      <aside
        onClick={() => hideSidebar()}
        className={clsx(
          'fixed bottom-0 left-0 right-0 top-0 z-20 bg-black/40',
          isCollapsed ? 'scale-0' : 'animate-fade',
        )}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={clsx(
            'translation-all flex h-full w-[72%] max-w-[280px] transform flex-col bg-white px-5 pt-7 duration-300 min-[400px]:w-[60%]',
            isCollapsed ? 'translate-x-[-100%]' : 'translate-x-0',
          )}
        >
          <button
            onClick={() => hideSidebar()}
            className='flex h-7 w-7 items-center justify-center self-end rounded-lg border-[1px] border-primary'
          >
            <Image
              src='icons/url/chevron_primary.svg'
              alt='Close sidebar'
              width={0}
              height={0}
              className='h-6 w-auto'
            />
          </button>
          {sidebarItems.map((item, idx) => (
            <div key={idx} className='mb-5'>
              <h3 className='mb-3 text-[18px] font-semibold text-primary lg:mb-2 2xl:mb-3'>
                {item.name}
              </h3>
              <div className='flex flex-col space-y-2 lg:space-y-1 2xl:space-y-2'>
                {item.children.map((child) => (
                  <SidebarItem item={child} key={child.text} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    );
  }
  return (
    <aside className='fixed left-0 top-[85.6px] hidden h-full w-[24vw] flex-col space-y-3 bg-white px-4 pt-10 shadow-[6px_6px_15px_0_rgba(64,79,104,0.05)] lg:flex xl:w-[18vw] 2xl:w-[17w] 2xl:space-y-5 2xl:px-7 3xl:w-[16vw]'>
      {sidebarItems.map((item, idx) => (
        <div key={idx}>
          <h3 className='mb-2 text-[18px] font-semibold text-primary 2xl:mb-3'>
            {item.name}
          </h3>
          <div className='flex flex-col space-y-1 2xl:space-y-2'>
            {item.children.map((child) => (
              <SidebarItem item={child} key={child.text} />
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
