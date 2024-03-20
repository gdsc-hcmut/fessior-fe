import Link from 'next/link';
import { ReactNode } from 'react';

import Button from '@/components/button';

type ToolInfoTemplateProps = {
  name: string;
  url: string;
  active?: boolean;
  decorImgSrc: string;
  description: ReactNode;
  statistics?: ReactNode;
};

export default function ToolInfoTemplate(props: ToolInfoTemplateProps) {
  const { name, url, active, decorImgSrc, description, statistics } = props;

  return (
    <div className='flex min-h-[100%] flex-grow flex-col overflow-hidden rounded-[8px] border-[0.5px] md:flex-row lg:mx-[40px] lg:flex-col xl:flex-row'>
      <div className='flex-grow px-[24px] py-[28px] lg:p-[40px]'>
        <h4 className='mb-[12px] text-[32px] leading-[1.2] text-primary md:mb-[8px] lg:mb-0 lg:text-[40px]'>
          Introducing <br />
          <span className='text-[10vw] font-[700] md:text-[48px] lg:text-[60px]'>
            {name}
          </span>
        </h4>
        <Link href={url}>
          <Button
            disabled={!active}
            type='neutral-positive'
            onClick={() => {}}
            className='mb-[20px] mt-[12px] text-[20px] font-[700] leading-5'
          >
            {active ? 'Access Tool' : 'Coming Soon'}
          </Button>
        </Link>
        {description}
      </div>
      <div
        style={{ backgroundImage: `url('${decorImgSrc}')` }}
        className='flex aspect-square w-[100%] flex-col items-center justify-center rounded-[8px] bg-cover bg-center md:justify-end md:pb-[36px] lg:aspect-auto lg:h-[200px] lg:w-auto lg:min-w-[400px] lg:justify-center lg:pb-0 xl:h-auto xl:justify-end xl:pb-[36px]'
      >
        {statistics}
      </div>
    </div>
  );
}
