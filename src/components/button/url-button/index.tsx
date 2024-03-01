import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { useUrlModalStore } from '@/store/url-modal';
import { MyUrl, MyUrlv1 } from '@/types/url-type';

type UrlButtonProps = {
  copyContent: string;
  editedUrl: MyUrlv1;
};

export default function UrlButton(props: UrlButtonProps) {
  const [copied, setCopied] = useState(false);
  const { copyContent, editedUrl } = props;

  const { setShowEditModal, setShowDeleteModal, setEditedUrl, setDeleteUrl } =
    useUrlModalStore();

  const onCopy = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    navigator.clipboard.writeText(copyContent);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 1500);
  }, [copied]);

  return (
    <div className='flex flex-col justify-end space-y-2 self-start xl:flex-[1] xl:flex-row xl:space-x-1 xl:space-y-0 3xl:space-x-2'>
      <button
        onClick={onCopy}
        className='flex h-6 w-6 items-center justify-center rounded-lg border-[1px] border-primary 2xl:h-7 2xl:w-7 3xl:h-8 3xl:w-8'
      >
        <Image
          src={
            copied
              ? '/icons/url/check_royal.svg'
              : '/icons/url/content_copy.svg'
          }
          alt='Copy icon'
          width={0}
          height={0}
          className='h-4 w-auto 3xl:h-5'
        />
      </button>
      <button
        onClick={() => {
          setShowEditModal(true);
          setEditedUrl(editedUrl);
        }}
        className='flex h-6 w-6 items-center justify-center rounded-lg border-[1px] border-primary 2xl:h-7 2xl:w-7 3xl:h-8 3xl:w-8'
      >
        <Image
          src='/icons/url/edit.svg'
          alt='Edit icon'
          width={0}
          height={0}
          className='h-4 w-auto 3xl:h-5'
        />
      </button>
      <button
        onClick={() => {
          setShowDeleteModal(true);
          setDeleteUrl(editedUrl._id);
        }}
        className='flex h-6 w-6 items-center justify-center rounded-lg border-[1px] border-primary 2xl:h-7 2xl:w-7 3xl:h-8 3xl:w-8'
      >
        <Image
          src='/icons/url/delete.svg'
          alt='Delete icon'
          width={0}
          height={0}
          className='h-4 w-auto 3xl:h-5'
        />
      </button>
    </div>
  );
}
