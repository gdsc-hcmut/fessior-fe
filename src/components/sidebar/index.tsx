import Image from 'next/image';
import Link from 'next/link';

import { sidebarItems } from '@/libs/sidebar-content';

export default function Sidebar() {
  return (
    <aside className='fixed left-0 top-[85.6px] flex h-full w-[16vw] flex-col space-y-5 bg-white px-7 pt-10 shadow-[6px_6px_15px_0_rgba(64,79,104,0.05)]'>
      {sidebarItems.map((item, idx) => (
        <div key={idx}>
          <h3 className='mb-3 text-xl font-semibold text-primary'>
            {item.name}
          </h3>
          <div className='flex flex-col space-y-2'>
            {item.children.map((child) => (
              <Link
                href={child.path}
                key={child.text}
                className='flex h-[48px] items-center space-x-2 px-2'
              >
                <Image
                  src={`/icons/sidebar/active/${child.iconFilename}`}
                  alt={child.imgAlt}
                  width={0}
                  height={0}
                  className='h-[24px] w-auto'
                />
                <p className='text-xl font-medium text-primary'>{child.text}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
