'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

import { Title } from '@/app/qrcode/sub-nav';
import CategoryItem from '@/components/category-item';
import Modal from '@/components/modal-shorten';
import QrHomeButton from '@/components/qr-home-button';
import SelectInput from '@/components/select-input';
import TextInput from '@/components/text-input';
// import ToolItem from '@/components/tool-item';
import meService from '@/services/me.service';
import { tools } from '@/services/tool.service';
import urlService from '@/services/url.service';
import Organization from '@/types/organization-type';
import Url from '@/types/url-type';

export default function Shorten() {
  return (
    <>
      <div className='relative flex flex-col items-center overflow-hidden pt-[88px] leading-[1.2] text-primary '>
        <div className='w-[80%] lg:flex lg:flex-col lg:items-center '>
          <button
            className='mr-auto inline-flex'
            onClick={() => {
              alert('Clicked Back');
            }}
          >
            <div className='font-baloo-chettan-2 mr-auto inline-flex text-center '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='mr-1 h-6 gap-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18'
                />
              </svg>
              <div className='m-auto text-[16px]'>Back</div>
            </div>
          </button>
          <div className=' mb-2 ml-auto mr-auto w-[100%] rounded-lg border border-black border-opacity-30 bg-white p-6 pb-[15px] shadow-[0_20px_20px_0px_rgba(11,40,120,0.2)] '>
            <div className='text-center text-[16px] font-[900] md:text-[20px]'>
              Customize QR
            </div>
            <div className='mb-3 mt-2 flex justify-center'>
              <div className='h-1 w-[600px] rounded-lg bg-[#D9D9D9]  md:h-2'>
                <div className='relative left-0 h-1 w-[25%] rounded-lg bg-[#0B2878] md:h-2'></div>
              </div>
            </div>
            <div className=' ml-auto mr-auto flex justify-center'>
              <div className='inline-flex gap-2'>
                <Title content='Information' />
                <Title content='Frame' />
                <Title content='Pattern' />
                <Title content='Logo' />
              </div>
            </div>
          </div>

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
        <div className='absolute right-[-10px] top-[46px] h-[40px] w-[40px] rounded-full bg-primary'></div>
        <div className='absolute left-[40px] top-[145px] hidden h-[12px] w-[12px] rounded-full bg-primary md:left-[30px] md:h-[28px] md:w-[28px] lg:left-[100px] lg:h-[40px] lg:w-[40px]'></div>
        <div className='absolute left-[-70px] top-[679px] h-[120px] w-[120px] rounded-full bg-primary'></div>
        <div className='absolute bottom-[9px] right-[-30px] h-[80px] w-[80px] rounded-full bg-primary md:hidden'></div>
        <div className='absolute bottom-[0px] right-[60px] h-[20px] w-[20px] rounded-full bg-primary md:hidden'></div>
      </div>
    </>
  );
}
