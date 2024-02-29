'use client';

import Image from 'next/image';
import { useState } from 'react';

import CategoryItem from '@/components/category-item';
import DropDown from '@/components/listbox-select';
import FramePart from '@/components/qr-frame';
import InformationPart from '@/components/qr-information';
import LogoPart from '@/components/qr-logo';
import MiniQR from '@/components/qr-miniPreview';
import QRNavBar from '@/components/qr-navbar';
import PatternPart from '@/components/qr-pattern';
import SavePart from '@/components/qr-save';
import SelectInput from '@/components/select-input';
import TextInput from '@/components/text-input';
// import ToolItem from '@/components/tool-item';
import TextInputIcon from '@/components/text-input-icons';
import ToggleButton from '@/components/toggle-button';
import meService from '@/services/me.service';
import { tools } from '@/services/tool.service';
import urlService from '@/services/url.service';
import Organization from '@/types/organization-type';
import Url from '@/types/url-type';


export default function Shorten() {
  const [typeOfQR, setTypeOfQR] = useState('url');
  const [patternColorType, setPatternColorType] = useState('singleColor');
  const [zoomMiniQR, setZoomMiniQR] = useState(true);
  const [isViewSaveOptionExpand, setIsViewSaveOptionExpand] = useState(false);

  return (
    <>
      <div className='relative flex w-[100%] flex-col items-center justify-start overflow-hidden pt-[88px] leading-[1.2] text-primary'>
        <MiniQR />
        {/* ///////////// MAIN ////////////// */}
        <div className='w-[90%] md:w-[85%]'>
          {/* ////// HEADER + PROCESS BAR ////////// */}
          {/* This will be replaced by Bun's nav bar when it bigger */}
          <div className='mb-[35px] flex w-[100%] flex-col items-center xl:hidden'>
            <p className='mb-[4px] text-center text-[16px] font-bold md:text-[26px]'>
              Customize QR
            </p>
            <div className='relative w-[94%] md:w-[92%]'>
              <div className='absolute h-[4px] w-[100%] rounded-full bg-[#D9D9D9] md:h-[8px]'></div>
              <div className='absolute h-[4px] w-[75%] rounded-full bg-[#0B2878] md:h-[8px]'></div>
            </div>
          </div>
          <QRNavBar />
          {/* //////// INFORMATION PARTS //////////// */}
          <div className='xl:flex xl:flex-row xl:gap-[28px] '>
            <div className='flex flex-col gap-y-[20px] drop-shadow-[0_4px_47px_rgba(11,40,120,0.3)] lg:items-center xl:mt-[28px] xl:flex xl:flex-col xl:gap-y-[24px] xl:rounded-[8px] xl:border-[0.5px] xl:border-[#7E7E7E] xl:border-opacity-30 xl:bg-white xl:px-[24px] xl:pt-[24px]'>
              <InformationPart typeOfQR={typeOfQR} />
              <FramePart />
              <PatternPart />
              <LogoPart />
              <SavePart />
            </div>
            <div className='sticky top-[28px] mt-[28px] hidden w-[472px]  xl:flex xl:flex-col'>
              <div className='flex w-[100%] flex-col items-center rounded-[8px] bg-white px-[20px] pb-[9px] pt-[20px] drop-shadow-[0_4px_47px_rgba(11,40,120,0.3)]'>
                <div className='aspect-square w-full rounded-[8px] bg-[#0B2878] px-[27px] py-[27px]'>
                  <div className='h-full w-full rounded-[8px]'>
                    <Image
                      src='/images/qrcode/example-qr.png'
                      alt='Pattern 1'
                      height='500'
                      width='500'
                    />
                  </div>
                </div>
                <div className='mt-[32px] flex h-[20px] flex-row'>
                  <div className='mr-[32px] flex h-[20px] w-[64px] flex-row items-center '>
                    <input
                      id='saveSVG'
                      type='radio'
                      value=''
                      name='saveType'
                      className='mr-[8px] h-[20px] w-[20px]'
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
                      className='mr-[8px] h-[20px] w-[20px]'
                    />
                    <label htmlFor='savePNG' className='text-[18px] font-bold'>
                      PNG
                    </label>
                  </div>
                  <div className='flex w-[124px] flex-row'>
                    <p className='mr-[12px] w-[32px] text-[18px] font-medium'>
                      Size
                    </p>
                    <DropDown
                      value='100px'
                      options={['20px', '24px', '32px', '36px', '40px', '48px']}
                      heightOfDropDown='24'
                      textSize='16'
                      paddingLeft='4'
                      paddingRight='2'
                    />
                  </div>
                </div>
                <div className='mt-[28px] flex w-full flex-col'>
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
                    className='px-auto mr-[-1px] mt-[8px] h-[18px] self-end text-[12px] font-bold text-[#6D7EAE] underline'
                    onClick={() => {
                      setIsViewSaveOptionExpand(!isViewSaveOptionExpand);
                    }}
                  >
                    {isViewSaveOptionExpand
                      ? 'View less'
                      : 'View more save option'}
                  </button>
                </div>
              </div>
              <div className='grow'></div>
            </div>
          </div>

          <div className=''>
            {/* //////// INFORMATION /////////*/}

            <button
              className=' mt-2 rounded-lg border-2 border-black bg-white p-2 hover:bg-blue-900 hover:text-white'
              onClick={() => setTypeOfQR(typeOfQR === 'wifi' ? 'url' : 'wifi')}
            >
              CHANGE TO {typeOfQR === 'wifi' ? 'url' : 'wifi'}
            </button>
          </div>
        </div>

        <div>
          <div className='mx-[20px] text-center md:flex md:flex-col md:items-center'>
            <h2 className='text-[36px] font-[700] leading-[65px]'>
              Fessior Tools
            </h2>
            <p className='text-center leading-[24px] md:max-w-[640px]'>
              Your one-stop destination for essential utilities. Discover a
              world of community-driven tools that simplify your daily tasks.
            </p>

            <div className='md:flex md:flex-wrap md:justify-around'>
              {/* {tools.map((tool) => (
                <ToolItem key={tool.name} {...tool} />
              ))} */}
            </div>
          </div>
        </div>
        <div className='absolute right-[-10px] top-[56px] h-[40px] w-[40px] rounded-full bg-primary'></div>
        <div className='absolute left-[40px] top-[145px] hidden h-[12px] w-[12px] rounded-full bg-primary md:left-[30px] md:h-[28px] md:w-[28px] xl:left-[100px] xl:h-[40px] xl:w-[40px]'></div>
        <div className=' absolute left-[-70px] top-[679px] h-[120px] w-[120px] rounded-full bg-primary'></div>
        <div className='absolute bottom-[9px] right-[-30px] h-[80px] w-[80px] rounded-full bg-primary md:hidden'></div>
        <div className='absolute bottom-[0px] right-[60px] h-[20px] w-[20px] rounded-full bg-primary md:hidden'></div>
      </div>
    </>
  );
}
