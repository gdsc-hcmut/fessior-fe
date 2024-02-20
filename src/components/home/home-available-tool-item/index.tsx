import { clsx } from 'clsx';
import Image from 'next/image';

import Icon from '@/types/icon-enum';
import { getIcon } from '@/utils/common';

type HomeAvailableToolItemProps = {
  index: number;
  name: string;
  iconFilenames: string;
  onClick: (index: number) => void;
  active?: boolean;
  className?: string;
};

export default function HomeAvailableToolItem(
  props: HomeAvailableToolItemProps,
) {
  const { name, index, iconFilenames, className, onClick, active } = props;
  const ToolItemClass = clsx(
    'mb-[16px] h-[60px] items-center justify-between rounded-[8px] px-[16px] hover:cursor-pointer hover:shadow-[0px_4px_47.08px_0px_rgba(11,40,120,0.10)] xl:flex',
    active
      ? 'flex shadow-[0px_4px_47.08px_0px_rgba(11,40,120,0.10)]'
      : 'hidden',
    className,
  );
  const nameClass = clsx(
    'text-[20px] font-[700]',
    active ? 'text-primary' : 'text-royal-300',
  );
  const activeBulletClass = clsx(
    'h-[16px] w-[16px] rounded-full bg-primary',
    active || 'hidden',
  );
  return (
    <div onClick={() => onClick(index)} className={ToolItemClass}>
      <div className='flex items-center'>
        <div className='flex min-w-[60px] items-center justify-between'>
          <Image
            src={getIcon(
              '/icons/home',
              iconFilenames,
              active ? Icon.ACTIVE : Icon.INACTIVE,
            )}
            alt='tool'
            width={0}
            height={0}
            className='h-[28px] w-[54px]'
          />
        </div>
        <p className={nameClass}>{name}</p>
      </div>
      <div className={activeBulletClass}></div>
    </div>
  );
}
