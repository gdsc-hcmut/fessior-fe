'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { sidebarItems } from '@/libs/sidebar-content';

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
  const [iconPath, setIconPath] = useState(
    `/icons/sidebar/inactive/${item.iconFilename}`,
  );

  const handleMouseEnter = (state: string) => {
    return () => {
      setIconPath(`/icons/sidebar/${state}/${item.iconFilename}`);
    };
  };

  return (
    <Link
      href={item.path}
      key={item.text}
      className={clsx(
        isActive && 'bg-primary',
        'flex h-10 items-center space-x-2 rounded-lg px-2 hover:bg-primary 2xl:h-[44px] 3xl:h-[48px]',
      )}
      onMouseEnter={handleMouseEnter('active')}
      onMouseLeave={handleMouseEnter('inactive')}
    >
      <Image
        src={isActive ? `/icons/sidebar/active/${item.iconFilename}` : iconPath}
        alt={item.imgAlt}
        width={0}
        height={0}
        className='h-5 w-auto 2xl:h-[24px]'
      />
      <p
        className={clsx(
          'font-medium hover:text-white 3xl:text-xl',
          isActive ? 'text-white' : 'text-primary',
        )}
      >
        {item.text}
      </p>
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className='fixed left-0 top-[85.6px] flex h-full w-[18vw] flex-col space-y-3 bg-white px-4 pt-10 shadow-[6px_6px_15px_0_rgba(64,79,104,0.05)] 2xl:w-[17w] 2xl:space-y-5 2xl:px-7 3xl:w-[16vw]'>
      {sidebarItems.map((item, idx) => (
        <div key={idx}>
          <h3 className='mb-2 text-[18px] font-semibold text-primary 2xl:mb-3 3xl:text-xl'>
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
