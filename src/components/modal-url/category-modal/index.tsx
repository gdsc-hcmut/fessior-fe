'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { use, useRef, useState } from 'react';

import { categoryListData, domainListData } from '@/services/url.service';
import { useFilterOptionStore } from '@/store/filter-option';
import { useUrlModalStore } from '@/store/url-modal';

type FilterSelectionProps = {
  isDomain: boolean;
  optionList: string[];
  clearSelection: (clearDomain: boolean) => void;
  removeOption: (option: string, fromDomain: boolean) => void;
};

function FilterSelection(props: FilterSelectionProps) {
  const { isDomain, optionList, clearSelection, removeOption } = props;

  if (optionList.length === 0) {
    return (
      <div className='flex flex-col space-y-2'>
        <p className='font-medium'>
          Chosen {isDomain ? 'domains' : 'categories'}
        </p>
        <div className='flex h-[56px] items-start'>
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
      </div>
    );
  }
  return (
    <div>
      <div className='mb-2 flex w-full justify-between'>
        <p className='font-medium'>
          Chosen {isDomain ? 'domains' : 'categories'}
        </p>
        <button
          onClick={() => clearSelection(isDomain)}
          className='text-xs text-[#4D4D4D] underline'
        >
          Clear selection
        </button>
      </div>
      <div className='show-scrollbar-no-mt flex h-[56px] flex-wrap gap-x-1 gap-y-2 overflow-y-scroll'>
        {optionList.map((option, index) => (
          <div
            key={index}
            className='flex h-6 items-center space-x-1 rounded-lg bg-primary px-2 py-1 text-xs text-white md:px-3'
          >
            <p>{option}</p>
            <button onClick={() => removeOption(option, isDomain)}>
              <Image
                src='/icons/header/close_white.svg'
                alt='Close icon'
                width={0}
                height={0}
                className='h-auto w-2'
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CategoryModal() {
  const { filterDomain, filterCategory, setFilterCategory, setFilterDomain } =
    useFilterOptionStore();
  const { setShowCategoryModal } = useUrlModalStore();
  const [isDomain, setIsDomain] = useState(true);
  const [allOptions, setAllOptions] = useState<string[]>(
    isDomain ? domainListData : categoryListData,
  );
  const [chosenDomains, setChosenDomains] = useState<boolean[]>(
    domainListData.map((item) => filterDomain.includes(item)),
  );
  const [chosenCategories, setChosenCategories] = useState<boolean[]>(
    categoryListData.map((item) => filterCategory.includes(item)),
  );
  const [curDomainList, setCurDomainList] = useState<string[]>([
    ...filterDomain,
  ]);
  const [curCategoryList, setCurCategoryList] = useState<string[]>([
    ...filterCategory,
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    let filteredOptions: string[] = [];
    if (searchText === '') {
      filteredOptions = isDomain ? domainListData : categoryListData;
    } else {
      const options = isDomain ? domainListData : categoryListData;
      filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchText.toLowerCase()),
      );
    }
    setAllOptions(filteredOptions);
    if (isDomain) {
      setChosenDomains(
        filteredOptions.map((item) => curDomainList.includes(item)),
      );
    } else {
      setChosenCategories(
        filteredOptions.map((item) => curCategoryList.includes(item)),
      );
    }
  };

  const clearSelection = (clearDomain: boolean) => {
    if (clearDomain) {
      setChosenDomains(domainListData.map(() => false));
      setCurDomainList([]);
    } else {
      setChosenCategories(categoryListData.map(() => false));
      setCurCategoryList([]);
    }
  };

  const onSubmitFilter = () => {
    setFilterDomain(curDomainList);
    setFilterCategory(curCategoryList);
    setShowCategoryModal(false);
  };

  const removeOption = (option: string, fromDomain: boolean) => {
    if (fromDomain) {
      const index = allOptions.indexOf(option);
      const newChosenDomains = [...chosenDomains];
      newChosenDomains[index] = false;
      setChosenDomains(newChosenDomains);
      let newFilterDomain = curDomainList;
      newFilterDomain = newFilterDomain.filter((item) => item !== option);
      setCurDomainList(newFilterDomain);
    } else {
      const index = allOptions.indexOf(option);
      const newChosenCategories = [...chosenCategories];
      newChosenCategories[index] = false;
      setChosenCategories(newChosenCategories);
      let newFilterCategory = curCategoryList;
      newFilterCategory = newFilterCategory.filter((item) => item !== option);
      setCurCategoryList(newFilterCategory);
    }
  };

  return (
    <div
      onClick={() => setShowCategoryModal(false)}
      className={clsx(
        'slide-in fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-black/40 transition-all duration-300 md:items-start md:justify-end md:bg-transparent',
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
            <FilterSelection
              clearSelection={clearSelection}
              isDomain={true}
              optionList={curDomainList}
              removeOption={removeOption}
            />
            <FilterSelection
              clearSelection={clearSelection}
              isDomain={false}
              optionList={curCategoryList}
              removeOption={removeOption}
            />
          </div>
          <div className='mt-5 w-full 2xl:mt-6'>
            <div className='flex w-full justify-between'>
              <div className='flex'>
                <button
                  onClick={() => {
                    setIsDomain(true);
                    setAllOptions(domainListData);
                    if (inputRef.current) inputRef.current.value = '';
                  }}
                  className={clsx(
                    isDomain
                      ? 'border-b-none flex w-[81px] justify-center rounded-lg rounded-ee-none rounded-es-none border-[1px] border-primary border-b-white bg-white py-1 md:w-[89px]'
                      : 'flex w-[81px] justify-center py-1 md:w-[89px]',
                  )}
                >
                  <p className='font-semibold text-primary'>Domain</p>
                </button>
                <button
                  onClick={() => {
                    setIsDomain(false);
                    setAllOptions(categoryListData);
                    if (inputRef.current) inputRef.current.value = '';
                  }}
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
                  ref={inputRef}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div
              className={clsx(
                'show-scrollbar mt-[-1.2px] flex h-[188px] flex-col space-y-1 overflow-y-scroll rounded-lg border-[1px] border-primary p-3 lg:mt-[-1px]',
                isDomain && 'rounded-ss-none',
              )}
            >
              {allOptions.map((option, index) => (
                <div
                  key={index}
                  className='flex cursor-pointer items-center space-x-1'
                >
                  <input
                    type='checkbox'
                    id={option}
                    name={option}
                    value={option}
                    checked={
                      isDomain ? chosenDomains[index] : chosenCategories[index]
                    }
                    onChange={(e) => {
                      if (isDomain) {
                        const newChosenDomains = [...chosenDomains];
                        newChosenDomains[index] = e.target.checked;
                        setChosenDomains(newChosenDomains);
                        let newFilterDomain = curDomainList;
                        if (e.target.checked) {
                          newFilterDomain.push(option);
                        } else
                          newFilterDomain = newFilterDomain.filter(
                            (item) => item !== option,
                          );
                        setCurDomainList(newFilterDomain);
                      } else {
                        const newChosenCategories = [...chosenCategories];
                        newChosenCategories[index] = e.target.checked;
                        setChosenCategories(newChosenCategories);
                        let newFilterCategory = curCategoryList;
                        if (e.target.checked) {
                          newFilterCategory.push(option);
                        } else
                          newFilterCategory = newFilterCategory.filter(
                            (item) => item !== option,
                          );
                        setCurCategoryList(newFilterCategory);
                      }
                    }}
                    className='category-checkbox'
                  />
                  <label htmlFor={option}>{option}</label>
                </div>
              ))}
            </div>
          </div>
          <div className='relative mt-4 w-fit'>
            <button
              onClick={onSubmitFilter}
              className='rounded-[20px] bg-primary px-3 py-1 font-semibold text-white md:px-5 md:py-2'
            >
              Apply Filter
            </button>
            {(curDomainList.length > 0 || curCategoryList.length > 0) && (
              <div className='absolute right-[-4px] top-[-4px] flex h-5 w-5 items-center justify-center rounded-full border-[1px] border-primary bg-white text-xs font-semibold text-primary md:h-6 md:w-6'>
                {curDomainList.length + curCategoryList.length}
              </div>
            )}
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
