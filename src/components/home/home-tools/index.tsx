import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { Tool, tools } from '@/services/tool.service';
import Icon from '@/types/icon-enum';
import { getIcon } from '@/utils/common';

type HomeToolItemProps = {
  tool: Tool;
  className?: string;
};

export function HomeToolItem(props: HomeToolItemProps) {
  const { tool, className } = props;
  const toolItemClass = clsx(
    'relative mb-[12px] flex w-[48%] flex-col justify-between overflow-hidden rounded-[20px] bg-white p-[16px] pt-[24px] shadow-[0px_20px_20px_0px_rgba(11,40,120,0.20)] md:mb-[20px] md:flex-row md:items-center md:justify-start md:py-[24px] lg:flex-row lg:rounded-[40px] lg:p-[18px] xl:max-w-[400px]',
    tool.active
      ? 'cursor-pointer transition-all hover:scale-105'
      : 'cursor-default',
    className,
  );
  const primaryIconClass = clsx(
    tool.primaryIconClass
      ? tool.primaryIconClass
      : 'relative z-[1] h-auto w-[100%]',
  );
  const toolNameClass = clsx(
    'text-[18px] font-[700] md:text-[24px]',
    tool.active ? 'text-primary' : 'text-royal-300',
  );
  return (
    <Link href={tool.url} className={toolItemClass}>
      <div className='relative me-[20px] flex aspect-square h-[36px] w-[36px] items-center lg:h-[72px] lg:w-auto'>
        <Image
          src={getIcon(
            '/icons/home',
            tool.iconFilenames[0],
            tool.active ? Icon.ACTIVE : Icon.INACTIVE,
          )}
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
        <p className='hidden text-[14px] leading-[24px] lg:block'>
          Link shortening service with free-of-charge advanced management
          features
        </p>
      </div>
      {!tool.active && (
        <div className='absolute bottom-0 left-0 right-0 top-0 z-[10] flex items-center justify-center bg-[rgba(157,169,201,0.90)] opacity-0 transition-all hover:opacity-100'>
          <p className='text-[24px] font-[700] text-white'>Stay tuned</p>
        </div>
      )}
    </Link>
  );
}

export default function HomeTools() {
  return (
    <div
      data-aos='zoom-in'
      className='relative z-[2] flex flex-wrap items-stretch justify-between xl:mx-[20px] xl:w-[840px]'
    >
      {tools.map((tool) => (
        <HomeToolItem key={tool.name} tool={tool} />
      ))}
    </div>
  );
}
