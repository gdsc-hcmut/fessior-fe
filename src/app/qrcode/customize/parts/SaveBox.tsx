'use client';
import Image from 'next/image';
import { FileExtension } from 'qr-code-styling';
import { useState } from 'react';

import DropDown from '@/components/listbox-select';

interface SaveBoxProps {
  setFileExt: React.Dispatch<React.SetStateAction<FileExtension>>;
}

export default function SaveBox(props: SaveBoxProps) {
  const { setFileExt } = props;
  const [isViewSaveOptionExpand, setIsViewSaveOptionExpand] = useState(false);
  return (
    <div className='relative mt-[28px] hidden w-[472px] xl:flex xl:flex-col'>
      <div className='sticky top-[110px] flex w-[100%] flex-col items-center rounded-[8px] bg-white px-[20px] pb-[9px] pt-[20px] drop-shadow-[0_4px_47px_rgba(11,40,120,0.3)]'>
        <div className=' aspect-square w-full rounded-[8px] bg-[#0B2878] px-[27px] py-[27px]'>
          <Image
            src='/images/qr/example_qr.png'
            alt='Pattern 1'
            height='600'
            width='600'
          />
        </div>

        <div className='mt-[32px] flex h-[20px] flex-row items-center'>
          <div className='mr-[32px] flex h-[20px] w-[64px] flex-row items-center '>
            <input
              id='saveSVG'
              type='radio'
              value='svg'
              name='saveType'
              className='mr-[8px] h-[20px] w-[20px] text-primary hover:cursor-pointer'
              defaultChecked={true}
              onClick={() => setFileExt('svg')}
            />
            <label htmlFor='saveSVG' className='text-[18px] font-bold'>
              SVG
            </label>
          </div>
          <div className='mr-[40px] flex h-[20px] w-[64px] flex-row items-center'>
            <input
              id='savePNG'
              type='radio'
              value=''
              name='saveType'
              className='mr-[8px] h-[20px] w-[20px] hover:cursor-pointer'
              onClick={() => setFileExt('png')}
            />
            <label htmlFor='savePNG' className='text-[18px] font-bold'>
              PNG
            </label>
          </div>
          <div className='flex h-[28px] w-[124px] flex-row items-center'>
            <p className='mr-[12px] w-[32px] text-[18px] font-medium'>Size</p>
            <DropDown
              border={1}
              value='100px'
              options={['20px', '24px', '32px', '36px', '40px', '48px']}
            />
          </div>
        </div>
        <div className='mt-[24px] flex w-full flex-col'>
          <button className='h-[40px] w-full rounded-[8px] bg-primary'>
            <p className='py-[10px] text-center text-[16px] font-bold text-white'>
              Save this QR Code
            </p>
          </button>
          <button
            className={`h-[40px] w-full rounded-[8px] bg-primary ${
              isViewSaveOptionExpand ? 'mt-[4px]' : 'hidden'
            }`}
          >
            <p className='py-[10px] text-center text-[16px] font-bold text-white'>
              Save and copy to clipboard
            </p>
          </button>
          <button
            className={`h-[40px] w-full rounded-[8px] bg-primary ${
              isViewSaveOptionExpand ? 'mt-[4px]' : 'hidden'
            }`}
          >
            <p className='py-[10px] text-center text-[16px] font-bold text-white'>
              Save and download
            </p>
          </button>
          <button
            className={`px-auto mr-[-1px]  h-[18px] self-end text-[12px] font-bold text-[#6D7EAE] underline ${
              isViewSaveOptionExpand ? 'mt-[4px]' : 'mt-[8px]'
            }`}
            onClick={() => {
              setIsViewSaveOptionExpand(!isViewSaveOptionExpand);
            }}
          >
            {isViewSaveOptionExpand ? 'View less' : 'View more save option'}
          </button>
        </div>
      </div>
    </div>
  );
}
