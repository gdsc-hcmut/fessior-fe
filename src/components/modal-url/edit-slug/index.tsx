'use client';

import clsx from 'clsx';
import Image from 'next/image';

type EditSlugModalProps = {
  hideEditSlugModal: () => void;
};
export default function EditSlugModal(props: EditSlugModalProps) {
  const { hideEditSlugModal } = props;

  return (
    <div
      onClick={() => hideEditSlugModal()}
      className='fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-black/40'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='relative flex rounded-lg bg-white'
      >
        <form className='flex flex-col p-7'>
          <p className='mb-8 text-[28px] font-bold text-primary'>Edit Link</p>
          <label htmlFor='slug' className='mb-2 text-xl font-medium'>
            Slug
          </label>
          <input
            type='text'
            id='slug'
            name='slug'
            className='w-[320px] rounded-lg border-[0.5px] border-primary p-3'
            value='mySlug'
          />
          <label
            htmlFor='edit-slug-category'
            className='mb-2 mt-[30px] text-xl font-medium'
          >
            Category
          </label>
          <input
            type='text'
            id='edit-slug-category'
            name='category'
            className='w-[320px] rounded-lg border-[0.5px] border-primary p-3'
            placeholder='Add or create categories'
          />
          <div className='mt-3 flex items-center space-x-2'>
            <p className='font-medium'>Chosen categories</p>
            <div className='flex space-x-2'>
              <div className='flex items-center space-x-1 rounded-lg bg-primary px-3 py-1 text-xs text-white'>
                <p>Events</p>
                <Image
                  src='/icons/header/close_white.svg'
                  alt='Close icon'
                  width={0}
                  height={0}
                  className='h-auto w-2'
                />
              </div>
              <div className='flex items-center space-x-1 rounded-lg bg-primary px-3 py-1 text-xs text-white'>
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
          <div className='mt-10 flex space-x-5 self-end'>
            <button className='font-semibold'>Cancel</button>
            <button className='rounded-lg bg-primary px-4 py-2 font-semibold text-white'>
              Save
            </button>
          </div>
        </form>
        <div className='flex w-[256px] items-center justify-center bg-primary/5'>
          <Image
            src='/images/url/edit_slug.svg'
            alt='Edit slug image'
            width={0}
            height={0}
            className='h-auto w-[200px]'
          />
        </div>
        <div className='absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#E6E6E6]'>
          <Image
            src='/icons/url/close_gray.svg'
            alt='Close icon'
            width={0}
            height={0}
            className='h-3 w-auto'
          />
        </div>
      </div>
    </div>
  );
}
