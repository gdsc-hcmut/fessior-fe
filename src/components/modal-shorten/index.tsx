import Image from 'next/image';

import Button from '@/components/button';
import CloseButton from '@/components/close-button';
import Icon from '@/types/icon-enum';
import Url from '@/types/url-type';
import { getIcon } from '@/utils/common';

type ModalShortenProps = {
  onDismiss: () => void;
  shortenedUrl: Url;
};

export default function ModalShorten(props: ModalShortenProps) {
  const { shortenedUrl, onDismiss } = props;
  const urlShown = `https://${shortenedUrl.domain}/${shortenedUrl.slug}`;
  return (
    <div
      onClick={onDismiss}
      className='fixed bottom-0 left-0 right-0 top-0 z-[10] flex items-center justify-center bg-black bg-opacity-30'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='relative mx-[12px] flex aspect-[9/10] w-[500px] overflow-hidden rounded-[8px] bg-primary leading-[1.2]'
      >
        <div className='absolute bottom-0 left-0 right-0 top-0 z-10 flex flex-col items-center justify-between px-[20px] py-[40px] md:p-[40px]'>
          <div className='relative flex aspect-square h-[50%] items-center justify-center rounded-[8px] bg-white p-[10px] shadow-[0px_4px_12px_0px_rgba(11,40,120,0.16)]'>
            <Image
              src='images/shorten/sample_qr.svg'
              alt='qr'
              width={0}
              height={0}
              className='h-auto w-[100%]'
            />
            <div
              onClick={() => {}}
              className='absolute bottom-[-12px] right-[-12px] aspect-square w-[36px] rounded-full bg-primary p-[4px] hover:cursor-pointer'
            >
              <Image
                src='/icons/shorten/download.svg'
                alt='download'
                width={0}
                height={0}
                className='h-auto w-auto'
              />
            </div>
          </div>
          <div className='mb-[12px] flex flex-grow flex-col items-center justify-center px-[12px]'>
            <h4 className='mb-[8px] text-[24px] font-[700] text-primary md:text-[28px]'>
              Link shortened!
            </h4>
            <p className='text-center text-primary'>
              Access the “My URL” page to view statistics on your shortened
              links
            </p>
          </div>
          <div className='flex h-[40px] w-[100%] content-between'>
            <div className='me-[4px] flex flex-grow items-center overflow-hidden overflow-x-auto rounded-[8px] border-[0.5px] border-solid border-primary p-[8px]'>
              <p className='text-primary'>{urlShown}</p>
            </div>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(urlShown);
              }}
            >
              <Image
                src={getIcon(
                  '/icons/shorten',
                  'content_copy.svg',
                  Icon.INACTIVE,
                )}
                alt='copy'
                height={0}
                width={0}
                className='h-auto w-auto fill-white'
              />
            </Button>
          </div>
        </div>
        <div className='absolute bottom-[-64px] left-[-30px] h-[80%] w-[150%] rotate-[-6deg] bg-white'></div>
        <Image
          src='/images/shorten/qr_decor.svg'
          alt='qr-decor'
          width={0}
          height={0}
          className='absolute left-[-20px] top-[52px] h-auto w-auto'
        />
        <Image
          src='/images/shorten/qr_decor.svg'
          alt='qr-decor'
          width={0}
          height={0}
          className='absolute right-[-20px] top-[72px] h-auto w-auto'
        />
        <CloseButton
          className='absolute right-[12px] top-[12px] z-[10] md:right-[16px] md:top-[16px]'
          onClick={onDismiss}
        />
      </div>
    </div>
  );
}
