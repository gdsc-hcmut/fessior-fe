import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface UrlButtonProps {
  copyContent: any;
}

export default function UrlButton(props: UrlButtonProps) {
  const [copied, setCopied] = useState(false);
  const { copyContent } = props;

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
      <div className='group relative overflow-visible'>
        <button
          onClick={onCopy}
          className='flex h-6 w-6 items-center justify-center rounded-lg border-[1px] border-primary 2xl:h-7 2xl:w-7 3xl:h-8 3xl:w-8'
        >
          <Image
            src='/icons/content_copy.svg'
            alt='Copy icon'
            width={0}
            height={0}
            className='h-4 w-auto 3xl:h-5'
          />
        </button>
        <span className='absolute left-[-20px] top-[-30px] flex w-[66px] scale-0 items-center justify-center rounded bg-white py-1 text-xs text-[#666666] shadow-[0_2px_4px_0_rgba(11,40,120,0.25)] group-hover:scale-100'>
          <p className='w-fit'>{copied ? 'Copied!' : 'Copy Link'}</p>
          <div className='absolute bottom-[-4px] h-2 w-2 rotate-45 bg-white' />
        </span>
      </div>
      <button className='flex h-6 w-6 items-center justify-center rounded-lg border-[1px] border-primary 2xl:h-7 2xl:w-7 3xl:h-8 3xl:w-8'>
        <Image
          src='/icons/url/edit.svg'
          alt='Edit icon'
          width={0}
          height={0}
          className='h-4 w-auto 3xl:h-5'
        />
      </button>
      <button className='flex h-6 w-6 items-center justify-center rounded-lg border-[1px] border-primary 2xl:h-7 2xl:w-7 3xl:h-8 3xl:w-8'>
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
