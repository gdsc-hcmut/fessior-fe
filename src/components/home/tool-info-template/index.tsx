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
    <div className='mx-[20px] flex min-h-[100%] flex-grow flex-col overflow-hidden rounded-[8px] border-[0.5px] md:flex-row xl:mx-[40px]'>
      <div className='px-[24px] py-[28px] xl:p-[40px]'>
        <h4 className='mb-[12px] text-[32px] leading-[1.2] text-primary md:mb-[8px] xl:mb-0 xl:text-[40px]'>
          Introducing <br />
          <span className='text-[10vw] font-[700] md:text-[48px] xl:text-[60px]'>
            {name}
          </span>
        </h4>
        <Link href={url}>
          <Button
            disabled={!active}
            type='neutral'
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
        className='flex aspect-square w-[100%] flex-col items-center justify-center bg-cover md:justify-end md:pb-[36px] xl:aspect-auto xl:w-auto xl:min-w-[400px]'
      >
        {statistics}
      </div>
    </div>
  );
}
