'use client';

import Image from 'next/image';
import { useState } from 'react';

import CategoryItem from '@/components/category-item';
import DropDown from '@/components/listbox-select';
import QRNavBar from '@/components/qr-navbar';
import SelectInput from '@/components/select-input';
import TextInput from '@/components/text-input';
// import ToolItem from '@/components/tool-item';
import ToggleButton from '@/components/toggle-button';
import meService from '@/services/me.service';
import { tools } from '@/services/tool.service';
import urlService from '@/services/url.service';
import Organization from '@/types/organization-type';
import Url from '@/types/url-type';

export default function Shorten() {
  const [typeOfQR, setTypeOfQR] = useState('url');
  const [patternColorType, setPatternColorType] = useState('singleColor');
  const handleRadioButton = (value: string) => {
    setPatternColorType(value);
  };
  return (
    <>
      <div className='relative flex w-[100%] flex-col items-center justify-start overflow-hidden pt-[88px] leading-[1.2] text-primary'>
        {/* ///////////// MAIN ////////////// */}
        <div className='w-[90%] md:w-[85%]'>
          <p>Start</p>
          {/* ////// HEADER + PROCESS BAR ////////// */}
          {/* This will be replaced by Bun's nav bar when it bigger */}
          <div className='flex w-[100%] flex-col items-center xl:hidden'>
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
          <div className='mt-[35px] flex w-[100%] flex-col rounded-[8px] border-[3px] border-[#0B2878] px-[16px] md:pr-[32px]'>
            <div className='mt-[8px] h-[20px] md:mt-[16px] md:h-[29px]'>
              <p className=' text-center text-[16px] font-bold  md:text-left md:text-[20px] md:font-medium'>
                Information
              </p>
            </div>

            <div className='mt-[8px] flex w-full flex-col  md:mt-[15px] md:flex-row md:items-center'>
              <div className='flex h-[24px] flex-col justify-center md:ml-[4px]'>
                <p className='text-[16px] font-medium md:w-[104px]'>QR name</p>
              </div>

              <div className='relative mt-[4px] h-[40px] w-full rounded-[8px] border-[0.5px] border-gray-300 md:ml-[33px] md:mt-0 md:h-[48px]'>
                <input
                  type='text'
                  className='h-full w-full rounded-[8px] pl-[36px] text-[12px] focus:outline-[1px] focus:outline-primary md:pl-[48px] md:text-[16px]'
                  placeholder='Enter your QR name'
                />
                <svg
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute left-[5px] top-2.5 h-[20px] w-[20px] md:left-[10px] md:top-[12px] md:h-[24px] md:w-[24px]'
                >
                  <path
                    d='M14.32 5.6C14.0168 5.23571 13.5116 5 12.9474 5L3.68421 5.00714C2.75789 5.00714 2 5.64286 2 6.42857V13.5714C2 14.3571 2.75789 14.9929 3.68421 14.9929L12.9474 15C13.5116 15 14.0168 14.7643 14.32 14.4L18 10L14.32 5.6ZM12.9474 13.5714H3.68421V6.42857H12.9474L15.9368 10L12.9474 13.5714Z'
                    fill='#0B2878'
                  />
                </svg>
                <div className='absolute left-[30px] top-[8px] h-[24px] w-[0.5px] bg-[#696969] opacity-[30%] md:left-[40px] md:top-[12px]'></div>
              </div>
            </div>
            <div className={`${typeOfQR === 'url' ? '' : 'hidden'}`}>
              <div className='mt-[8px] flex w-full flex-col  md:mt-[20px] md:flex-row md:items-center'>
                <div className='flex h-[24px] flex-col justify-center md:ml-[4px]'>
                  <p className='text-[16px] font-medium md:w-[104px]'>
                    Your URL
                  </p>
                </div>

                <div className='relative mt-[4px] h-[40px] w-full rounded-[8px] border-[0.5px] border-gray-300 md:ml-[33px] md:mt-0 md:h-[48px]'>
                  <input
                    type='text'
                    className='h-full w-full rounded-[8px] pl-[36px] text-[12px] focus:outline-[1px] focus:outline-primary md:pl-[48px] md:text-[16px]'
                    placeholder='Enter your URL'
                  />
                  <svg
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='absolute left-[5px] top-2.5 h-[20px] w-[20px] md:left-[10px] md:top-[12px] md:h-[24px] md:w-[24px]'
                  >
                    <path
                      d='M3.24984 9.9987C3.24984 8.5737 4.40817 7.41536 5.83317 7.41536H9.1665V5.83203H5.83317C3.53317 5.83203 1.6665 7.6987 1.6665 9.9987C1.6665 12.2987 3.53317 14.1654 5.83317 14.1654H9.1665V12.582H5.83317C4.40817 12.582 3.24984 11.4237 3.24984 9.9987ZM6.6665 10.832H13.3332V9.16536H6.6665V10.832ZM14.1665 5.83203H10.8332V7.41536H14.1665C15.5915 7.41536 16.7498 8.5737 16.7498 9.9987C16.7498 11.4237 15.5915 12.582 14.1665 12.582H10.8332V14.1654H14.1665C16.4665 14.1654 18.3332 12.2987 18.3332 9.9987C18.3332 7.6987 16.4665 5.83203 14.1665 5.83203Z'
                      fill='#0B2878'
                      fill-opacity='0.87'
                    />
                  </svg>
                  <div className='absolute left-[30px] top-[8px] h-[24px] w-[0.5px] bg-[#696969] opacity-[30%] md:left-[40px] md:top-[12px]'></div>
                </div>
              </div>
              <div className='mr-[52px] mt-[10px] flex w-auto flex-col md:ml-[4px] md:mr-[0px] md:flex-row'>
                {/* Organization and Domain*/}
                <div className='flex flex-row items-center md:w-[277px] md:grow'>
                  <div className='flex h-[18px] w-[68px] flex-col justify-center md:w-[104px]'>
                    <p className='text-[12px] md:text-[16px] md:font-medium'>
                      Organization
                    </p>
                  </div>

                  <div className='relative ml-[8px] grow md:ml-[33px]'>
                    <DropDown
                      value='GDSC'
                      options={['GDSC', 'CTCT', 'OISP']}
                      heightOfDropDown='28'
                      textSize='12'
                      paddingLeft='8'
                      mediumHeight='32'
                      mediumTextSize='16'
                    />
                  </div>
                </div>
                <div className='mt-[10px] flex flex-row items-center md:ml-[85px] md:w-[240px] md:grow'>
                  <div className='flex h-[18px] w-[68px] flex-col justify-center md:w-[54px]'>
                    <p className='text-[12px] md:text-[16px] md:font-medium'>
                      Domain
                    </p>
                  </div>
                  <div className='relative ml-[8px] grow md:ml-[46px]'>
                    <DropDown
                      value='furl.one'
                      options={['furl.one', 'bkoisp.info', 'gic.gdsc.app']}
                      heightOfDropDown='28'
                      textSize='12'
                      paddingLeft='8'
                      mediumHeight='32'
                      mediumTextSize='16'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={`${typeOfQR === 'wifi' ? '' : 'hidden'}`}>
              <div className='mt-[8px] flex w-full flex-col  md:mt-[20px] md:flex-row md:items-center'>
                <div className='flex h-[24px] flex-col justify-center md:ml-[4px]'>
                  <p className='text-[16px] font-medium md:w-[104px]'>
                    Wifi SSID
                  </p>
                </div>

                <div className='relative mt-[4px] h-[40px] w-full rounded-[8px] border-[0.5px] border-gray-300 md:ml-[33px] md:mt-0 md:h-[48px]'>
                  <input
                    type='text'
                    className='h-full w-full rounded-[8px] pl-[36px] text-[12px] focus:outline-[1px] focus:outline-primary md:pl-[48px] md:text-[16px]'
                    placeholder='Enter your URL'
                  />
                  <svg
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='absolute left-[5px] top-2.5 h-[20px] w-[20px] md:left-[10px] md:top-[12px] md:h-[24px] md:w-[24px]'
                  >
                    <path
                      d='M14.32 5.6C14.0168 5.23571 13.5116 5 12.9474 5L3.68421 5.00714C2.75789 5.00714 2 5.64286 2 6.42857V13.5714C2 14.3571 2.75789 14.9929 3.68421 14.9929L12.9474 15C13.5116 15 14.0168 14.7643 14.32 14.4L18 10L14.32 5.6ZM12.9474 13.5714H3.68421V6.42857H12.9474L15.9368 10L12.9474 13.5714Z'
                      fill='#0B2878'
                    />
                  </svg>
                  <div className='absolute left-[30px] top-[8px] h-[24px] w-[0.5px] bg-[#696969] opacity-[30%] md:left-[40px] md:top-[12px]'></div>
                </div>
              </div>
              <div className='mt-[16px] flex flex-row items-center'>
                <div className='flex h-[24px] w-[88px] flex-col justify-center md:ml-[4px] md:w-[104px]'>
                  <p className='text-[16px]  font-medium '>Encryption</p>
                </div>
                <div className='w-[136px] md:ml-[33px] md:w-[160px]'>
                  <DropDown
                    value='WPA/WPA2'
                    options={['WPA/WPA2', 'WEP', 'NONE', 'RAW']}
                    heightOfDropDown='40'
                    textSize='16'
                    paddingLeft='16'
                    mediumHeight='48'
                    mediumTextSize='20'
                  />
                </div>
              </div>
              <div className='mt-[8px] flex w-full flex-col  md:mt-[20px] md:flex-row md:items-center'>
                <div className='flex h-[24px] flex-col justify-center md:ml-[4px]'>
                  <p className='text-[16px] font-medium md:w-[104px]'>
                    Password
                  </p>
                </div>

                <div className='relative mt-[4px] h-[40px] w-full rounded-[8px] border-[0.5px] border-gray-300 md:ml-[33px] md:mt-0 md:h-[48px]'>
                  <input
                    type='text'
                    className='h-full w-full rounded-[8px] pl-[36px] text-[12px] focus:outline-[1px] focus:outline-primary md:pl-[48px] md:text-[16px]'
                    placeholder='Enter your password'
                  />
                  <svg
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='absolute left-[6px] top-2.5 h-[20px] w-[20px] md:left-[10px] md:top-[12px] md:h-[24px] md:w-[24px]'
                  >
                    <path
                      d='M9 0.832031L0.75 4.16536V9.16536C0.75 13.7904 4.27 18.1154 9 19.1654C13.73 18.1154 17.25 13.7904 17.25 9.16536V4.16536L9 0.832031ZM7.16667 14.1654L3.5 10.832L4.7925 9.65703L7.16667 11.807L13.2075 6.31536L14.5 7.4987L7.16667 14.1654Z'
                      fill='#0B2878'
                    />
                  </svg>
                  <div className='absolute left-[30px] top-[8px] h-[24px] w-[0.5px] bg-[#696969] opacity-[30%] md:left-[40px] md:top-[12px]'></div>
                </div>
              </div>
            </div>

            <div
              className={`${
                typeOfQR === 'wifi' ? 'md:mt-[20px]' : 'md:mt-[10px]'
              } mt-[8px] flex w-full flex-col md:flex-row md:items-center`}
            >
              <div className='flex h-[24px] flex-col justify-center md:ml-[4px]'>
                <p className='text-[16px] font-medium md:w-[104px]'>Category</p>
              </div>

              <div className='relative mt-[4px] h-[40px] w-full rounded-[8px] border-[0.5px] border-gray-300 md:ml-[33px] md:mt-0 md:h-[48px]'>
                <input
                  type='text'
                  className='h-full w-full rounded-[8px] pl-[36px] text-[12px] focus:outline-[1px] focus:outline-primary md:pl-[48px] md:text-[16px]'
                  placeholder='Add or create categories'
                />
                <svg
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute left-[5px] top-2.5 h-[20px] w-[20px] md:left-[10px] md:top-[12px] md:h-[24px] md:w-[24px]'
                >
                  <path
                    d='M12.9167 11.6667H12.2583L12.025 11.4417C12.8417 10.4917 13.3333 9.25833 13.3333 7.91667C13.3333 4.925 10.9083 2.5 7.91667 2.5C4.925 2.5 2.5 4.925 2.5 7.91667C2.5 10.9083 4.925 13.3333 7.91667 13.3333C9.25833 13.3333 10.4917 12.8417 11.4417 12.025L11.6667 12.2583V12.9167L15.8333 17.075L17.075 15.8333L12.9167 11.6667ZM7.91667 11.6667C5.84167 11.6667 4.16667 9.99167 4.16667 7.91667C4.16667 5.84167 5.84167 4.16667 7.91667 4.16667C9.99167 4.16667 11.6667 5.84167 11.6667 7.91667C11.6667 9.99167 9.99167 11.6667 7.91667 11.6667Z'
                    fill='#0B2878'
                  />
                </svg>
                <div className='absolute left-[30px] top-[8px] h-[24px] w-[0.5px] bg-[#696969] opacity-[30%] md:left-[40px] md:top-[12px]'></div>
              </div>
            </div>
            <div className='mb-[16px] mt-[12px] flex flex-row items-center'>
              <div className='flex h-[15px] flex-col justify-center'>
                <p className='text-[12px] font-medium  text-black md:text-[16px]'>
                  Chosen categories
                </p>
              </div>
              <div className='ml-[8px] flex h-[23px] flex-row items-center justify-center rounded-full bg-primary pl-[12px] pr-[8px] text-center text-[12px] text-white'>
                Event
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='ml-[4px] h-[12px] w-[12px]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18 18 6M6 6l12 12'
                  />
                </svg>
              </div>
              <div className='ml-[8px] flex h-[23px] flex-row items-center justify-center rounded-full bg-primary pl-[12px] pr-[8px] text-center text-[12px] text-white'>
                Favorite
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='ml-[4px] h-[12px] w-[12px]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18 18 6M6 6l12 12'
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className='mt-[20px] flex w-[100%] flex-col rounded-[8px] border-[3px] border-[#0B2878] px-[16px] pb-[16px]'>
            <div className='mt-[8px] h-[20px] md:mt-[16px] md:h-[29px]'>
              <p className=' text-center text-[16px] font-bold  md:text-left md:text-[20px] md:font-medium'>
                Frame
              </p>
            </div>
            <div className='mt-[10px] md:ml-[4px]'>
              <div className='flex h-[24px] flex-col justify-center md:h-[30px] md:justify-end'>
                <p className='text-[16px] font-medium '>Frame background</p>
              </div>
              <div className='mt-[4px] flex h-[40px] w-[112px] flex-row items-center rounded-[8px] border pl-[10px] pr-[6px]'>
                <p className='text-[14px] font-medium text-primary'>#FFFFFF</p>
                <div className='ml-auto h-[28px] w-[28px] rounded-[8px] border'></div>
              </div>
            </div>
            <div className='mt-[8px] inline-flex flex-row items-center '>
              <div className='mr-[27px] flex h-[16px] w-[129px] flex-row items-center'>
                <p className='text-[12px] font-normal'>
                  Transparent background
                </p>
              </div>
              <ToggleButton type='phone' />
            </div>
            <div className='mt-[16px]'>
              <div className='flex h-[24px] flex-col justify-center'>
                <p className='text-[16px]  font-medium '>Additional text</p>
              </div>
              <div className='relative mt-[4px] h-[40px] w-auto rounded-[8px] border-[0.5px] border-gray-300'>
                <input
                  type='text'
                  className='h-full w-full rounded-[8px] pl-[12px] text-[12px] focus:outline-[1px] focus:outline-primary'
                  placeholder='Enter additional text'
                />
              </div>
              <div className='mt-[8px] flex flex-row gap-[18px]'>
                <div className='w-[100px] max-w-[125px] grow'>
                  <div className='flex-cols flex h-[16px] items-center justify-start'>
                    <p className='text-[12px] font-medium'> Font</p>
                  </div>
                  <div className='mt-[4px]'>
                    <DropDown
                      value='Roboto'
                      options={[
                        'Times New Roman',
                        'Baloo Chettan 2',
                        'Glory',
                        'Arial',
                        'ABeeZee',
                        'Aldrich',
                      ]}
                      heightOfDropDown='28'
                      textSize='12'
                      paddingLeft='8'
                    />
                  </div>
                </div>
                <div className='w-[100px] max-w-[125px] grow'>
                  <div className='flex-cols flex h-[16px] items-center justify-start'>
                    <p className='text-[12px] font-medium'> Text color</p>
                  </div>
                  <div className='mt-[4px] flex h-[28px] w-auto flex-row items-center rounded-[8px] border pl-[8px] pr-[4px]'>
                    <p className='text-[12px]'>#FFFFFF</p>
                    <div className='ml-auto h-[20px] w-[20px] rounded-[8px] border'></div>
                  </div>
                </div>
                <div className='w-[52px] grow'>
                  <div className='flex-cols flex h-[16px] items-center justify-start'>
                    <p className='text-[12px] font-medium'> Text size</p>
                  </div>
                  <div className='mt-[4px] max-w-[72px]'>
                    <DropDown
                      value='18px'
                      options={[
                        '16px',
                        '18px',
                        '20px',
                        '24px',
                        '28px',
                        '32px',
                        '36px',
                        '40px',
                      ]}
                      heightOfDropDown='28'
                      textSize='12'
                      paddingLeft='6'
                    />
                  </div>
                </div>
              </div>
              <div className='mt-[8px] grid grid-cols-2 gap-x-[16px] gap-y-[8px]'>
                <div>
                  <div className='flex-cols flex h-[16px] items-center justify-start'>
                    <p className='text-[12px] font-medium'> Border width</p>
                  </div>
                  <div className='mt-[4px]'>
                    <DropDown
                      value='18px'
                      options={[
                        '16px',
                        '18px',
                        '20px',
                        '24px',
                        '28px',
                        '32px',
                        '36px',
                        '40px',
                      ]}
                      heightOfDropDown='28'
                      textSize='12'
                      paddingLeft='6'
                    />
                  </div>
                </div>
                <div>
                  <div className='flex-cols flex h-[16px] items-center justify-start'>
                    <p className='text-[12px] font-medium'> Border radius</p>
                  </div>
                  <div className='mt-[4px]'>
                    <DropDown
                      value='18px'
                      options={[
                        '16px',
                        '18px',
                        '20px',
                        '24px',
                        '28px',
                        '32px',
                        '36px',
                        '40px',
                      ]}
                      heightOfDropDown='28'
                      textSize='12'
                      paddingLeft='6'
                    />
                  </div>
                </div>
                <div>
                  <div className='flex-cols flex h-[16px] items-center justify-start'>
                    <p className='text-[12px] font-medium'> Padding</p>
                  </div>
                  <div className='mt-[4px]'>
                    <DropDown
                      value='18px'
                      options={[
                        '16px',
                        '18px',
                        '20px',
                        '24px',
                        '28px',
                        '32px',
                        '36px',
                        '40px',
                      ]}
                      heightOfDropDown='28'
                      textSize='12'
                      paddingLeft='6'
                    />
                  </div>
                </div>
                <div>
                  <div className='flex-cols flex h-[16px] items-center justify-start'>
                    <p className='text-[12px] font-medium'> Margin</p>
                  </div>
                  <div className='mt-[4px]'>
                    <DropDown
                      value='18px'
                      options={[
                        '16px',
                        '18px',
                        '20px',
                        '24px',
                        '28px',
                        '32px',
                        '36px',
                        '40px',
                      ]}
                      heightOfDropDown='28'
                      textSize='12'
                      paddingLeft='6'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-[20px] flex w-[100%] flex-col rounded-[8px] border-[3px] border-[#0B2878] pb-[16px] pl-[16px] pr-[16px] pt-[8px]'>
            <div className='flex h-[20px] flex-col items-center'>
              <p className=' text-center text-[16px] font-bold'>Pattern</p>
            </div>

            <div className='mt-[8px] flex flex-wrap items-center justify-start gap-[12px]'>
              <div className='h-[64px] w-[64px]'>
                <Image
                  src='/images/qrcode/pattern/example1.png'
                  alt='Pattern 1'
                  height='100'
                  width='100'
                />
              </div>
              <div className='h-[64px] w-[64px]'>
                <Image
                  src='/images/qrcode/pattern/example2.png'
                  alt='Pattern 1'
                  height='100'
                  width='100'
                />
              </div>
              <div className='h-[64px] w-[64px]'>
                <Image
                  src='/images/qrcode/pattern/example3.png'
                  alt='Pattern 1'
                  height='100'
                  width='100'
                />
              </div>
              <div className='h-[64px] w-[64px]'>
                <Image
                  src='/images/qrcode/pattern/example1.png'
                  alt='Pattern 1'
                  height='100'
                  width='100'
                />
              </div>
              <div className='h-[64px] w-[64px]'>
                <Image
                  src='/images/qrcode/pattern/example2.png'
                  alt='Pattern 1'
                  height='100'
                  width='100'
                />
              </div>
              <div className='h-[64px] w-[64px]'>
                <Image
                  src='/images/qrcode/pattern/example3.png'
                  alt='Pattern 1'
                  height='100'
                  width='100'
                />
              </div>
              <div className='h-[64px] w-[64px]'>
                <Image
                  src='/images/qrcode/pattern/example2.png'
                  alt='Pattern 1'
                  height='100'
                  width='100'
                />
              </div>
              <div className='h-[64px] w-[64px]'>
                <Image
                  src='/images/qrcode/pattern/example3.png'
                  alt='Pattern 1'
                  height='100'
                  width='100'
                />
              </div>
            </div>
            <div className='mt-[8px] flex flex-col justify-center'>
              <div className='flex flex-row gap-[65px]'>
                {/* SingleColor and Gradient */}
                <div className='flex flex-row items-center'>
                  <input
                    id='singleColor'
                    type='radio'
                    value=''
                    name='patternColor'
                    className='h-[16px] w-[16px]'
                    onChange={() => handleRadioButton('singleColor')}
                  />
                  <label
                    htmlFor='singleColor'
                    className='font-base ms-2 text-[12px]'
                  >
                    Single color
                  </label>
                </div>
                <div className='flex flex-row items-center'>
                  <input
                    id='gradientColor'
                    type='radio'
                    value=''
                    name='patternColor'
                    className='h-[16px] w-[16px]'
                    onChange={() => handleRadioButton('gradientColor')}
                  />
                  <label
                    htmlFor='gradientColor'
                    className='font-base ms-2 text-[12px]'
                  >
                    Gradient color
                  </label>
                </div>
              </div>
              <div className='mt-[8px] flex flex-row'>
                {/* Chosen color*/}
                <div
                  className={`${
                    patternColorType === 'singleColor' ? '' : 'hidden'
                  }    flex h-[40px] w-[138px] flex-row items-center rounded-[8px] border-[0.5px] pl-[8px] pr-[6px]`}
                >
                  <p className='text-[14px] font-medium'>#FFFFFF</p>
                  <div className='ml-auto h-[28px] w-[28px] rounded-[8px] border-[0.5px]'></div>
                </div>
                <div
                  className={`${
                    patternColorType === 'gradientColor'
                      ? 'flex flex-row items-center gap-[12px]'
                      : 'hidden'
                  }    `}
                >
                  <div
                    className={'flex h-[40px] w-[138px] flex-row items-center rounded-[8px] border-[0.5px] pl-[8px] pr-[6px]'}
                  >
                    <p className='text-[14px] font-medium'>#FFFFFF</p>
                    <div className='ml-auto h-[28px] w-[28px] rounded-[8px] border-[0.5px]'></div>
                  </div>
                  <div
                    className={'flex h-[40px] w-[138px] flex-row items-center rounded-[8px] border-[0.5px] pl-[8px] pr-[6px]'}
                  >
                    <p className='text-[14px] font-medium'>#FFFFFF</p>
                    <div className='ml-auto h-[28px] w-[28px] rounded-[8px] border-[0.5px]'></div>
                  </div>
                </div>
              </div>
              <div
                className={`mt-[8px] flex flex-col ${
                  patternColorType === 'gradientColor' ? '' : 'hidden'
                }    `}
              >
                {/* Gradient Type*/}
                <div className='flex-cols flex h-[16px] items-center justify-start'>
                  <p className='text-[12px] font-medium'> Gradient type</p>
                </div>
                <div className='h-[28px] w-[100px]'>
                  <DropDown
                    value='Horizontal'
                    options={['Horizontal', 'Vertical', 'Radio']}
                    heightOfDropDown='28'
                    textSize='12'
                    paddingLeft='8'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='mt-[20px] flex w-[100%] flex-col rounded-[8px] border-[3px] border-[#0B2878] px-[15px] pb-[16px] pt-[8px]'>
            <div className='flex h-[20px] flex-col items-center justify-center'>
              <p className='text-center text-[16px] font-bold'>Logo</p>
            </div>
            <div className='mt-[8px] flex flex-row flex-wrap gap-[10px]'>
              <div className='h-[40px] w-[40px]'>
                <Image
                  src='/images/qrcode/logo/none.png'
                  alt='Pattern 1'
                  height='100'
                  width='100'
                />
              </div>
              <div className='h-[40px] w-[40px]'>
                <Image
                  src='/images/qrcode/logo/youtube.png'
                  alt='Pattern 1'
                  height='100'
                  width='100'
                />
              </div>
              <div className='h-[40px] w-[40px]'>
                <Image
                  src='/images/qrcode/logo/facebook.png'
                  alt='Pattern 1'
                  height='100'
                  width='100'
                />
              </div>
              <div className='h-[40px] w-[40px]'>
                <Image
                  src='/images/qrcode/logo/instagram.png'
                  alt='Pattern 1'
                  height='100'
                  width='100'
                />
              </div>
              <div className='h-[40px] w-[40px]'>
                <Image
                  src='/images/qrcode/logo/google.png'
                  alt='Pattern 1'
                  height='100'
                  width='100'
                />
              </div>
              <div className='h-[40px] w-[40px]'>
                <Image
                  src='/images/qrcode/logo/twitter.png'
                  alt='Pattern 1'
                  height='100'
                  width='100'
                />
              </div>
            </div>
            <div className='mt-[16px] rounded-[8px]'>
              <button className='flex w-[100%] flex-col items-center justify-center rounded-[8px] border border-primary py-[6px]'>
                <div className='flex flex-row items-center'>
                  <div className='h-[20px] w-[20px]'>
                    <Image
                      src='/images/qrcode/logo/file-upload.png'
                      alt='Pattern 1'
                      height='100'
                      width='100'
                    />
                  </div>
                  <div className='ml-[4px] flex h-[20px] w-[82px] flex-col justify-center'>
                    <p className='text-[14px]'>Upload image</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className='mt-[20px] flex w-[100%] flex-col rounded-[8px] border-[3px] border-[#0B2878] px-[35px] pb-[16px] pt-[28px]'>
            <div className='ml-auto mr-auto h-[200px] w-[200px] rounded-[8px] border p-[10px]'>
              <Image
                src='/images/qrcode/example-qr.png'
                alt='Pattern 1'
                height='200'
                width='200'
              />
            </div>
            <div className='gr w- mt-[20px] flex flex-row flex-wrap justify-center gap-x-[24px] gap-y-[8px]'>
              <div className='flex w-[50px] flex-row items-center'>
                <label
                  htmlFor='saveSVG'
                  className='mr-[8px] text-[14px] font-bold'
                >
                  SVG
                </label>
                <input
                  id='saveSVG'
                  type='radio'
                  value=''
                  name='saveType'
                  className='h-[16px] w-[16px]'
                />
              </div>
              <div className='flex w-[50px] flex-row items-center'>
                <label
                  htmlFor='savePNG'
                  className='mr-[8px] text-[14px] font-bold'
                >
                  PNG
                </label>
                <input
                  id='savePNG'
                  type='radio'
                  value=''
                  name='saveType'
                  className='h-[16px] w-[16px]'
                />
              </div>
              <div className='flex h-[24px] flex-row items-center'>
                <p className='mr-[8px] text-[14px] font-bold'>Size</p>
                <div className='w-[56px]'>
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
                    textSize='12'
                    paddingLeft='4'
                  />
                </div>
              </div>
            </div>
            <div className='mt-[8px] h-[40px] w-full'>
              <button className='h-[40px] w-full rounded-[8px] bg-primary'>
                <p className='text-center text-[16px] font-bold text-white'>
                  Save this QR Code
                </p>
              </button>
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
        <div className='absolute left-[40px] top-[145px] hidden h-[12px] w-[12px] rounded-full bg-primary md:left-[30px] md:h-[28px] md:w-[28px] lg:left-[100px] lg:h-[40px] lg:w-[40px]'></div>
        <div className=' absolute left-[-70px] top-[679px] h-[120px] w-[120px] rounded-full bg-primary'></div>
        <div className='absolute bottom-[9px] right-[-30px] h-[80px] w-[80px] rounded-full bg-primary md:hidden'></div>
        <div className='absolute bottom-[0px] right-[60px] h-[20px] w-[20px] rounded-full bg-primary md:hidden'></div>
      </div>
    </>
  );
}
