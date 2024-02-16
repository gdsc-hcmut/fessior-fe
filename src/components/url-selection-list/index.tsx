import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useIsOverflow } from '@/hooks/useIsOverflow';

type UrlSelectionListProps = {
  isDomain: boolean;
  selectionList: string[];
};

export default function UrlSelectionList(props: UrlSelectionListProps) {
  const { isDomain, selectionList } = props;
  const ref = useRef<HTMLDivElement | null>(null);

  const isOverflow = useIsOverflow(ref);

  if (selectionList.length === 0) return;

  return (
    <div
      ref={ref}
      className='ml-3 flex max-w-[40vw] items-center space-x-1 overflow-hidden rounded-lg border-[0.5px] border-primary px-3 py-2'
    >
      <p className='mr-2 whitespace-nowrap text-xs font-semibold'>
        Chosen {isDomain ? 'domain' : 'category'}:
      </p>
      {selectionList.map((item, index) => (
        <div
          key={index}
          className='flex items-center space-x-1 rounded-lg bg-primary px-2 py-1 text-xs text-white'
        >
          <p>{item}</p>
          <Image
            src='/icons/header/close_white.svg'
            alt='Close icon'
            width={0}
            height={0}
            className='h-auto w-2'
          />
        </div>
      ))}
      {isOverflow && (
        <div className='group relative overflow-visible'>
          <div className='flex h-6 w-6 items-center justify-center rounded-lg bg-primary'>
            <Image
              src='/icons/url/more_horiz.svg'
              alt='More icon'
              width={0}
              height={0}
              className='h-auto w-5'
            />
          </div>
        </div>
      )}
    </div>
  );
}
