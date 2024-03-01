'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

import '../css/index.css';
import Loading from '@/components/Loading';
import CategoryModal from '@/components/modal-url/category-modal';
import DeleteLinkModal from '@/components/modal-url/delete-modal';
import EditSlugModal from '@/components/modal-url/edit-slug';
import MyUrlList from '@/components/my-url-list';
import Pagination from '@/components/pagination';
import Sidebar from '@/components/sidebar';
import UrlSelectionList from '@/components/url-selection-list';
import urlService, { myUrlListData } from '@/services/url.service';
import { useFilterOptionStore } from '@/store/filter-option';
import { useUserProfileStore } from '@/store/me';
import { useUrlModalStore } from '@/store/url-modal';
import SortOption from '@/types/sort-option-enum';
import { MyUrl, MyUrlv1 } from '@/types/url-type';

type URLsPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function URLsPage(props: URLsPageProps) {
  const { searchParams } = props;
  const [isSortCollapsed, setIsSortCollapsed] = useState<boolean>(true);
  const [currentSortOption, setCurrentSortOption] = useState<SortOption>(
    SortOption.LASTEST,
  );
  const sortOption = Object.values(SortOption);
  const switchSortOption = (
    e: React.MouseEvent<HTMLButtonElement>,
    option: SortOption,
  ) => {
    e.stopPropagation();
    setIsSortCollapsed(true);
    setCurrentSortOption(option);
  };
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [urlList, setUrlList] = useState<MyUrl[]>([...myUrlListData]);
  const [urlListV1, setUrlListV1] = useState<MyUrlv1[]>([]);
  const [filterUrlList, setFilterUrlList] = useState<MyUrl[]>([...urlList]);
  const [displayUrlList, setDisplayUrlList] = useState<MyUrl[]>(
    filterUrlList.slice((page - 1) * 7, 7 * page),
  );

  const { isShow, setShowCategoryModal } = useUrlModalStore();
  const { filterCategory, filterDomain, setFilterDomain, setFilterCategory } =
    useFilterOptionStore();
  const { curOrganizationId } = useUserProfileStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    const newfilterUrlList = myUrlListData.filter(
      (url) =>
        `https://${url.domain}/${url.slug}`.includes(searchText) ||
        url.originalUrl.includes(searchText),
    );
    setFilterUrlList(newfilterUrlList);
    setDisplayUrlList(newfilterUrlList.slice(0, 7));
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    setDisplayUrlList(
      filterUrlList.slice((pageNumber - 1) * 7, 7 * pageNumber),
    );
  };

  const fetchUrlList = async () => {
    const data = await urlService.getUrlListByOrganization({
      organizationId: curOrganizationId,
      page,
    });
    const newData = data.urls.map((url: MyUrlv1) => {
      return {
        ...url,
        category: [],
      };
    });
    setTotalPages(data.totalPages);
    setUrlListV1(newData);
    return data;
  };

  const { isLoading } = useQuery({
    queryKey: ['myUrls', curOrganizationId, page],
    queryFn: fetchUrlList,
    enabled: !!curOrganizationId,
  });
  console.log('data', urlListV1);

  return (
    <div
      onClick={() => {
        if (!isSortCollapsed) setIsSortCollapsed(true);
      }}
    >
      <Sidebar
        isCollapsed={isCollapsed}
        hideSidebar={() => setIsCollapsed(true)}
      />
      {isShow.edit && <EditSlugModal />}
      {isShow.delete && <DeleteLinkModal />}
      {isShow.category && <CategoryModal />}
      <div className='pt-[71.6px] lg:pl-[24vw] xl:pl-[18vw] xl:pt-[85.6px] 2xl:pl-[17vw] 3xl:pl-[16vw]'>
        <div className='relative px-5 pt-10 md:px-10 md:pt-[48px] xl:pt-10 2xl:px-[60px] 2xl:pt-[60px] 3xl:px-[80px]'>
          <div className='flex items-end justify-between'>
            <div className='w-full md:w-fit'>
              <div className='flex items-center justify-between 2xl:text-[48px] 3xl:text-[60px]'>
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
          <div className='mt-8'>
            <div className='flex justify-between'>
              <div className='flex w-[420px] items-center rounded-lg border-[0.5px] border-[#7E7E7E] py-2 pl-2 lg:w-[400px] xl:w-[30vw] xl:py-3 3xl:w-[25vw]'>
                <Image
                  src='/icons/url/search.svg'
                  alt='Search icon'
                  width={0}
                  height={0}
                  className='h-4 w-auto xl:h-5'
                />
                <div className='ml-2 mr-3 h-full w-[1px] bg-[#696969]/30' />
                <input
                  className='w-full pr-3 text-primary outline-none'
                  id='my-urls-search-bar'
                  placeholder='Search by slug or long URL'
                  onChange={handleSearch}
                />
              </div>
              <div className='relative hidden items-center md:flex'>
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
                <div className='relative'>
                  <button
                    onClick={() => setShowCategoryModal(true)}
                    className='flex items-center space-x-1 rounded-lg bg-primary px-3 py-2'
                  >
                    <Image
                      src='/icons/filter_list.svg'
                      alt='Filter icon'
                      width={0}
                      height={0}
                      className='h-5 w-auto'
                    />
                    <p className='font-semibold text-white'>Filter</p>
                  </button>
                  {(filterDomain.length > 0 || filterCategory.length > 0) && (
                    <div className='absolute right-[-8px] top-[-8px] flex h-6 w-6 items-center justify-center rounded-full border-[1px] border-primary bg-white text-xs font-semibold text-primary'>
                      {filterDomain.length + filterCategory.length}
                    </div>
                  )}
                </div>
                <ul
                  className={clsx(
                    'absolute left-0 top-full z-10 flex w-[135px] flex-col items-start space-y-1 overflow-hidden rounded-lg bg-white pl-3 shadow-[0_1px_4px_0_rgba(0,0,0,0.25)] transition-[max-height,border] duration-500',
                    isSortCollapsed ? 'max-h-0' : 'max-h-[100px]',
                  )}
                >
                  {sortOption.map(
                    (option, idx) =>
                      option !== currentSortOption && (
                        <li
                          key={idx}
                          className={clsx(
                            (idx == 0 ||
                              (idx == 1 &&
                                currentSortOption === SortOption.LASTEST)) &&
                              'pt-2',
                            (idx === sortOption.length - 1 ||
                              (idx == sortOption.length - 2 &&
                                currentSortOption ===
                                  SortOption.LEAST_CLICKED)) &&
                              'pb-2',
                            'w-full',
                          )}
                        >
                          <button
                            onClick={(e) => switchSortOption(e, option)}
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
            <div className='relative mt-4 flex items-center md:hidden'>
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
              <div className='relative'>
                <button
                  onClick={() => setShowCategoryModal(true)}
                  className='flex items-center space-x-1 rounded-lg bg-primary px-3 py-2'
                >
                  <Image
                    src='/icons/filter_list.svg'
                    alt='Filter icon'
                    width={0}
                    height={0}
                    className='h-5 w-auto'
                  />
                  <p className='font-semibold text-white'>Filter</p>
                </button>
                {(filterDomain.length > 0 || filterCategory.length > 0) && (
                  <div className='absolute right-[-8px] top-[-8px] flex h-6 w-6 items-center justify-center rounded-full border-[1px] border-primary bg-white text-xs font-semibold text-primary'>
                    {filterDomain.length + filterCategory.length}
                  </div>
                )}
              </div>
              <ul
                className={clsx(
                  'absolute left-0 top-full z-10 flex w-[135px] flex-col items-start space-y-1 overflow-hidden rounded-lg bg-white pl-3 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] transition-[max-height,border] duration-500',
                  isSortCollapsed ? 'max-h-0' : 'max-h-[100px]',
                )}
              >
                {sortOption.map(
                  (option, idx) =>
                    option !== currentSortOption && (
                      <li
                        key={idx}
                        className={clsx(
                          (idx == 0 ||
                            (idx == 1 &&
                              currentSortOption === SortOption.LASTEST)) &&
                            'pt-2',
                          (idx === sortOption.length - 1 ||
                            (idx == sortOption.length - 2 &&
                              currentSortOption ===
                                SortOption.LEAST_CLICKED)) &&
                            'pb-2',
                          'w-full',
                        )}
                      >
                        <button
                          onClick={(e) => switchSortOption(e, option)}
                          className='w-full text-start'
                        >
                          {option}
                        </button>
                      </li>
                    ),
                )}
              </ul>
            </div>
            <div className='mt-4 flex h-[42px] items-center'>
              <p className='whitespace-nowrap font-semibold text-primary'>
                {filterUrlList.length} Results
              </p>
              <div className='hidden xl:flex'>
                <UrlSelectionList isDomain />
                <UrlSelectionList isDomain={false} />
              </div>
              <button
                onClick={() => {
                  setFilterCategory([]);
                  setFilterDomain([]);
                }}
                className='ml-3 whitespace-nowrap text-[#4D4D4D] underline'
              >
                Clear filter
              </button>
            </div>
          </div>
          {!isLoading ? (
            <MyUrlList
              myUrlList={urlListV1}
              isAlreadyShorten={urlListV1.length !== 0}
            />
          ) : (
            <Loading />
          )}
          {filterUrlList.length > 0 && !isLoading && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default URLsPage;
