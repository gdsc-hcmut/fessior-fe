import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { Tool } from '@/services/tool.service';

type HomeToolItemProps = {
  tool: Tool;
  className?: string;
};

export default function HomeToolItem(props: HomeToolItemProps) {
  const { tool, className } = props;
  return (
    <Link
      href={tool.url}
      className={clsx(
        'mb-[12px] flex w-[48%] flex-col justify-between rounded-[20px] bg-white p-[16px] pt-[24px] shadow-[0px_20px_20px_0px_rgba(11,40,120,0.20)] md:mb-[20px] md:flex-row md:items-center md:justify-start md:py-[24px] lg:max-w-[400px] lg:flex-row lg:rounded-[40px] lg:p-[18px]',
        tool.active
          ? 'cursor-pointer delay-75 ease-in-out hover:scale-105'
          : 'cursor-default',
        className,
      )}
    >
      <div className='relative mb-[8px] inline-flex h-[40px] max-w-[80px] items-center md:mb-0 md:me-[20px] lg:h-auto lg:min-w-[80px] lg:max-w-none'>
        <Image
          src={tool.imgSrc[0]}
          alt={tool.imgAlt}
          width={0}
          height={0}
          className='relative z-[1] h-[100%] w-auto'
        />
        <Image
          src={tool.imgSrc[1]}
          alt={tool.imgAlt}
          width={0}
          height={0}
          className={clsx('absolute h-[24px] w-auto', tool.secondaryImgPos)}
        />
      </div>
      <div className='lg:flex-grow'>
        <h6
          className={clsx(
            'text-[18px] font-[700] md:text-[24px]',
            tool.active ? 'text-primary' : 'text-disable',
          )}
        >
          {tool.name}
        </h6>
        <p className='hidden text-[14px] leading-[24px] text-[#656C73] lg:block'>
          Link shortening service with free-of-charge advanced management
          features
        </p>
      </div>
    </Link>
  );
}
