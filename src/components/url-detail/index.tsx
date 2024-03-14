import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { MyUrlv1 } from '@/types/url-type';

import UrlButton from '../button/url-button';

type UrlDetailProps = {
  url: MyUrlv1;
};

function UrlDetailsCard(props: UrlDetailProps) {
  const { url } = props;
  const mobile_ref = useRef<HTMLDivElement | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isDivFull, setIsDivFull] = useState(false);
  const [width, setWidth] = useState<number | null>(0);

  const createdAtObject = new Date(url.createdAt);
  const formattedDate = createdAtObject.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

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
      const curCategories = url.categories ? [...url.categories] : [];
      const newCategories = [];

      for (let i = 0; i < curCategories.length; i++) {
        const boxWidth = calculateBoxWidth(curCategories[i]);
        if (
          currentWidth + boxWidth <=
          (width && width != 0
            ? width * 0.8
            : mobile_ref.current
            ? mobile_ref.current.clientWidth * 0.8
            : 0)
        ) {
          newCategories.push(curCategories[i]);
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
  }, [width, url.categories, isDivFull]);

  return (
    <div className='relative w-full flex-col justify-between rounded-lg bg-white px-5 py-5 shadow-[0_2px_4px_0_rgba(11,40,120,0.25)]'>
      <div className='absolute left-0 top-4 h-9 w-2 bg-primary' />
      <div className='mb-7 flex flex-col'>
        <div className='flex items-center space-x-2'>
          <div
            className={clsx(
              'h-6 w-6 rounded-full',
              url.isActive ? 'bg-[#7BCFA9]' : 'bg-[#ED9D97]',
            )}
          />
          <p className='truncate text-xl font-semibold text-primary'>
            {url.domain}/{url.slug}
          </p>
        </div>
        <p className='mt-5 truncate lg:w-[60vw]'>{url.originalUrl}</p>
        <div className='mt-5 flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-x-6 md:space-y-0'>
          <div className='flex items-center space-x-1'>
            <Image
              src='/icons/click.svg'
              alt='Click icon'
              width={0}
              height={0}
              className='h-5 w-auto'
            />
            <p className='font-semibold'>
              Total clicks:{' '}
              {url.clickCount ? url.clickCount : url.totalClicks?.length || 0}
            </p>
          </div>
          <div className='flex items-center space-x-1'>
            <Image
              src='/icons/url/event_note.svg'
              alt='Calendar icon'
              width={0}
              height={0}
              className='h-5 w-auto'
            />
            <p className='font-semibold'>Created at: {formattedDate}</p>
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
            {categories.length === 0 && (
              <div className='flex items-center space-x-1'>
                <Image
                  src='/icons/url/tray.svg'
                  alt='No categories'
                  width={0}
                  height={0}
                  className='h-6 w-auto'
                />
                <p className='font-medium'>No chosen categories</p>
              </div>
            )}
            {categories.map((category, idx) => (
              <div
                key={idx}
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
      <UrlButton
        copyContent={`https://${url.domain}/${url.slug}`}
        editedUrl={url}
        isDetail={true}
      />
    </div>
  );
}

export default UrlDetailsCard;
