'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import Sidebar from '@/components/sidebar';
import UrlDetailsCard from '@/components/url-detail';
import GraphCard from '@/components/url-detail/GraphCard';
import InfoCard from '@/components/url-detail/InfoCard';
import QRCard from '@/components/url-detail/QRCard';
import { MyUrlv1 } from '@/types/url-type';

type URLDetailPageProps = {
  params: { id: string };
};

const demoInfo: MyUrlv1 = {
  _id: '658454c86598130b04c71dc3',
  originalUrl:
    'https://www.prisma.io/dataguide/managing-databases/introduction-database-caching#:~:text=Read%2Dthrough,-In%20a%20read&text=In%20this%20strategy%2C%20the%20application,return%20it%20to%20the%20application.',
  slug: 'shortened1dsd',
  domain: 'localhost:3030',
  organizationId: '65597d23c7331a178466282b',
  createdBy: '6530eb74ce1fc917a49731dc',
  updatedBy: '6530eb74ce1fc917a49731dc',
  createdAt: '2023-12-21T15:07:52.972Z',
  updatedAt: '2023-12-23T16:14:07.326Z',
  isActive: true,
  clickCount: 1,
  categories: ['gdsc', 'test', 'test2', 'yooooooo', 'aaaa', 'bb'],
};

function URLDetailPage(props: URLDetailPageProps) {
  const {
    params: { id },
  } = props;

  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div>
      <Sidebar
        isCollapsed={isCollapsed}
        hideSidebar={() => setIsCollapsed(true)}
      />
      <div className='pt-[80px] lg:pl-[24vw] xl:pl-[18vw] xl:pt-[85.6px] 2xl:pl-[17vw] 3xl:pl-[16vw]'>
        <div className='relative px-5 pt-10 md:px-10 md:pt-[48px] xl:pt-10 2xl:px-[60px] 2xl:pt-[60px] 3xl:px-[80px]'>
          <Link
            href={'/urls'}
            className='flex w-fit items-center space-x-1 rounded-[20px] border-[1px] border-primary px-3 py-1'
          >
            <Image
              src='/icons/url/chevron_primary.svg'
              alt='Back Icon'
              width={0}
              height={0}
              className='h-5 w-auto'
            />
            <p className='font-medium text-primary'>My URL</p>
          </Link>
          <div className='mb-5 mt-2 flex items-end justify-between'>
            <div className='flex w-full items-center justify-between md:w-fit 2xl:text-[48px] 3xl:text-[60px]'>
              <h1 className='text-[40px] font-bold text-primary'>My URLs</h1>
              <button
                onClick={() => setIsCollapsed(false)}
                className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary md:hidden'
              >
                <Image
                  src='/icons/url/collections_bookmark.svg'
                  alt='Sidebar toggle'
                  width={0}
                  height={0}
                  className='h-7 w-auto'
                />
              </button>
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
            <button
              onClick={() => setIsCollapsed(false)}
              className='hidden h-10 w-10 items-center justify-center rounded-lg bg-primary md:flex min-[960px]:hidden'
            >
              <Image
                src='/icons/url/collections_bookmark.svg'
                alt='Sidebar toggle'
                width={0}
                height={0}
                className='h-7 w-auto'
              />
            </button>
          </div>
          <div className='flex-col space-y-4'>
            <UrlDetailsCard url={demoInfo} />
            <div className='flex flex-col space-y-4 tablet:flex-row tablet:space-x-2 tablet:space-y-0'>
              <QRCard />
              <InfoCard />
            </div>
            <GraphCard />
            <div className='h-10' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default URLDetailPage;
