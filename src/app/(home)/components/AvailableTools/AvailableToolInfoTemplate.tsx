import Link from 'next/link';
import { ReactNode } from 'react';

import Button from '@/components/button';

type AvailableToolInfoTemplateProps = {
  name: string;
  url: string;
  active?: boolean;
  decorImgSrc: string;
  description: ReactNode;
  statistics?: ReactNode;
};

export default function AvailableToolInfoTemplate({
  name,
  url,
  active,
  decorImgSrc,
  description,
  statistics,
}: AvailableToolInfoTemplateProps) {
  return (
    <div className='flex min-h-full flex-grow flex-col overflow-hidden rounded-lg border-[0.5px] md:flex-row lg:mx-10 lg:flex-col xl:flex-row'>
      <div className='flex-grow px-6 py-7 lg:p-10'>
        <h4 className='mb-3 text-3xl text-primary md:mb-2 lg:mb-0 lg:text-4xl'>
          Introducing <br />
          <span className='text-[10vw] font-bold md:text-5xl lg:text-6xl'>{name}</span>
        </h4>
        <Link href={url}>
          <Button
            disabled={!active}
            type='neutral-positive'
            onClick={() => {}}
            className='mb-5 mt-3 text-xl font-bold leading-5'
          >
            {active ? 'Access Tool' : 'Coming Soon'}
          </Button>
        </Link>
        {description}
      </div>
      <div
        style={{ backgroundImage: `url('${decorImgSrc}')` }}
        className='flex aspect-square w-full flex-col items-center justify-center rounded-lg bg-cover bg-center md:justify-end md:pb-9 lg:aspect-auto lg:h-[200px] lg:w-auto lg:min-w-[400px] lg:justify-center lg:pb-0 xl:h-auto xl:justify-end xl:pb-9'
      >
        {statistics}
      </div>
    </div>
  );
}
