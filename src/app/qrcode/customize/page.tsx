'use client';

import { useState } from 'react';

import CategoryItem from '@/components/category-item';
import SelectInput from '@/components/select-input';
import TextInput from '@/components/text-input';
// import ToolItem from '@/components/tool-item';
import meService from '@/services/me.service';
import { tools } from '@/services/tool.service';
import urlService from '@/services/url.service';
import Organization from '@/types/organization-type';
import Url from '@/types/url-type';

export default function Shorten() {
  const [typeOfQR, setTypeOfQR] = useState('url');
  return (
    <>
      <div className='relative flex flex-col items-center overflow-hidden pt-[88px] leading-[1.2] text-primary '>
        {/* ///////////// MAIN ////////////// */}
        <div>
          {/* ////// HEADER + PROCESS BAR ////////// */}
          {/* This will be replaced by Bun's nav bar when it bigger */}
          <div className='w-[296px] flex-col md:hidden'>
            <p className='text-center text-base font-bold'>Customize QR</p>
            <div className='relative'>
              <div className='absolute h-1 w-[100%] rounded-lg bg-[#D9D9D9]' />
              <div className='absolute h-1 w-[20%] rounded-lg bg-[#0B2878]' />
            </div>
          </div>
          {/* //////// CUSTOM PARTS //////////// */}
          <div className=''>
            {/* //////// INFORMATION /////////*/}
            <div className='mt-[35px] w-[320px] flex-col rounded-lg border-2 border-[#0B2878] px-[16px] pb-[16px] pt-[8px] shadow md:w-[648px]'>
              <div>
                <p className='text-center text-base font-bold md:text-left'>
                  Information
                </p>
              </div>
              <div className='md:ml-[2px] md:inline-flex md:h-[48px] md:items-center'>
                <p className='text-base font-medium md:w-[104px]'>QR name</p>
                <div className='md:ml-[34px] md:w-[464px]'>
                  <TextInput
                    iconSrc='/icons/label_outline.svg'
                    iconAlt='icon'
                    placeholder='Enter your QR name'
                    value=''
                    iconPosition='left'
                    divider={true}
                    onInput={() => {}}
                    onEnter={() => {}}
                  />
                </div>
              </div>
              <div className={typeOfQR === 'url' ? 'hidden' : 'flex-col'}>
                <div className='mt-[16px] md:ml-[2px] md:inline-flex md:h-[48px] md:items-center'>
                  <p className='text-base font-medium md:w-[104px]'>
                    Wifi SSID
                  </p>
                  <div className='md:ml-[34px] md:w-[464px]'>
                    <TextInput
                      iconSrc='/icons/label_outline.svg'
                      iconAlt='icon'
                      placeholder='Enter your Wifi SSID (name)'
                      value=''
                      iconPosition='left'
                      divider={true}
                      onInput={() => {}}
                      onEnter={() => {}}
                    />
                  </div>
                </div>
                <div className='md:hidden'>
                  <div className='mt-[16px] inline-flex items-center md:ml-[2px] md:h-[48px]'>
                    <p className='mr-[14px] text-base font-medium md:w-[104px]'>
                      Encryption
                    </p>

                    <SelectInput
                      value='WPA/WPA2'
                      options={['WPA/WPA2', 'WEP', 'NONE', 'RAW']}
                      onChange={() => {}}
                      className='ms-[4px] w-[136px] md:ms-[8px]'
                    />
                  </div>
                  <div className='mt-[16px]'>
                    <p className='mr-[14px] text-base font-medium'>Password</p>
                    <div className='md:-ml-[2px] md:inline-block md:flex-grow'>
                      <TextInput
                        iconSrc='/icons/verified_user.svg'
                        iconAlt='search'
                        placeholder='Enter your password'
                        value={''}
                        divider={true}
                        onInput={() => {}}
                      />
                    </div>
                  </div>
                </div>
                <div className='hidden flex-col md:flex'>
                  <div className='mt-[16px] md:ml-[2px] md:inline-flex md:h-[48px] md:items-center'>
                    <p className='text-base font-medium md:w-[104px]'>
                      Password
                    </p>
                    <div className='md:ml-[34px] md:w-[464px]'>
                      <TextInput
                        iconSrc='/icons/verified_user.svg'
                        iconAlt='search'
                        placeholder='Enter your password'
                        value={''}
                        divider={true}
                        onInput={() => {}}
                      />
                    </div>
                  </div>
                  <div className='mt-[16px] md:ml-[2px] md:inline-flex md:h-[48px] md:items-center'>
                    <p className='text-base font-medium md:w-[104px]'>
                      Encryption
                    </p>
                    <div className='md:ml-[28px] md:w-[464px]'>
                      <SelectInput
                        value='WPA/WPA2'
                        options={['WPA/WPA2', 'WEP', 'NONE', 'RAW']}
                        onChange={() => {}}
                        className='ms-[4px] w-[136px] md:ms-[8px]'
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={typeOfQR === 'wifi' ? 'hidden' : 'flex-col'}>
                <div className='mt-[16px] md:ml-[2px] md:inline-flex md:h-[48px] md:items-center'>
                  <p className='text-base font-medium md:w-[104px]'>Your URL</p>
                  <div className='md:ml-[34px] md:w-[464px]'>
                    <TextInput
                      iconSrc='/icons/link-qr-20px.svg'
                      iconAlt='icon'
                      placeholder='Enter your URL'
                      value=''
                      iconPosition='left'
                      divider={true}
                      onInput={() => {}}
                      onEnter={() => {}}
                    />
                  </div>
                </div>
                <div className='md:inline-flex md:items-center '>
                  <div className='mt-[10px] inline-flex items-center md:ml-[2px] md:h-[48px]'>
                    <p className='mr-[8px] w-[68px] text-xs font-medium md:w-[104px] md:text-base'>
                      Organization
                    </p>
                    <div className='w-[160px] md:ml-[18px] md:w-[137px]'>
                      <SelectInput
                        value='GDSC'
                        options={['GDSC', 'CTCT', 'OISP']}
                        onChange={() => {}}
                        className='ms-[4px] md:ms-[8px]'
                      />
                    </div>
                  </div>
                  <div className='mt-[10px] inline-flex items-center md:ml-[67px] md:h-[48px]'>
                    <p className='mr-[8px] w-[68px] text-xs font-medium md:w-[104px] md:text-base'>
                      Domain
                    </p>
                    <div className='w-[160px] md:ml-[18px] md:w-[137px]'>
                      <SelectInput
                        value='furl.one'
                        options={['furl.one', 'bksp.info', 'gic.gdsc.app']}
                        onChange={() => {}}
                        className='ms-[4px] md:ms-[8px]'
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-[16px] md:ml-[2px] md:inline-flex md:h-[48px] md:items-center'>
                <p className='text-base font-medium md:w-[104px]'>Category</p>
                <div className='md:ml-[34px] md:w-[464px]'>
                  <TextInput
                    iconSrc='/icons/search-20px.svg'
                    iconAlt='search'
                    placeholder='Add or create categories'
                    value={''}
                    divider={true}
                    onInput={() => {}}
                  />
                </div>
              </div>
              <div className='mt-[8px]'>
                <p className='me-[6px] inline text-[16px] font-[500] text-black md:text-[16px]'>
                  Chosen categories
                </p>
                <div className='inline'>
                  <CategoryItem text='Event' />
                  <CategoryItem text='Favorite' />
                </div>
              </div>
            </div>
            {/* /////////// FRAME ////////// */}
            <div className='mt-[20px] w-[320px] flex-col rounded-lg border-2 border-[#0B2878] px-[16px] pb-[16px] pt-[8px] shadow md:w-[648px]'>
              <div>
                <p className='text-center text-base font-bold md:text-left'>
                  Frame
                </p>
              </div>
              <div className='md:ml-[2px]  md:items-center'>
                <p className='text-base font-medium md:w-[155px]'>
                  Frame background
                </p>
                <div className='mt-[4px] inline-flex h-[40px] w-[112px] items-center rounded-lg border pl-[10px] pr-[6px] md:h-[60px] md:w-[202px]'>
                  <div>
                    <p className='text-sm font-medium md:text-base'>#FFFFFF</p>
                  </div>
                  <div className='ml-auto h-[28px] w-[28px] rounded-lg border md:h-[48px] md:w-[48px]'></div>
                </div>
                <div className='mt-[8px] inline-flex items-center'>
                  <p className='text-sx font-normal'>Transparent background</p>
                  <div className='relative ml-[28px] h-[14px] w-[22px] flex-col items-start justify-start'>
                    <div className='absolute h-[14px] w-[22px] rounded-2xl border' />
                    <div className='absolute left-[3px] top-[3px] h-[8px] w-[8px] rounded-2xl bg-[#0B2878]' />
                  </div>
                </div>
              </div>
              <div className='mt-[16px] md:ml-[2px] md:inline-flex md:h-[48px] md:items-center'>
                <p className='text-base font-medium md:w-[104px]'>
                  Additional text
                </p>
                <input
                  type='text'
                  placeholder='Enter additional text'
                  className='mt-[4px] w-[100%] rounded-lg border py-[10px] pl-[12px]'
                />
              </div>
            </div>
            {/* PATTERN */}
            <div className='mt-[20px] w-[320px] flex-col rounded-lg border-2 border-[#0B2878] px-[16px] pb-[16px] pt-[8px] shadow md:w-[648px]'>
              PATTERN GOES HERE
            </div>
            {/* LOGO */}
            <div className='mt-[20px] w-[320px] flex-col rounded-lg border-2 border-[#0B2878] px-[16px] pb-[16px] pt-[8px] shadow md:w-[648px]'>
              LOGO GOES HERE
            </div>
            {/* SAVE */}
            <div className='mt-[20px] w-[320px] flex-col rounded-lg border-2 border-[#0B2878] px-[16px] pb-[16px] pt-[8px] shadow md:w-[648px]'>
              SAVE GOES HERE
            </div>
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
        <div className='absolute left-[40px] top-[145px] hidden h-[12px] w-[12px] rounded-full bg-primary md:left-[30px] md:h-[28px] md:w-[28px] lg:left-[100px] lg:h-[40px] lg:w-[40px]'></div>
        <div className='absolute left-[-70px] top-[679px] h-[120px] w-[120px] rounded-full bg-primary'></div>
        <div className='absolute bottom-[9px] right-[-30px] h-[80px] w-[80px] rounded-full bg-primary md:hidden'></div>
        <div className='absolute bottom-[0px] right-[60px] h-[20px] w-[20px] rounded-full bg-primary md:hidden'></div>
      </div>
    </>
  );
}
