'use client';

import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { categoryListData } from '@/services/url.service';
import { useUrlModalStore } from '@/store/url-modal';

export default function EditSlugModal() {
  const { setShowEditModal } = useUrlModalStore();

  const [slug, setSlug] = useState('mySlug');
  const [errorMsg, setErrorMsg] = useState('');
  const [searchText, setSearchText] = useState('');
  const [categoryList, setCategoryList] = useState<string[]>([
    ...categoryListData,
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    const newfilterCategoryList = categoryListData.filter((category) =>
      category.includes(searchText),
    );
    setCategoryList(newfilterCategoryList);
  };

  const isValidSlug = (slug: string) => {
    const regexExp = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g;
    return regexExp.test(slug);
  };

  const onEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidSlug(slug)) {
      setErrorMsg('Invalid slug');
      return;
    }
    toast.success('Link updated successfully');
    setShowEditModal(false);
  };

  return (
    <div
      onClick={() => setShowEditModal(false)}
      className='fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-black/40'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='relative flex overflow-hidden rounded-lg bg-white'
      >
        <form className='flex flex-col p-7'>
          <p className='mb-4 text-xl font-bold text-primary md:mb-6 xl:mb-7 xl:text-2xl 2xl:mb-8 2xl:text-[28px]'>
            Edit Link
          </p>
          <label htmlFor='slug' className='mb-2 w-fit font-medium xl:text-xl'>
            Slug
          </label>
          <input
            type='text'
            id='slug'
            name='slug'
            className='w-[280px] rounded-lg border-[0.5px] border-primary p-2 md:w-[320px] xl:p-3'
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
          <p className='mt-1 h-4 text-xs text-red'>{errorMsg}</p>
          <label
            htmlFor='edit-slug-category'
            className='mb-2 mt-2 w-fit font-medium xl:text-xl'
          >
            Category
          </label>
          <div className='group relative'>
            <input
              type='text'
              id='edit-slug-category'
              name='category'
              className='w-[280px] rounded-lg border-[0.5px] border-primary p-2 md:w-[320px] xl:p-3'
              placeholder='Add or create categories'
              onChange={handleSearch}
            />
            <div className='show-scrollbar absolute flex max-h-[100px] w-[280px] scale-0 flex-col space-y-1 overflow-y-scroll rounded-lg bg-white p-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] group-hover:scale-100 md:w-[320px]'>
              {categoryList.map((category, index) => (
                <button className='w-full text-start text-xs' key={index}>
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className='mt-2 flex flex-col space-y-1'>
            <p className='font-medium'>Chosen categories</p>
            <div className='flex space-x-1 pb-1 md:space-x-2'>
              <div className='flex items-center space-x-1 rounded-lg bg-primary px-1 py-1 text-xs text-white md:px-3'>
                <p>Events</p>
                <Image
                  src='/icons/header/close_white.svg'
                  alt='Close icon'
                  width={0}
                  height={0}
                  className='h-auto w-2'
                />
              </div>
              <div className='flex items-center space-x-1 rounded-lg bg-primary px-1 py-1 text-xs text-white md:px-3'>
                <p>Favorites</p>
                <Image
                  src='/icons/header/close_white.svg'
                  alt='Close icon'
                  width={0}
                  height={0}
                  className='h-auto w-2'
                />
              </div>
            </div>
          </div>
          <div className='mt-7 flex space-x-5 self-end md:mt-10'>
            <button
              onClick={() => setShowEditModal(false)}
              className='font-semibold'
            >
              Cancel
            </button>
            <button
              onClick={onEdit}
              className='rounded-lg bg-primary px-3 py-2 font-semibold text-white md:px-4'
            >
              Save
            </button>
          </div>
        </form>
        <div className='hidden w-[256px] items-center justify-center bg-primary/5 md:flex'>
          <Image
            src='/images/url/edit_slug.svg'
            alt='Edit slug image'
            width={0}
            height={0}
            className='h-auto w-[200px]'
          />
        </div>
        <button
          onClick={() => setShowEditModal(false)}
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
        <div className='absolute bottom-[-12px] left-[-12px] h-[60px] w-[60px] rounded-full bg-primary md:hidden' />
        <div className='absolute bottom-10 left-10 h-5 w-5 rounded-full bg-primary md:hidden' />
      </div>
    </div>
  );
}
