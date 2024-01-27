'use client';
import React from 'react';

import Button from '../button';

const QRNavBar = () => {
  return (
    <>
      <div className='hidden xl:block'>
        <div className='mx-auto mt-[160px] h-[144px] w-[1280px] rounded-lg border border-zinc-500 border-opacity-40 bg-white shadow-2xl'>
          <div className="font-['Baloo Chettan 2'] mt-[20px] text-center text-[28px] font-bold text-blue-900">
            Customize QR
          </div>
          <div className='mx-auto mt-[4px] h-2 w-[600px] rounded-lg bg-zinc-300'>
            <div className='h-2 w-[400px] rounded-lg bg-blue-900'></div>
          </div>
          <div className='relative mx-auto mt-4 flex h-10 w-[854px] items-center justify-between'>
            <Button
              onClick={() => {}}
              width='full'
              type='positive'
              className=" font-['Baloo Chettan 2'] flex h-10 w-[200px] items-center justify-center rounded-lg border bg-blue-900 py-1 pr-[18px] text-center text-[20px] font-medium text-white"
            >
              Information
            </Button>
            <Button
              onClick={() => {}}
              width='full'
              type='neutral'
              className=" font-['Baloo Chettan 2'] flex h-10  w-[200px] items-center justify-center rounded-lg border bg-blue-900 pr-[18px] text-center text-[20px] font-medium text-primary"
            >
              Frame
            </Button>
            <Button
              onClick={() => {}}
              width='full'
              type='neutral'
              className=" font-['Baloo Chettan 2'] flex h-10  w-[200px] items-center justify-center rounded-lg border bg-blue-900 pr-[18px] text-center text-[20px] font-medium text-primary"
            >
              Pattern
            </Button>
            <Button
              onClick={() => {}}
              width='full'
              type='neutral'
              className=" font-['Baloo Chettan 2'] flex h-10  w-[200px] items-center justify-center rounded-lg border bg-blue-900 text-center text-[20px] font-medium text-primary"
            >
              Logo
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QRNavBar;
