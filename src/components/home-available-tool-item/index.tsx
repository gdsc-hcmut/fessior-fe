import { clsx } from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

type HomeAvailableToolItemProps = {
  index: number;
  name: string;
  imgSrc: string;
  onClick: (index: number) => void;
  active?: boolean;
  className?: string;
};

export default function HomeAvailableToolItem(
  props: HomeAvailableToolItemProps,
) {
  const { name, index, imgSrc, active, className, onClick } = props;
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => onClick(index)}
      className={clsx(
        'mb-[16px] h-[60px] items-center justify-between rounded-[8px] px-[16px] hover:cursor-pointer',
        (active || isHovering) &&
          'flex shadow-[0px_4px_47.08px_0px_rgba(11,40,120,0.10)]',
        !active && 'hidden lg:flex',
        className,
      )}
    >
      <div className='flex items-center'>
        <div className='flex min-w-[60px] items-center justify-between'>
          <Image
            src={imgSrc}
            alt=''
            width={0}
            height={0}
            className='h-[28px] w-[54px]'
          />
        </div>
        <p
          className={clsx(
            'text-[20px] font-[700]',
            active ? 'text-primary' : 'text-[#252641]',
          )}
        >
          {name}
        </p>
      </div>
      <div
        className={clsx(
          'h-[16px] w-[16px] rounded-full bg-primary',
          active || 'hidden',
        )}
      ></div>
    </div>
  );
}
