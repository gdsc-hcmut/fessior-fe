import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { MyUrl } from '@/types/url-type';

type MyUrlListProps = {
  myUrlList: MyUrl[];
};

type UrlItemProps = {
  url: MyUrl;
};

function UrlItem(props: UrlItemProps) {
  const { url } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isDivFull, setIsDivFull] = useState(false);
  const [width, setWidth] = useState<number | null>(0);

  useLayoutEffect(() => {
    function updateSize() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const calculateBoxWidth = (text: string) => {
    const fontSize = 16;
    const padding = 12;
    const dummyDiv = document.createElement('div');
    dummyDiv.style.fontSize = `${fontSize}px`;
    dummyDiv.style.padding = `${padding}px`;
    dummyDiv.style.width = 'fit-content';
    dummyDiv.textContent = text;

    document.body.appendChild(dummyDiv);
    const elementWidth = dummyDiv.clientWidth + 1;
    document.body.removeChild(dummyDiv);

    return elementWidth;
  };

  useEffect(() => {
    const renderBoxes = () => {
      let currentWidth = 0;
      const newCategories = [];

      for (let i = 0; i < url.category.length; i++) {
        const boxWidth = calculateBoxWidth(url.category[i]);
        if (
          currentWidth + boxWidth <=
          (width && width != 0
            ? width * 0.86
            : ref.current
            ? ref.current.clientWidth * 0.86
            : 0)
        ) {
          newCategories.push(url.category[i]);
          currentWidth += boxWidth;
        } else {
          setIsDivFull(true);
          break;
        }
      }

      setCategories(newCategories);
    };

    setIsDivFull(false);
    renderBoxes();
  }, [width, url.category]);

  return (
    <div className='relative flex flex-shrink-0 items-center overflow-hidden rounded-lg px-10 py-5 shadow-[0_2px_4px_0_rgba(11,40,120,0.25)]'>
      <div className='absolute left-0 top-0 h-full w-1 flex-[0] bg-primary' />
      <div className='mr-5 flex flex-[1.5] overflow-hidden'>
        <p className='w-[96%] truncate font-semibold text-primary'>
          https://{url.domain}/{url.slug}
        </p>
      </div>
      <div className='mr-5 flex flex-[2.5] overflow-hidden'>
        <p className='w-[96%] truncate font-semibold'>{url.originalUrl}</p>
      </div>
      <p className='mr-5 flex flex-[1]'>
        {url.totalClicks} {url.totalClicks > 0 ? 'clicks' : 'click'}
      </p>
      <p className='mr-5 flex flex-[1] font-semibold'>{url.createdAt}</p>
      <div ref={ref} className='mr-5 flex flex-[2.2] space-x-2'>
        {categories.map((category) => (
          <div
            key={category}
            className='rounded-lg bg-primary px-3 py-2 text-white'
          >
            {category}
          </div>
        ))}
        {isDivFull && (
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary'>
            <Image
              src='/icons/url/more_horiz.svg'
              alt='More icon'
              width={0}
              height={0}
              className='h-6 w-auto'
            />
          </div>
        )}
      </div>
      <div className='mr-5 flex flex-[0.8] items-center space-x-1'>
        <div
          className={clsx(
            'h-5 w-5 rounded-full',
            url.enable ? 'bg-[#7BCFA9]' : 'bg-[#ED9D97]',
          )}
        />
        <p className='font-semibold'>{url.enable ? 'Enable' : 'Disable'}</p>
      </div>
      <div className='flex flex-[1] space-x-2'>
        <button className='flex h-8 w-8 items-center justify-center rounded-lg border-[1px] border-primary'>
          <Image
            src='/icons/content_copy.svg'
            alt='Copy icon'
            width={0}
            height={0}
            className='h-5 w-auto'
          />
        </button>
        <button className='flex h-8 w-8 items-center justify-center rounded-lg border-[1px] border-primary'>
          <Image
            src='/icons/url/edit.svg'
            alt='Edit icon'
            width={0}
            height={0}
            className='h-5 w-auto'
          />
        </button>
        <button className='flex h-8 w-8 items-center justify-center rounded-lg border-[1px] border-primary'>
          <Image
            src='/icons/url/delete.svg'
            alt='Delete icon'
            width={0}
            height={0}
            className='h-5 w-auto'
          />
        </button>
      </div>
    </div>
  );
}
export default function MyUrlList(props: MyUrlListProps) {
  const { myUrlList } = props;

  return (
    <div className='mt-9'>
      <div className='flex flex-shrink-0 space-x-5 px-10'>
        <p className='flex flex-[1.5] text-xl font-semibold text-primary'>
          Shortened link
        </p>
        <p className='flex flex-[2.5] text-xl font-semibold text-primary'>
          Original link
        </p>
        <p className='flex flex-[1] text-xl font-semibold text-primary'>
          Total clicks
        </p>
        <p className='flex flex-[1] text-xl font-semibold text-primary'>
          Created at
        </p>
        <p className='flex flex-[2.2] text-xl font-semibold text-primary'>
          Category
        </p>
        <p className='flex flex-[0.8] text-xl font-semibold text-primary'>
          Status
        </p>
        <div className='flex flex-[1]' />
      </div>
      <div className='mt-9 flex flex-col space-y-3'>
        {myUrlList.map((url, idx) => (
          <UrlItem key={idx} url={url} />
        ))}
      </div>
    </div>
  );
}
