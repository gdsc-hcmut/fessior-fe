import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import { tools } from '@/data/tools';
import { getIcon } from '@/utils/common';

import Icon from '@/types/icon-enum';
import { Tool } from '@/types/tool-type';

type HomeToolItemProps = {
  tool: Tool;
  className?: string;
};

export function HomeToolItem({ tool, className }: HomeToolItemProps) {
  const toolItemClass = useMemo(
    () =>
      clsx(
        'relative mb-3 flex w-[48%] flex-col justify-between overflow-hidden rounded-3xl bg-white p-4 pt-6 shadow-[0px_20px_20px_0px_rgba(11,40,120,0.20)] md:mb-5 md:flex-row md:items-center md:justify-start md:py-6 lg:flex-row lg:rounded-[40px] lg:p-5 xl:max-w-[400px]',
        tool.active ? 'cursor-pointer transition-all hover:scale-105' : 'cursor-default',
        className,
      ),
    [tool.active, className],
  );

  const primaryIconClass = useMemo(
    () => clsx(tool.primaryIconClass ? tool.primaryIconClass : 'relative z-[1] h-auto w-full'),
    [tool.primaryIconClass],
  );

  const toolNameClass = useMemo(
    () => clsx('text-lg font-bold md:text-2xl', tool.active ? 'text-primary' : 'text-royal-300'),
    [tool.active],
  );

  return (
    <Link href={tool.url} className={toolItemClass}>
      <div className='relative me-5 flex aspect-square h-9 w-9 items-center lg:h-[72px] lg:w-auto'>
        <Image
          src={getIcon('/icons/home', tool.iconFilenames[0], tool.active ? Icon.ACTIVE : Icon.INACTIVE)}
          alt={tool.imgAlt}
          width={0}
          height={0}
          className={primaryIconClass}
        />
        <Image
          src={'icons/home/' + tool.iconFilenames[1]}
          alt={tool.imgAlt}
          width={0}
          height={0}
          className={clsx('absolute h-auto', tool.secondaryIconClass)}
        />
      </div>
      <div className='xl:flex-grow'>
        <h6 className={toolNameClass}>{tool.name}</h6>
        <p className='hidden text-sm lg:block'>{tool.description}</p>
      </div>
      {!tool.active && (
        <div className='absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-[rgba(157,169,201,0.90)] opacity-0 transition-all hover:opacity-100'>
          <p className='text-2xl font-bold text-white'>Stay tuned</p>
        </div>
      )}
    </Link>
  );
}

export default function HomeTools() {
  return (
    <div
      data-aos='zoom-in'
      className='relative z-[2] flex flex-wrap items-stretch justify-between xl:mx-5 xl:w-[840px]'
    >
      {tools.map((tool) => (
        <HomeToolItem key={tool.name} tool={tool} />
      ))}
    </div>
  );
}
