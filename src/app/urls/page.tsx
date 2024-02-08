'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import '../css/index.css';
import MyUrlList from '@/components/my-url-list';
import { myUrlListData } from '@/services/url.service';

type URLsPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function URLsPage(props: URLsPageProps) {
  const { searchParams } = props;
  const [isSortCollapsed, setIsSortCollapsed] = React.useState(true);
  const [currentSortOption, setCurrentSortOption] = React.useState('Latest');
  const sortOption = ['Latest', 'Oldest', 'Most Clicked', 'Least Clicked'];
  const swithSortOption = (option: string) => {
    setIsSortCollapsed(true);
    setCurrentSortOption(option);
  };

  return (
    <div className='px-[80px] pt-[60px]'>
      <div className='flex items-end justify-between'>
        <div>
          <h1 className='text-[60px] font-bold text-primary'>My URLs</h1>
          <p className='text-[28px] text-primary'>
            Effortlessly organize and access your shortened URLs
          </p>
        </div>
        <div className='flex items-center space-x-2 rounded-lg bg-primary/20 px-5 py-2'>
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
            <p className='text-xl font-semibold text-primary'>1120</p>
            <p className='text-primary'>clicks on your links today</p>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='flex justify-between'>
          <div className='flex w-[25vw] items-center rounded-lg border-[0.5px] border-[#7E7E7E] py-3 pl-2'>
            <Image
              src='/icons/search.svg'
              alt='Search icon'
              width={0}
              height={0}
              className='h-5 w-auto'
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
        </div>
      </div>
      <MyUrlList myUrlList={myUrlListData} />
    </div>
  );
}

export default URLsPage;
