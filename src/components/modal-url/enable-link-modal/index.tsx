'use client';

// import { QueryClient, useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

// import queryClient from '@/querier/client';
// import urlService from '@/services/url.service';
import { useUrlModalStore } from '@/store/url-modal';

type EnableLinkModalProps = {
  isEnable: boolean;
};

export default function EnableLinkModal(props: EnableLinkModalProps) {
  const { setShowEnableModal, setDemoEnable } = useUrlModalStore();
  const { isEnable } = props;

  //   const handleUrlDelete = async () => {
  //     try {
  //       await urlService.deleteUrlById(deleteUrl);
  //       toast.success('Link deleted successfully');
  //       setShowDeleteModal(false);
  //       queryClient.invalidateQueries({
  //         queryKey: ['myUrls'],
  //       });
  //     } catch (error) {
  //       toast.error('Failed to delete link');
  //     }
  //   };

  //   const onDelete = useMutation({
  //     mutationFn: handleUrlDelete,
  //   });

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setShowEnableModal(false);
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [setShowEnableModal]);

  return (
    <div
      onClick={() => setShowEnableModal(false)}
      className='fixed bottom-0 left-0 right-0 top-0 z-20 flex animate-fade items-center justify-center bg-black/40'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='relative flex overflow-hidden rounded-lg bg-white'
      >
        <form className='flex min-w-[320px] flex-col p-5 md:min-w-[440px] md:px-7 md:py-6 xl:min-w-[480px] xl:px-10 xl:py-7'>
          <p
            className={clsx(
              'mb-3 text-xl font-bold md:mb-5 xl:text-2xl 2xl:mb-8 2xl:text-[28px]',
              !isEnable ? 'text-[#0F9D58]' : 'text-[#DB4437]',
            )}
          >
            {!isEnable ? 'Enable' : 'Disable'} this Link?
          </p>
          {!isEnable ? (
            <p className='font-medium'>
              This shorten link, currently disabled, will be reactivated
              <br /> for access. Are you sure you want to proceed?
            </p>
          ) : (
            <p className='font-medium'>
              Others will be unable to access this shorten link after
              <br />
              disabling it. Are you sure you want to proceed?
            </p>
          )}
          <div className='mt-10 flex space-x-5 self-end md:mt-10'>
            <button
              type='button'
              onClick={() => setShowEnableModal(false)}
              className='font-semibold'
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                // onDelete.mutate();
                if (isEnable) {
                  setDemoEnable(false);
                  toast.success('Link disabled successfully');
                } else {
                  setDemoEnable(true);
                  toast.success('Link enabled successfully');
                }
                setShowEnableModal(false);
              }}
              type='submit'
              className={clsx(
                'rounded-lg px-2 py-1 font-semibold text-white md:px-3 md:py-2',
                isEnable ? 'bg-[#DB4437]' : 'bg-[#0F9D58]',
              )}
            >
              {!isEnable ? 'Enable' : 'Disable'} link
            </button>
          </div>
        </form>
        <button
          onClick={() => setShowEnableModal(false)}
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
