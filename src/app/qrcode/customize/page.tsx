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
import QRSaveBox from '@/components/qr-save-box';
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

export default function QRCustomize() {
  const [typeOfQR, setTypeOfQR] = useState('url');
  const [patternColorType, setPatternColorType] = useState('singleColor');
  const [zoomMiniQR, setZoomMiniQR] = useState(true);
  const [isViewSaveOptionExpand, setIsViewSaveOptionExpand] = useState(false);

  return (
    <>
      <div className='relative flex w-[100%] flex-col items-center justify-start  pt-[88px] leading-[1.2] text-primary'>
        <MiniQR />
        {/* ///////////// MAIN ////////////// */}
        <div className='w-[90%] md:w-[85%] xl:relative'>
          {/* ////// HEADER + PROCESS BAR ////////// */}
          <QRNavBar />
          <div className='xl:relative xl:flex xl:flex-row xl:gap-[28px] '>
            <div className='flex flex-col gap-y-[20px] drop-shadow-[0_4px_47px_rgba(11,40,120,0.3)] xl:mt-[28px] xl:flex xl:grow xl:flex-col xl:items-center xl:gap-y-[24px] xl:rounded-[8px] xl:border-[0.5px] xl:border-[#7E7E7E] xl:border-opacity-30 xl:bg-white xl:px-[24px] xl:py-[24px]'>
              <InformationPart typeOfQR={typeOfQR} />
              <FramePart />
              <PatternPart />
              <LogoPart />
              <SavePart />
            </div>
            <QRSaveBox />
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
      </div>
    </>
  );
}
