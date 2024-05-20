import { clsx } from 'clsx';
import Image from 'next/image';
import { useMemo } from 'react';

import { getIcon } from '@/utils/common';

import Icon from '@/types/icon-enum';

type AvailableToolItemProps = {
  index: number;
  name: string;
  iconFilenames: string;
  onClick: (index: number) => void;
  isActive?: boolean;
  className?: string;
};

export default function AvailableToolItem({
  name,
  index,
  iconFilenames,
  className,
  onClick,
  isActive,
}: AvailableToolItemProps) {
  const ToolItemClass = useMemo(
    () =>
      clsx(
        'mb-4 h-16 items-center justify-between rounded-lg px-4 hover:cursor-pointer hover:shadow-[0px_4px_47.08px_0px_rgba(11,40,120,0.10)] lg:flex',
        isActive ? 'flex shadow-[0px_4px_47.08px_0px_rgba(11,40,120,0.10)]' : 'hidden',
        className,
      ),
    [isActive, className],
  );

  const nameClass = useMemo(() => clsx('text-xl font-bold', isActive ? 'text-primary' : 'text-royal-300'), [isActive]);

  const activeBulletClass = useMemo(() => clsx('h-4 w-4 rounded-full bg-primary', isActive || 'hidden'), [isActive]);

  return (
    <div onClick={() => onClick(index)} className={ToolItemClass}>
      <div className='flex items-center'>
        <div className='flex min-w-[60px] items-center justify-between'>
          <Image
            src={getIcon('/icons/home', iconFilenames, isActive ? Icon.ACTIVE : Icon.INACTIVE)}
            alt='tool'
            width={0}
            height={0}
            className='h-7 w-12'
          />
        </div>
        <p className={nameClass}>{name}</p>
      </div>
      <div className={activeBulletClass}></div>
    </div>
  );
}
