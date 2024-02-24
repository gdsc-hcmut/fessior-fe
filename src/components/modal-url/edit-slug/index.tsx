'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { categoryListData } from '@/services/url.service';
import { useUrlModalStore } from '@/store/url-modal';

export default function EditSlugModal() {
  const { setShowEditModal, editedUrl } = useUrlModalStore();

  const [slug, setSlug] = useState(editedUrl.slug);
  const [errorMsg, setErrorMsg] = useState('');
  const [categoryList, setCategoryList] = useState<string[]>([
    ...categoryListData,
  ]);
  const [chosenCategories, setChosenCategories] = useState<string[]>([
    ...editedUrl.category,
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    const newfilterCategoryList = categoryListData.filter((category) =>
      category.includes(searchText),
    );
    setCategoryList(newfilterCategoryList);
  };

  const addCategory = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: string,
  ) => {
    e.preventDefault();
    const newChosenCategories = [...chosenCategories, category];
    setChosenCategories(newChosenCategories);
    const newCategoryList = categoryList.filter((item) => item !== category);
    setCategoryList(newCategoryList);
  };

  const removeCategory = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: string,
  ) => {
    e.preventDefault();
    const newChosenCategories = chosenCategories.filter(
      (item) => item !== category,
    );
    setChosenCategories(newChosenCategories);
    const newCategoryList = [...categoryList, category].sort();
    setCategoryList(newCategoryList);
  };

  const isValidSlug = (slug: string) => {
    const regexExp = /^[a-z0-9A-Z]+(?:-[a-z0-9A-Z]+)*$/g;
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

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setShowEditModal(false);
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  return (
    <div
      onClick={() => setShowEditModal(false)}
      className='fixed bottom-0 left-0 right-0 top-0 z-20 flex animate-fade items-center justify-center bg-black/40'
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
            <div className='show-scrollbar absolute flex max-h-[100px] w-[280px] scale-0 flex-col space-y-1 overflow-y-scroll rounded-lg bg-white p-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] group-focus-within:scale-100 md:w-[320px]'>
              {categoryList.map((category, index) => (
                <button
                  onClick={(e) => addCategory(e, category)}
                  className='w-full text-start text-xs'
                  key={index}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className='mt-2 flex w-[280px] flex-col space-y-1 md:w-[320px]'>
            <p className='w-fit font-medium'>Chosen categories</p>
            <div className='show-scrollbar flex max-h-8 w-[280px] space-x-1 overflow-x-scroll pb-1 md:w-[320px] md:space-x-2'>
              {chosenCategories.length === 0 && (
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
                    You haven’t chosen any categories
                  </p>
                </div>
              )}
              {chosenCategories.map((category, index) => (
                <div
                  key={index}
                  className='flex items-center space-x-1 rounded-lg bg-primary px-1 py-1 text-xs text-white md:px-3'
                >
                  <p className='whitespace-nowrap'>{category}</p>
                  <button onClick={(e) => removeCategory(e, category)}>
                    <Image
                      src='/icons/url/close_white.svg'
                      alt='Close icon'
                      width={0}
                      height={0}
                      className='h-auto w-2'
                      style={{
                        minWidth: '8px',
                        minHeight: '8px',
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className='mt-7 flex space-x-5 self-end md:mt-10'>
            <button
              type='button'
              onClick={(e) => {
                e.preventDefault();
                setShowEditModal(false);
              }}
              className='font-semibold'
            >
              Cancel
            </button>
            <button
              type='submit'
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
