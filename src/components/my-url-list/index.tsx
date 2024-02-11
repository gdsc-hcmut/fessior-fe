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

function UrlItemXL(props: UrlItemProps) {
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
    <div className='relative flex flex-shrink-0 items-center overflow-hidden rounded-lg bg-white px-5 py-3 shadow-[0_2px_4px_0_rgba(11,40,120,0.25)] 2xl:px-7 2xl:py-4 3xl:px-10 3xl:py-5'>
      <div className='absolute left-0 top-0 h-full w-1 flex-[0] bg-primary' />
      <div className='mr-5 flex flex-[2] overflow-hidden 2xl:flex-[1.9] 3xl:flex-[1.5]'>
        <p className='w-[96%] truncate text-[14px] font-semibold text-primary 2xl:text-base'>
          https://{url.domain}/{url.slug}
        </p>
      </div>
      <div className='mr-5 flex flex-[2.4] overflow-hidden 2xl:flex-[2.5]'>
        <p className='w-[96%] truncate text-[14px] font-semibold 2xl:text-base'>
          {url.originalUrl}
        </p>
      </div>
      <p className='mr-5 flex flex-[1] text-[14px] 2xl:text-base'>
        {url.totalClicks} {url.totalClicks > 0 ? 'clicks' : 'click'}
      </p>
      <p className='mr-5 flex flex-[1] text-[14px] font-semibold 2xl:text-base'>
        {url.createdAt}
      </p>
      <div
        ref={ref}
        className='mr-5 flex flex-[1.8] space-x-1 2xl:space-x-2 3xl:flex-[2.2]'
      >
        {categories.map((category) => (
          <div
            key={category}
            className='rounded-lg bg-primary px-2 py-1 text-[14px] text-white 2xl:text-base 3xl:px-3 3xl:py-2'
          >
            {category}
          </div>
        ))}
        {isDivFull && (
          <div className='flex h-[29px] w-[29px] items-center justify-center rounded-lg bg-primary 2xl:h-8 2xl:w-8 3xl:h-10 3xl:w-10'>
            <Image
              src='/icons/url/more_horiz.svg'
              alt='More icon'
              width={0}
              height={0}
              className='h-5 w-auto 2xl:h-6'
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
        <p className='text-[14px] font-semibold 2xl:text-base'>
          {url.enable ? 'Enable' : 'Disable'}
        </p>
      </div>
      <div className='flex flex-[1] space-x-1 3xl:space-x-2'>
        <button className='flex h-6 w-6 items-center justify-center rounded-lg border-[1px] border-primary 2xl:h-7 2xl:w-7 3xl:h-8 3xl:w-8'>
          <Image
            src='/icons/content_copy.svg'
            alt='Copy icon'
            width={0}
            height={0}
            className='h-4 w-auto 3xl:h-5'
          />
        </button>
        <button className='flex h-6 w-6 items-center justify-center rounded-lg border-[1px] border-primary 2xl:h-7 2xl:w-7 3xl:h-8 3xl:w-8'>
          <Image
            src='/icons/url/edit.svg'
            alt='Edit icon'
            width={0}
            height={0}
            className='h-4 w-auto 3xl:h-5'
          />
        </button>
        <button className='flex h-6 w-6 items-center justify-center rounded-lg border-[1px] border-primary 2xl:h-7 2xl:w-7 3xl:h-8 3xl:w-8'>
          <Image
            src='/icons/url/delete.svg'
            alt='Delete icon'
            width={0}
            height={0}
            className='h-4 w-auto 3xl:h-5'
          />
        </button>
      </div>
    </div>
  );
}
function UrlItemMD(props: UrlItemProps) {
  const { url } = props;
  const mobile_ref = useRef<HTMLDivElement | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isDivFull, setIsDivFull] = useState(false);
  const [width, setWidth] = useState<number | null>(0);

  useLayoutEffect(() => {
    function updateSize() {
      if (mobile_ref.current) {
        setWidth(mobile_ref.current.offsetWidth);
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const calculateBoxWidth = (text: string) => {
    const fontSize = 12;
    const padding = 8;
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
            ? width * 0.8
            : mobile_ref.current
            ? mobile_ref.current.clientWidth * 0.8
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
    <div className='relative flex w-full justify-between rounded-lg bg-white px-5 py-5 shadow-[0_2px_4px_0_rgba(11,40,120,0.25)]'>
      <div className='absolute left-0 top-4 h-9 w-2 bg-primary' />
      <div className='flex flex-col'>
        <div className='flex items-center space-x-2'>
          <div
            className={clsx(
              'h-6 w-6 rounded-full',
              url.enable ? 'bg-[#7BCFA9]' : 'bg-[#ED9D97]',
            )}
          />
          <p className='w-[50vw] truncate text-xl font-semibold text-primary'>
            https://{url.domain}/{url.slug}
          </p>
        </div>
        <p className='mt-5 w-[70vw] truncate lg:w-[60vw]'>{url.originalUrl}</p>
        <div className='mt-5 flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-x-6 md:space-y-0'>
          <div className='flex items-center space-x-1'>
            <Image
              src='/icons/click.svg'
              alt='Click icon'
              width={0}
              height={0}
              className='h-5 w-auto'
            />
            <p className='font-semibold'>Total clicks: {url.totalClicks}</p>
          </div>
          <div className='flex items-center space-x-1'>
            <Image
              src='/icons/url/event_note.svg'
              alt='Calendar icon'
              width={0}
              height={0}
              className='h-5 w-auto'
            />
            <p className='font-semibold'>Created at: {url.createdAt}</p>
          </div>
        </div>
        <div className='mt-3 flex items-center space-x-1'>
          <Image
            src='/icons/url/tag.svg'
            alt='Calendar icon'
            width={0}
            height={0}
            className='h-5 w-auto'
          />
          <p className='font-semibold'>Category:</p>
          <div
            ref={mobile_ref}
            className='ml-3 flex w-full items-center space-x-1'
          >
            {categories.map((category) => (
              <div
                key={category}
                className='rounded-lg bg-primary px-2 py-1 text-[12px] text-white'
              >
                {category}
              </div>
            ))}
            {isDivFull && (
              <div className='flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-primary'>
                <Image
                  src='/icons/url/more_horiz.svg'
                  alt='More icon'
                  width={0}
                  height={0}
                  className='h-5 w-auto'
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-end space-y-2 self-start'>
        <button className='flex h-6 w-6 items-center justify-center rounded-lg border-[1px] border-primary'>
          <Image
            src='/icons/content_copy.svg'
            alt='Copy icon'
            width={0}
            height={0}
            className='h-4 w-auto'
          />
        </button>
        <button className='flex h-6 w-6 items-center justify-center rounded-lg border-[1px] border-primary'>
          <Image
            src='/icons/url/edit.svg'
            alt='Edit icon'
            width={0}
            height={0}
            className='h-4 w-auto'
          />
        </button>
        <button className='flex h-6 w-6 items-center justify-center rounded-lg border-[1px] border-primary'>
          <Image
            src='/icons/url/delete.svg'
            alt='Delete icon'
            width={0}
            height={0}
            className='h-4 w-auto'
          />
        </button>
      </div>
    </div>
  );
}
export default function MyUrlList(props: MyUrlListProps) {
  const { myUrlList } = props;

  return (
    <div className='relative z-[5] mt-3 xl:mt-9'>
      <div className='hidden flex-shrink-0 space-x-5 px-5 xl:flex 2xl:px-7 3xl:px-10'>
        <p className='flex flex-[2] text-[14px] font-semibold text-primary 2xl:flex-[1.9] 2xl:text-base 3xl:flex-[1.5] 3xl:text-xl'>
          Shortened link
        </p>
        <p className='flex flex-[2.4] text-[14px] font-semibold text-primary 2xl:flex-[2.5] 2xl:text-base 3xl:text-xl'>
          Original link
        </p>
        <p className='flex flex-[1] text-[14px] font-semibold text-primary 2xl:text-base 3xl:text-xl'>
          Total clicks
        </p>
        <p className='flex flex-[1] text-[14px] font-semibold text-primary 2xl:text-base 3xl:text-xl'>
          Created at
        </p>
        <p className='flex flex-[1.8] text-[14px] font-semibold text-primary 2xl:text-base 3xl:flex-[2.2] 3xl:text-xl'>
          Category
        </p>
        <p className='flex flex-[0.8] text-[14px] font-semibold text-primary 2xl:text-base 3xl:text-xl'>
          Status
        </p>
        <div className='flex flex-[1]' />
      </div>
      <div className='mt-9 hidden flex-col space-y-3 xl:flex'>
        {myUrlList.map((url, idx) => (
          <UrlItemXL key={idx} url={url} />
        ))}
      </div>
      <div className='flex flex-col space-y-5 xl:hidden'>
        {myUrlList.map((url, idx) => (
          <UrlItemMD key={idx} url={url} />
        ))}
      </div>
    </div>
  );
}
