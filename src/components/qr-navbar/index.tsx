'use client';

import Button from '../button';

const QRNavBar = () => {
  return (
    <>
      <div className='hidden lg:block'>
        <div className='flex flex-row items-center justify-start'>
          <svg
            width='24'
            height='20'
            viewBox='0 0 24 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M20 9.16536H7.83L13.42 4.50703L12 3.33203L4 9.9987L12 16.6654L13.41 15.4904L7.83 10.832H20V9.16536Z'
              fill='#0B2878'
            />
          </svg>

          <p className='text-[19px] text-primary'>Back</p>
        </div>
        <div className='w-full rounded-[8px] border border-[#7E7E7E] border-opacity-30 bg-white pb-[14px] pt-[20px] shadow-2xl'>
          <div className=' text-center text-[26px] font-bold text-primary'>
            Customize QR
          </div>
          <div className='mx-auto mt-[4px] h-2 w-[38%] rounded-lg bg-zinc-300'>
            <div className='h-2 w-[25%] rounded-lg bg-blue-900'></div>
          </div>
          <div className='mx-auto mt-[18px] flex h-[40px] w-auto flex-row items-center justify-center gap-[18px] px-[12px]'>
            <Button
              onClick={() => {}}
              width='full'
              type='positive'
              className='flex h-[100%] w-[150px] max-w-[200px] grow items-center justify-center rounded-[8px] border bg-primary text-center text-[22px] font-medium text-white'
            >
              Information
            </Button>
            <Button
              onClick={() => {}}
              width='full'
              type='neutral'
              className='flex h-[100%] w-[150px] max-w-[200px] grow items-center justify-center rounded-[8px] border border-primary bg-white text-center text-[22px] font-medium text-primary'
            >
              Frame
            </Button>
            <Button
              onClick={() => {}}
              width='full'
              type='neutral'
              className='flex h-[100%] w-[150px] max-w-[200px] grow items-center justify-center rounded-[8px] border border-primary bg-white text-center text-[22px] font-medium text-primary'
            >
              Pattern
            </Button>
            <Button
              onClick={() => {}}
              width='full'
              type='neutral'
              className='flex h-[100%] w-[150px] max-w-[200px] grow items-center justify-center rounded-[8px] border border-primary bg-white text-center text-[22px] font-medium text-primary'
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
