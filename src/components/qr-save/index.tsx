import Image from 'next/image';
import { useState } from 'react';

import DropDown from '@/components/listbox-select';

export default function SavePart() {
  const [isViewSaveOptionExpand, setIsViewSaveOptionExpand] = useState(false);
  return (
    <div className='flex w-[100%] flex-col rounded-[8px] border-[3px] border-[#0B2878] bg-white px-[35px] pb-[2px] pt-[28px] xl:hidden'>
      <div className=' ml-auto mr-auto h-[200px] w-[200px] rounded-[8px] border border-primary p-[10px] md:h-[532px] md:w-[532px]'>
        <Image
          src='/images/qrcode/example-qr.png'
          alt='Pattern 1'
          height='600'
          width='600'
        />
      </div>
      <div className='mt-[20px] flex flex-row flex-wrap justify-center gap-x-[24px] gap-y-[8px] md:mt-[12px] md:gap-x-[60px]'>
        <div className='flex w-[50px] flex-row items-center md:w-[68px]'>
          <label
            htmlFor='saveSVG'
            className='mr-[8px] text-[14px] font-bold md:hidden'
          >
            SVG
          </label>
          <input
            id='saveSVG'
            type='radio'
            value=''
            name='saveType'
            className='h-[16px] w-[16px] md:mr-[11px] md:h-[24px] md:w-[24px]'
          />
          <label
            htmlFor='saveSVG'
            className='hidden text-[18px] font-bold md:block'
          >
            SVG
          </label>
        </div>
        <div className='flex w-[50px] flex-row items-center md:w-[68px]'>
          <label
            htmlFor='savePNG'
            className='mr-[8px] text-[14px] font-bold md:hidden'
          >
            PNG
          </label>
          <input
            id='savePNG'
            type='radio'
            value=''
            name='saveType'
            className='h-[16px] w-[16px] md:mr-[11px] md:h-[24px] md:w-[24px]'
          />
          <label
            htmlFor='savePNG'
            className='hidden text-[18px] font-bold md:block'
          >
            PNG
          </label>
        </div>
        <div className='flex h-[24px] flex-row items-center'>
          <p className='mr-[8px] text-[14px] font-bold md:text-[18px] '>Size</p>
          <div className='w-[56px] md:w-[80px]'>
            <DropDown
              value='100px'
              options={[
                '100px',
                '20px',
                '24px',
                '28px',
                '32px',
                '36px',
                '40px',
                '48px',
              ]}
              heightOfDropDown='24'
              mediumHeight='28'
              textSize='12'
              paddingLeft='4'
              paddingRight='2'
              mediumPaddingRight='2'
              mediumPaddingLeft='8'
              mediumTextSize='16'
            />
          </div>
        </div>
      </div>
      <div className='mt-[8px] flex w-full flex-col md:mt-[14px]'>
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
          className='px-auto mr-[-27px] mt-[8px] h-[18px] self-end text-[12px] font-bold text-[#6D7EAE] underline'
          onClick={() => {
            setIsViewSaveOptionExpand(!isViewSaveOptionExpand);
          }}
        >
          {isViewSaveOptionExpand ? 'View less' : 'View more save option'}
        </button>
      </div>
    </div>
  );
}
