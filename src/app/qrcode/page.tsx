'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

import CategoryItem from '@/components/category-item';
import Modal from '@/components/modal-shorten';
import QrHomeButton from '@/components/qr-home-button';
import SelectInput from '@/components/select-input';
import ShortenTools from '@/components/shorten-tools';
import TextInput from '@/components/text-input';
import meService from '@/services/me.service';
import { tools } from '@/services/tool.service';
import urlService from '@/services/url.service';
import Organization from '@/types/organization-type';
import Url from '@/types/url-type';

export default function Shorten() {
  return (
    <>
      <div className='relative flex flex-col items-center overflow-hidden leading-[1.2] text-primary'>
        <div className='md:max-w-[1000px] lg:flex lg:flex-col lg:items-center'>
          <div className='text-center'>
            <h1 className='mt-[86px] text-[40px] font-[700] leading-[65px] md:text-[48px] lg:text-[60px]'>
              <span className=' md:inline'>Fessior</span> QR Generator
            </h1>
            <p className='mb-[46px] leading-[24px] md:text-[24px] lg:text-[28px] lg:leading-[65px]'>
              Convenience, efficiency, and versatility:{' '}
              <br className='md:hidden' /> QR Code Management Made Easy
            </p>
          </div>
          <div className='relative mx-auto  mb-[172px] w-[90%] items-start rounded-[8px] border-[0.5px] border-solid border-[#7e7e7e4d] bg-white p-[16px] shadow-[0px_4px_47px_0px_rgba(11,40,120,0.30)] sm:max-w-[480px] md:flex md:w-[85%] md:max-w-[760px] md:flex-grow lg:w-[70%] lg:max-w-[740px]'>
            <div className='md:flex-grow md:p-2 lg:p-6'>
              <QrHomeButton
                type='Website URL'
                image='icons/link-qr.svg'
                content='Link to a website of your choice'
              />
              <div className='pt-4 md:pt-6 lg:pt-5'>
                <QrHomeButton
                  type='Wi-Fi'
                  image='icons/wifi.svg'
                  content='Connect to a wireless network'
                />
              </div>
              <div className='absolute left-[-15px] top-[-15px] z-[-1] h-[80px] w-[120px] rounded-[8px] bg-primary'></div>
              <div className='absolute bottom-[-15px] right-[-15px] z-[-1] h-[80px] w-[120px] rounded-[8px] bg-primary'></div>
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
            <ShortenTools />
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
