'use client';
import Image from 'next/image';
import { useState } from 'react';

import iconZoomMinus from '@/../public/icons/qr/iconZoomMinus.svg';
import iconZoomPlus from '@/../public/icons/qr/iconZoomPlus.svg';

export default function MiniQR() {
  const [isZoom, setIsZoom] = useState(true);
  return (
    <div>
      <div className='xl:hidden'>
        <div
          className={`fixed right-[20px] top-[112px] z-50 hidden h-[222px] w-[224px]  ${
            isZoom ? 'flex-col md:flex' : 'hidden'
          }`}
        >
          <button
            className='z-50 h-[28px] w-[28px] self-start rounded-full bg-primary pl-[8px]'
            onClick={() => {
              setIsZoom(!isZoom);
            }}
          >
            <Image src={iconZoomMinus} alt='1' height='12' width='12' />
          </button>
          <div className='ml-[-20px] mt-[-17px] h-[212px] w-[212px] self-end rounded-[8px] border-[3px] border-primary bg-white p-[3px] '>
            <Image
              src='/images/qrcode/example-qr.png'
              alt='Pattern 1'
              height='250'
              width='250'
            />
          </div>
        </div>
        <div
          className={`fixed right-[8px] top-[112px] z-50 flex h-[132px] w-[132px] flex-col 
                        ${!isZoom ? '' : 'hidden'}
        `}
        >
          <button
            className='z-50 mr-[-2px] h-[24px] w-[24px] self-end rounded-full bg-primary pl-[6px]'
            onClick={() => {
              setIsZoom(!isZoom);
            }}
          >
            <Image src={iconZoomPlus} alt='2' height='12' width='12' />
          </button>
        </div>
      </div>

      <div
        className={`fixed right-[8px] top-[112px] z-50 flex h-[132px] w-[132px] flex-col ${
          isZoom ? '' : 'hidden'
        } md:hidden`}
      >
        <button
          className='z-50 h-[24px] w-[24px] self-start rounded-full bg-primary pl-[6px]'
          onClick={() => {
            setIsZoom(!isZoom);
          }}
        >
          <Image src={iconZoomMinus} alt='3' height='12' width='12' />
        </button>
        <div className='mt-[-12px] h-[120px] w-[120px] self-end rounded-[8px] border-[3px] border-primary bg-white p-[3px] '>
          <Image
            src='/images/qrcode/example-qr.png'
            alt='Pattern 1'
            height='200'
            width='200'
          />
        </div>
      </div>
      <div
        className={`fixed right-[8px] top-[112px] z-50 flex h-[132px] w-[132px] flex-col 
                        ${!isZoom ? '' : 'hidden'} md:hidden
        `}
      >
        <button
          className='z-50 mr-[-2px] h-[24px] w-[24px] self-end rounded-full bg-primary pl-[6px]'
          onClick={() => {
            setIsZoom(!isZoom);
          }}
        >
          <Image src={iconZoomPlus} alt='4' height='12' width='12' />
        </button>
      </div>
    </div>
  );
}
