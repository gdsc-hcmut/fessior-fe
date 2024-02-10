'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';

import '../css/index.css';
import MyUrlList from '@/components/my-url-list';
import Pagination from '@/components/pagination';
import { myUrlListData } from '@/services/url.service';

type URLsPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function URLsPage(props: URLsPageProps) {
  const { searchParams } = props;
  const [isSortCollapsed, setIsSortCollapsed] = useState<boolean>(true);
  const [currentSortOption, setCurrentSortOption] = useState<string>('Latest');
  const sortOption = ['Latest', 'Oldest', 'Most Clicked', 'Least Clicked'];
  const swithSortOption = (option: string) => {
    setIsSortCollapsed(true);
    setCurrentSortOption(option);
  };
  const [page, setPage] = useState<number>(1);

  return (
    <div className='relative px-10 pt-[48px] xl:pt-10 2xl:px-[60px] 2xl:pt-[60px] 3xl:px-[80px]'>
      <div className='flex items-end justify-between'>
        <div>
          <h1 className='text-[40px] font-bold text-primary 2xl:text-[48px] 3xl:text-[60px]'>
            My URLs
          </h1>
          <p className='text-primary xl:text-xl 2xl:text-[24px] 3xl:text-[28px]'>
            Effortlessly organize and access your shortened URLs
          </p>
        </div>
        <div className='hidden items-center space-x-2 rounded-lg bg-primary/20 px-3 py-1 xl:flex 2xl:px-5 2xl:py-2'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white'>
            <Image
              src='/icons/click.svg'
              alt='Click icon'
              width={0}
              height={0}
              className='h-6 w-auto'
            />
          </div>
          <div className='flex flex-col'>
            <p className='font-semibold text-primary 2xl:text-xl'>1120</p>
            <p className='text-[14px] text-primary 2xl:text-base'>
              clicks on your links today
            </p>
          </div>
        </div>
        <button className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary xl:hidden'>
          <Image
            src='/icons/url/collections_bookmark.svg'
            alt='Sidebar toggle'
            width={0}
            height={0}
            className='h-7 w-auto'
          />
        </button>
      </div>
      <div className='mt-8'>
        <div className='flex justify-between'>
          <div className='flex w-[420px] items-center rounded-lg border-[0.5px] border-[#7E7E7E] py-2 pl-2 xl:w-[30vw] xl:py-3 3xl:w-[25vw]'>
            <Image
              src='/icons/search.svg'
              alt='Search icon'
              width={0}
              height={0}
              className='h-4 w-auto xl:h-5'
            />
            <div className='ml-2 mr-3 h-full w-[1px] bg-[#696969]/30' />
            <input
              className='text-primary'
              id='my-urls-search-bar'
              placeholder='Search by slug or long URL'
            />
          </div>
          <div className='relative flex items-center'>
            <button
              onClick={() => setIsSortCollapsed(!isSortCollapsed)}
              className='mr-3 flex w-[135px] items-center justify-between rounded-lg border-[0.5px] border-[#7E7E7E]/70 px-3 py-2'
            >
              <p>{currentSortOption}</p>
              <Image
                src={
                  isSortCollapsed
                    ? '/icons/header/inactive/collapse_grey.svg'
                    : '/icons/header/active/collapse_grey.svg'
                }
                alt='Collapse icon'
                width={0}
                height={0}
                className='h-2 w-auto'
              />
            </button>
            <button className='flex items-center space-x-1 rounded-lg bg-primary px-3 py-2'>
              <Image
                src='/icons/filter_list.svg'
                alt='Filter icon'
                width={0}
                height={0}
                className='h-5 w-auto'
              />
              <p className='font-semibold text-white'>Filter</p>
            </button>
            <ul
              className={clsx(
                'absolute left-0 top-full flex w-[135px] flex-col items-start space-y-1 overflow-hidden rounded-lg pl-3 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] transition-[max-height,border] duration-500',
                isSortCollapsed ? 'max-h-0' : 'max-h-[100px]',
              )}
            >
              {sortOption.map(
                (option, idx) =>
                  option !== currentSortOption && (
                    <li
                      key={idx}
                      className={clsx(
                        idx == 0 ||
                          (idx == 1 &&
                            currentSortOption === 'Latest' &&
                            'pt-2'),
                        idx === sortOption.length - 1 && 'pb-2',
                        'w-full',
                      )}
                    >
                      <button
                        onClick={() => swithSortOption(option)}
                        className='w-full text-start'
                      >
                        {option}
                      </button>
                    </li>
                  ),
              )}
            </ul>
          </div>
        </div>
        <div className='mt-4 flex h-[42px] items-center'>
          <p className='font-semibold text-primary'>123 Results</p>
          <button className='ml-3 text-[#4D4D4D] underline'>
            Clear filter
          </button>
        </div>
      </div>
      <MyUrlList myUrlList={myUrlListData} />
      <Pagination
        totalCount={121}
        currentPage={page}
        pageSize={7}
        onPageChange={(pageNumber: number) => {
          setPage(pageNumber);
        }}
      />
      <div className='absolute bottom-[-1px] right-0'>
        <Image
          src='/images/url/decor.svg'
          alt='Decor image'
          width={0}
          height={0}
          className='h-auto w-[70vw] xl:w-[42vw]'
        />
      </div>
    </div>
  );
}

export default URLsPage;
