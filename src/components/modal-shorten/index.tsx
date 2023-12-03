import Image from 'next/image';
import { FC } from 'react';

import IUrl from '@/types/url-type';

interface IModalProps {
  closeModal: () => void;
  shortenedUrl: IUrl;
}

const ModalShorten: FC<IModalProps> = ({ shortenedUrl, closeModal }) => {
  return (
    <div
      onClick={closeModal}
      className='fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-30'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='relative w-[280px] rounded-[8px] border-[1px] bg-white py-[32px] leading-[1.2]'
      >
        <div className='relative flex flex-col items-center overflow-hidden px-[12px]'>
          <h6 className='mb-[28px] text-[20px] font-[700] text-primary'>
            Link shortened!
          </h6>
          <div className='relative mb-[42px] h-[140px] w-[140px] rounded-[8px] p-[10px] shadow-[0px_4px_47px_0px_rgba(11,40,120,0.30)]'>
            <Image
              src='/sample_qr.svg'
              alt='qr'
              width={0}
              height={0}
              className='h-auto w-auto'
            />
            <div className='absolute bottom-[-12px] right-[-12px] h-[28px] w-[28px] rounded-full bg-primary p-[4px]'>
              <Image
                src='/icons/download.svg'
                alt='qr'
                width={0}
                height={0}
                className='h-auto w-auto'
              />
            </div>
          </div>
          <div className='flex h-[40px] w-[100%] content-between'>
            <div className='me-[4px] flex flex-grow items-center overflow-hidden overflow-x-auto rounded-l-[8px] border-[0.5px] border-solid border-primary p-[8px]'>
              <p>{`https://${shortenedUrl.domain}/${shortenedUrl.slug}`}</p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://${shortenedUrl.domain}/${shortenedUrl.slug}`,
                );
              }}
              className='rounded-r-[8px] border-[0.5px] border-solid border-primary p-[8px] hover:bg-[#ddd] active:bg-[#ccc] active:text-white'
            >
              <Image
                src='/icons/content_copy.svg'
                alt='copy'
                height={0}
                width={0}
                className='h-auto w-auto'
              />
            </button>
          </div>
          <Image
            src='/qr_decor.svg'
            alt='qr-decor'
            width={0}
            height={0}
            className='absolute left-[-20px] top-[40px] h-[60px] w-[60px]'
          />
          <Image
            src='/qr_decor.svg'
            alt='qr-decor'
            width={0}
            height={0}
            className='absolute right-[-30px] top-[92px] h-[60px] w-[60px]'
          />
        </div>
        <div className='absolute left-[12px] top-[-20px] flex h-[40px] w-[40px] items-center rounded-full bg-primary p-[4px]'>
          <Image
            src='/gdsc_white.svg'
            alt='GDSC Logo'
            width={0}
            height={0}
            className='h-auto w-auto'
          />
        </div>
      </div>
    </div>
  );
};

export default ModalShorten;
