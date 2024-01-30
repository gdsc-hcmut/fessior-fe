'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const QRBoxMobile = () => {
  const [isShowed, setShowed] = useState<any>(true);

  return (
    <>
      {isShowed ? (
        <div className='top-15 fixed right-2 z-10 h-[132px] w-[132px] lg:hidden'>
          <Image
            src='/icons/qr-image.svg'
            alt='qr image'
            width={120}
            height={120}
            className='absolute left-3 top-3 rounded-[8px] border-2 border-primary'
          />
          <div className='absolute left-0 top-0 h-6 w-6 rounded-full bg-primary'>
            <Image
              src='/icons/minus.magnifyingglass.svg'
              alt='hide qr'
              width={12}
              height={12}
              className='m-auto mt-[6px]'
              onClick={() => setShowed(false)}
            />
          </div>
        </div>
      ) : (
        <div className='absolute right-2 h-6 w-6 rounded-full bg-primary'>
          <Image
            src='/icons/plus.magnifyingglass.svg'
            alt='show qr'
            width={12}
            height={12}
            className='m-auto mt-[6px]'
            onClick={() => setShowed(true)}
          />
        </div>
      )}
    </>
  );
};

export default QRBoxMobile;
