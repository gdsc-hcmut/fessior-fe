import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useUrlModalStore } from '@/store/url-modal';
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

  const { setShowEnableModal, demoEnable } = useUrlModalStore();

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
    <div className='relative flex w-full flex-col justify-between rounded-lg bg-white px-5 py-5 shadow-[0_2px_4px_0_rgba(11,40,120,0.25)] md:flex-row'>
      <div className='absolute left-0 top-4 h-9 w-2 bg-primary' />
      <div className='mb-7 flex flex-col md:mb-0'>
        <div className='flex items-center space-x-2'>
          <label className='inline-flex cursor-pointer items-center'>
            <input
              type='checkbox'
              value=''
              className='peer sr-only'
              checked={demoEnable}
              onChange={() => setShowEnableModal(true)}
            />
            <div className="peer relative h-6 w-11 rounded-full bg-white pl-1 text-white after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#0F9D58] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 rtl:peer-checked:after:-translate-x-full dark:bg-[#db4437]" />
          </label>
          <p className='truncate text-xl font-semibold text-primary md:w-[50vw] 2xl:w-[26vw] 3xl:text-2xl'>
            {url.domain}/{url.slug}
          </p>
        </div>
        <p className='mt-5 truncate md:mt-4 md:w-[70vw] lg:w-[60vw] xl:font-medium 2xl:w-[26vw]'>
          {url.originalUrl}
        </p>
        <div className='mt-5 flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-x-6 md:space-y-0 2xl:mt-9'>
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
