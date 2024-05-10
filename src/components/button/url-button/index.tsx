import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';

import { useUrlModalStore } from '@/store/url-modal';

import { MyUrl } from '@/types/url-type';

type UrlButtonProps = {
  copyContent: string;
  editedUrl: MyUrl;
};

export default function UrlButton(props: UrlButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { copyContent, editedUrl } = props;

  const { setShowEditModal, setShowDeleteModal, setEditedUrl } = useUrlModalStore();

  const onCopy = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    navigator.clipboard.writeText(copyContent);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const buttonStyling = clsx(
    `flex h-6 w-6 items-center justify-center rounded-lg border border-primary 
    2xl:h-7 2xl:w-7 
    3xl:h-8 3xl:w-8`,
  );

  return (
    <div
      className='flex flex-col justify-end space-y-2 self-start 
      xl:flex-1 xl:flex-row xl:space-x-1 xl:space-y-0 
      3xl:space-x-2'
    >
      {/* TODO: Apply new ../copy-button component */}
      <button onClick={onCopy} className={buttonStyling}>
        <Image
          src={isCopied ? '/icons/url/check_royal.svg' : '/icons/url/content_copy.svg'}
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
        className={buttonStyling}
      >
        <Image src='/icons/url/edit.svg' alt='Edit icon' width={0} height={0} className='h-4 w-auto 3xl:h-5' />
      </button>
      <button onClick={() => setShowDeleteModal(true)} className={buttonStyling}>
        <Image src='/icons/url/delete.svg' alt='Delete icon' width={0} height={0} className='h-4 w-auto 3xl:h-5' />
      </button>
    </div>
  );
}
