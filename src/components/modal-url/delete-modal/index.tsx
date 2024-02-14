'use client';

import Image from 'next/image';
import { toast } from 'react-toastify';

import { useUrlModalStore } from '@/store/url-modal';


export default function DeleteLinkModal() {
  const { setShowDeleteModal } = useUrlModalStore();

  const onDelete = () => {
    toast.success('Link deleted successfully');
    setShowDeleteModal(false);
  };

  return (
    <div
      onClick={() => setShowDeleteModal(false)}
      className='fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-black/40'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='relative flex overflow-hidden rounded-lg bg-white'
      >
        <form className='flex min-w-[320px] flex-col p-5 md:min-w-[440px] md:px-7 md:py-6 xl:min-w-[480px] xl:px-10 xl:py-7'>
          <p className='mb-3 text-xl font-bold text-red md:mb-5 xl:text-2xl 2xl:mb-8 2xl:text-[28px]'>
            Delete this Link?
          </p>
          <p className='font-medium'>
            This link will be removed permanently on delete.
            <br />
            Are you sure you want to proceed?
          </p>
          <div className='mt-10 flex space-x-5 self-end md:mt-10'>
            <button
              onClick={() => setShowDeleteModal(false)}
              className='font-semibold'
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className='rounded-lg bg-red px-2 py-1 font-semibold text-white md:px-3 md:py-2'
            >
              Delete link
            </button>
          </div>
        </form>
        <button
          onClick={() => setShowDeleteModal(false)}
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
