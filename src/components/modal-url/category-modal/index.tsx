'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

import useScreenSize from '@/hooks/useScreenSize';
import { useUrlModalStore } from '@/store/url-modal';
import ScreenSize from '@/types/screen-size-enum';

type FilterSelectionProps = {
  isDomain: boolean;
  optionList: string[];
};

function FilterSelection(props: FilterSelectionProps) {
  const { isDomain, optionList } = props;
  const { screenSize } = useScreenSize();

  if (optionList.length !== 0) {
    return (
      <div className='flex flex-col space-y-2'>
        <p className='font-medium'>
          Chosen {isDomain ? 'domains' : 'categories'}
        </p>
        <div className='flex items-center space-x-1'>
          <div className='flex h-6 w-6 items-center justify-center rounded-full bg-primary/20'>
            <Image
              src='/icons/url/tray.svg'
              alt='Tray icon'
              width={0}
              height={0}
              className='h-5 w-auto'
            />
          </div>
          <p className='text-[#808080]'>
            You haven’t chosen any {isDomain ? 'domains' : 'categories'}
          </p>
        </div>
      </div>
    );
  }

  if (screenSize === ScreenSize.SM) {
    return (
      <div>
        <div className='mb-2 flex w-full justify-between'>
          <p className='font-medium'>
            Chosen {isDomain ? 'domains' : 'categories'}
          </p>
          <button className='text-xs text-[#4D4D4D] underline'>
            Clear selection
          </button>
        </div>
        <div className='flex flex-wrap gap-x-1 gap-y-2'>
          {optionList.map((option, index) => (
            <div
              key={index}
              className='flex items-center space-x-1 rounded-lg bg-primary px-2 py-1 text-xs text-white md:px-3'
            >
              <p>{option}</p>
              <Image
                src='/icons/header/close_white.svg'
                alt='Close icon'
                width={0}
                height={0}
                className='h-auto w-2'
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className='flex flex-wrap gap-x-1 gap-y-2'>
      <p className={clsx('font-medium', isDomain ? 'mr-[23px]' : 'mr-2')}>
        Chosen {isDomain ? 'domains' : 'categories'}
      </p>
      {optionList.map((option, index) => (
        <div
          key={index}
          className='flex items-center space-x-1 rounded-lg bg-primary px-2 py-1 text-xs text-white'
        >
          <p>{option}</p>
          <Image
            src='/icons/header/close_white.svg'
            alt='Close icon'
            width={0}
            height={0}
            className='h-auto w-2'
          />
        </div>
      ))}
      <button className='text-xs text-[#4D4D4D] underline'>
        Clear selection
      </button>
    </div>
  );
}

export default function CategoryModal() {
  const { setShowCategoryModal, isShow } = useUrlModalStore();
  const [isDomain, setIsDomain] = useState(true);

  const demoDomains = [
    'gic.gdsc.app',
    'elog.bkoisp.info',
    'bk.oisp.info',
    'gdsc.app',
    'furl.one',
  ];
  const demoDomains1 = [
    'gic.gdsc.app',
    'elog.bkoisp.info',
    'gdsc.bkoi.info',
    'bk.oisp.info',
    'gdsc.app',
    'furl.one',
    'demo.app',
    'demo.link',
    'demo.com',
  ];
  const demoCategories = [
    'event',
    'spring recruitment 2024',
    'gic2023',
    'go for git',
    'marketing',
  ];

  return (
    <div
      onClick={() => setShowCategoryModal(false)}
      className={clsx(
        'fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-black/40 transition-all duration-300 md:items-start md:justify-end md:bg-transparent',
        !isShow.category ? 'translate-x-[100%]' : 'translate-x-0',
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='relative flex w-[380px] overflow-hidden rounded-lg bg-white shadow-[0_2px_4px_0_rgba(11,40,120,0.25)] md:absolute md:right-10 md:top-[111.6px] md:w-[430px] xl:top-[125.6px]'
      >
        <div className='flex w-full flex-col p-5 2xl:px-7'>
          <p className='mb-3 text-2xl font-semibold text-primary md:mb-4 xl:text-2xl 2xl:mb-8 2xl:text-[28px]'>
            Filter
          </p>
          <div className='flex flex-col space-y-4'>
            <FilterSelection isDomain={true} optionList={demoDomains} />
            <FilterSelection isDomain={false} optionList={demoCategories} />
          </div>
          <div className='mt-5 w-full 2xl:mt-6'>
            <div className='flex w-full justify-between'>
              <div className='flex'>
                <button
                  onClick={() => setIsDomain(true)}
                  className={clsx(
                    isDomain
                      ? 'border-b-none flex w-[81px] justify-center rounded-lg rounded-ee-none rounded-es-none border-[1px] border-primary border-b-white bg-white py-1 md:w-[89px]'
                      : 'flex w-[81px] justify-center py-1 md:w-[89px]',
                  )}
                >
                  <p className='font-semibold text-primary'>Domain</p>
                </button>
                <button
                  onClick={() => setIsDomain(false)}
                  className={clsx(
                    !isDomain
                      ? 'border-b-none flex w-[81px] justify-center rounded-lg rounded-ee-none rounded-es-none border-[1px] border-primary border-b-white bg-white py-1 md:w-[89px]'
                      : 'flex w-[81px] justify-center py-1 md:w-[89px]',
                  )}
                >
                  <p className='m-auto font-semibold text-primary'>Category</p>
                </button>
              </div>
              <div className='mb-[10px] flex w-[150px] items-center space-x-1 border-b-[0.5px] border-[#6D7EAE] py-1 max-[359px]:hidden'>
                <Image
                  src='/icons/search.svg'
                  alt='Search icon'
                  width={0}
                  height={0}
                  className='h-4 w-auto'
                />
                <input
                  className='w-full text-xs text-primary outline-none'
                  id='category-modal-search-bar'
                  placeholder={
                    isDomain
                      ? 'Search by domain name'
                      : 'Search by category name'
                  }
                />
              </div>
            </div>
            <div
              className={clsx(
                'show-scrollbar mt-[-1.2px] flex h-[188px] flex-col space-y-1 overflow-y-scroll rounded-lg border-[1px] border-primary p-3 lg:mt-[-1px]',
                isDomain && 'rounded-ss-none',
              )}
            >
              {demoDomains1.map((domain, index) => (
                <div
                  key={index}
                  className='flex cursor-pointer items-center space-x-1'
                >
                  <input
                    type='checkbox'
                    id={domain}
                    name={domain}
                    value={domain}
                    className='category-checkbox'
                  />
                  <label htmlFor={domain}>{domain}</label>
                </div>
              ))}
            </div>
          </div>
          <div className='mt-4'>
            <button className='rounded-[20px] bg-primary px-3 py-1 font-semibold text-white md:px-5 md:py-2'>
              Apply Filter
            </button>
          </div>
        </div>
        <button
          onClick={() => setShowCategoryModal(false)}
          className='absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#E6E6E6] xl:h-8 xl:w-8'
        >
          <Image
            src='/icons/url/close_gray.svg'
            alt='Close icon'
            width={0}
            height={0}
            className='h-3 w-auto'
          />
        </button>
      </div>
    </div>
  );
}
