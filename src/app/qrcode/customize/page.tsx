'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

import LinkIcon from '@/app/qrcode/linkIcon';
import { Title } from '@/app/qrcode/sub-nav';
import CategoryItem from '@/components/category-item';
import { InputWithLabel } from '@/components/customize-qr/label-input';
import LabelLogo from '@/components/customize-qr/labelLogo';
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

import DomainOrg from './domain-org';

export default function Shorten() {
  return (
    <>
      <div className='relative flex flex-col items-center overflow-hidden pt-[88px] leading-[1.2] text-primary '>
        <div className='w-[88%] lg:flex lg:flex-col lg:items-center '>
          <div className='w-[100%] flex-col items-center gap-2'>
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
                  className='mr-1 hidden h-6 gap-2 md:flex'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18'
                  />
                </svg>
                <div className='m-auto hidden text-[16px] md:flex'>Back</div>
              </div>
            </button>
            <div className='ml-auto mr-auto w-[100%] rounded-lg border-black border-opacity-30 bg-transparent px-6 pb-[15px] pt-[8px] md:border md:bg-white md:shadow-[0_20px_20px_0px_rgba(11,40,120,0.2)] '>
              <div className='text-center text-[16px] font-[900] md:text-[20px]'>
                Customize QR
              </div>
              <div className='mb-3 mt-[4px] flex justify-center'>
                <div className='h-1 w-[600px] rounded-lg bg-[#D9D9D9]  md:h-2'>
                  <div className='relative left-0 h-1 w-[25%] rounded-lg bg-[#0B2878] md:h-2'></div>
                </div>
              </div>
              <div className='ml-auto mr-auto hidden flex-row justify-center gap-2 md:flex'>
                <Title content='Information' isActive='true' />
                <Title content='Frame' isActive='false' />
                <Title content='Pattern' isActive='false' />
                <Title content='Logo' isActive='false' />
              </div>
            </div>
            This is the information box
            <div className='w-[100%] flex-col rounded-lg border-2 border-[#0B2878] bg-white p-[16px] pt-[8px] shadow'>
              <h1 className='text-center font-semibold'>Information</h1>
              <InputWithLabel
                label='QR name'
                icon={
                  <div className=''>
                    <LabelLogo />
                  </div>
                }
                placeHolder='Enter your QR name'
              />
              <div className='pt-[12px]'>
                <InputWithLabel
                  label='Your URL'
                  icon={<LinkIcon />}
                  placeHolder='Enter your URL'
                />
              </div>

              <DomainOrg label='Organization' placeholder='GDSC' />
              <DomainOrg label='Domain' placeholder='furl.one' />
              <div className='pb-[10px]' />
              <InputWithLabel
                label='Category'
                icon={
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-4 w-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                    />
                  </svg>
                }
                placeHolder='Add or create categories'
              />
              <div className='mb-[8px] mt-[7px]'>
                <p className='me-[6px] inline text-[12px] font-[500] text-black md:text-[16px]'>
                  Chosen categories
                </p>
                <div className='inline'>
                  <CategoryItem text='Event' />
                  <CategoryItem text='Favorite' />
                </div>
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
        <div className='absolute right-[-10px] top-[56px] h-[40px] w-[40px] rounded-full bg-primary'></div>
        <div className='absolute left-[40px] top-[145px] hidden h-[12px] w-[12px] rounded-full bg-primary md:left-[30px] md:h-[28px] md:w-[28px] lg:left-[100px] lg:h-[40px] lg:w-[40px]'></div>
        <div className='absolute left-[-70px] top-[679px] h-[120px] w-[120px] rounded-full bg-primary'></div>
        <div className='absolute bottom-[9px] right-[-30px] h-[80px] w-[80px] rounded-full bg-primary md:hidden'></div>
        <div className='absolute bottom-[0px] right-[60px] h-[20px] w-[20px] rounded-full bg-primary md:hidden'></div>
      </div>
    </>
  );
}
