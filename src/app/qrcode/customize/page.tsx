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
  const [zoomMiniQR, setZoomMiniQR] = useState(true);
  const handleRadioButton = (value: string) => {
    setPatternColorType(value);
  };
  return (
    <>
      <div className='relative flex w-[100%] flex-col items-center justify-start overflow-hidden pt-[88px] leading-[1.2] text-primary'>
        <div
          className={`fixed right-[8px] top-[112px] z-50 hidden h-[222px] w-[224px]  ${
            zoomMiniQR ? 'flex-col md:flex' : 'hidden'
          }`}
        >
          <button
            className='z-50 h-[28px] w-[28px] self-start rounded-full bg-primary'
            onClick={() => {
              setZoomMiniQR(!zoomMiniQR);
            }}
          >
            {' '}
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='absolute left-[8px] top-[8px]'
            >
              <path
                d='M4.95228 9.81195C5.95281 9.81195 6.8904 9.51273 7.67069 9.00156L10.4268 11.7382C10.6093 11.9127 10.8422 12 11.0939 12C11.6162 12 12 11.5948 12 11.0836C12 10.8468 11.9182 10.6161 11.742 10.4416L9.00472 7.7174C9.57105 6.91948 9.90456 5.95325 9.90456 4.90597C9.90456 2.20675 7.67698 0 4.95228 0C2.23388 0 0 2.20675 0 4.90597C0 7.6052 2.22758 9.81195 4.95228 9.81195ZM4.95228 8.50286C2.95753 8.50286 1.32145 6.88208 1.32145 4.90597C1.32145 2.92987 2.95753 1.30909 4.95228 1.30909C6.94704 1.30909 8.58312 2.92987 8.58312 4.90597C8.58312 6.88208 6.94704 8.50286 4.95228 8.50286ZM3.32879 5.39844H6.57577C6.84636 5.39844 7.07289 5.17403 7.07289 4.90597C7.07289 4.63792 6.84636 4.41351 6.57577 4.41351H3.32879C3.05821 4.41351 2.83167 4.63792 2.83167 4.90597C2.83167 5.17403 3.05821 5.39844 3.32879 5.39844Z'
                fill='white'
              />
            </svg>
          </button>
          <div className='ml-[-20px] mt-[-17px] h-[212px] w-[212px] self-end rounded-[8px] border-[3px] border-primary bg-white p-[3px] '>
            <Image
              src='/images/qrcode/example-qr.png'
              alt='Pattern 1'
              height='250'
              width='250'
            />
          </div>
        </div>
        <div
          className={`fixed right-[8px] top-[112px] z-50 flex h-[132px] w-[132px] flex-col 
                        ${!zoomMiniQR ? '' : 'hidden'}
        `}
        >
          <button
            className='z-50 mr-[-2px] h-[24px] w-[24px] self-end rounded-full bg-primary'
            onClick={() => {
              setZoomMiniQR(!zoomMiniQR);
            }}
          >
            {' '}
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='12' cy='12' r='12' fill='#0B2878' />
              <path
                d='M10.9523 15.8119C11.9528 15.8119 12.8904 15.5127 13.6707 15.0016L16.4268 17.7382C16.6093 17.9127 16.8422 18 17.0939 18C17.6162 18 18 17.5948 18 17.0836C18 16.8468 17.9182 16.6161 17.742 16.4416L15.0047 13.7174C15.5711 12.9195 15.9046 11.9532 15.9046 10.906C15.9046 8.20675 13.677 6 10.9523 6C8.23388 6 6 8.20675 6 10.906C6 13.6052 8.22758 15.8119 10.9523 15.8119ZM10.9523 14.5029C8.95753 14.5029 7.32145 12.8821 7.32145 10.906C7.32145 8.92987 8.95753 7.30909 10.9523 7.30909C12.947 7.30909 14.5831 8.92987 14.5831 10.906C14.5831 12.8821 12.947 14.5029 10.9523 14.5029ZM9.32879 11.3984H10.4552V12.5143C10.4552 12.7886 10.6754 13.0068 10.9523 13.0068C11.2292 13.0068 11.4431 12.7886 11.4431 12.5143V11.3984H12.5758C12.8526 11.3984 13.0729 11.1803 13.0729 10.906C13.0729 10.6317 12.8526 10.4135 12.5758 10.4135H11.4431V9.29766C11.4431 9.02338 11.2292 8.80519 10.9523 8.80519C10.6754 8.80519 10.4552 9.02338 10.4552 9.29766V10.4135H9.32879C9.05191 10.4135 8.83167 10.6317 8.83167 10.906C8.83167 11.1803 9.05191 11.3984 9.32879 11.3984Z'
                fill='white'
              />
            </svg>
          </button>
        </div>

        <div
          className={`fixed right-[8px] top-[112px] z-50 flex h-[132px] w-[132px] flex-col ${
            zoomMiniQR ? '' : 'hidden'
          } md:hidden`}
        >
          <button
            className='z-50 h-[24px] w-[24px] self-start rounded-full bg-primary'
            onClick={() => {
              setZoomMiniQR(!zoomMiniQR);
            }}
          >
            {' '}
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='absolute left-[6px] top-[6px]'
            >
              <path
                d='M4.95228 9.81195C5.95281 9.81195 6.8904 9.51273 7.67069 9.00156L10.4268 11.7382C10.6093 11.9127 10.8422 12 11.0939 12C11.6162 12 12 11.5948 12 11.0836C12 10.8468 11.9182 10.6161 11.742 10.4416L9.00472 7.7174C9.57105 6.91948 9.90456 5.95325 9.90456 4.90597C9.90456 2.20675 7.67698 0 4.95228 0C2.23388 0 0 2.20675 0 4.90597C0 7.6052 2.22758 9.81195 4.95228 9.81195ZM4.95228 8.50286C2.95753 8.50286 1.32145 6.88208 1.32145 4.90597C1.32145 2.92987 2.95753 1.30909 4.95228 1.30909C6.94704 1.30909 8.58312 2.92987 8.58312 4.90597C8.58312 6.88208 6.94704 8.50286 4.95228 8.50286ZM3.32879 5.39844H6.57577C6.84636 5.39844 7.07289 5.17403 7.07289 4.90597C7.07289 4.63792 6.84636 4.41351 6.57577 4.41351H3.32879C3.05821 4.41351 2.83167 4.63792 2.83167 4.90597C2.83167 5.17403 3.05821 5.39844 3.32879 5.39844Z'
                fill='white'
              />
            </svg>
          </button>
          <div className='mt-[-12px] h-[120px] w-[120px] self-end rounded-[8px] border-[3px] border-primary bg-white p-[3px] '>
            <Image
              src='/images/qrcode/example-qr.png'
              alt='Pattern 1'
              height='200'
              width='200'
            />
          </div>
        </div>
        <div
          className={`fixed right-[8px] top-[112px] z-50 flex h-[132px] w-[132px] flex-col 
                        ${!zoomMiniQR ? '' : 'hidden'} md:hidden
        `}
        >
          <button
            className='z-50 mr-[-2px] h-[24px] w-[24px] self-end rounded-full bg-primary'
            onClick={() => {
              setZoomMiniQR(!zoomMiniQR);
            }}
          >
            {' '}
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='12' cy='12' r='12' fill='#0B2878' />
              <path
                d='M10.9523 15.8119C11.9528 15.8119 12.8904 15.5127 13.6707 15.0016L16.4268 17.7382C16.6093 17.9127 16.8422 18 17.0939 18C17.6162 18 18 17.5948 18 17.0836C18 16.8468 17.9182 16.6161 17.742 16.4416L15.0047 13.7174C15.5711 12.9195 15.9046 11.9532 15.9046 10.906C15.9046 8.20675 13.677 6 10.9523 6C8.23388 6 6 8.20675 6 10.906C6 13.6052 8.22758 15.8119 10.9523 15.8119ZM10.9523 14.5029C8.95753 14.5029 7.32145 12.8821 7.32145 10.906C7.32145 8.92987 8.95753 7.30909 10.9523 7.30909C12.947 7.30909 14.5831 8.92987 14.5831 10.906C14.5831 12.8821 12.947 14.5029 10.9523 14.5029ZM9.32879 11.3984H10.4552V12.5143C10.4552 12.7886 10.6754 13.0068 10.9523 13.0068C11.2292 13.0068 11.4431 12.7886 11.4431 12.5143V11.3984H12.5758C12.8526 11.3984 13.0729 11.1803 13.0729 10.906C13.0729 10.6317 12.8526 10.4135 12.5758 10.4135H11.4431V9.29766C11.4431 9.02338 11.2292 8.80519 10.9523 8.80519C10.6754 8.80519 10.4552 9.02338 10.4552 9.29766V10.4135H9.32879C9.05191 10.4135 8.83167 10.6317 8.83167 10.906C8.83167 11.1803 9.05191 11.3984 9.32879 11.3984Z'
                fill='white'
              />
            </svg>
          </button>
        </div>
        {/* ///////////// MAIN ////////////// */}
        <div className='w-[90%] md:w-[85%]'>
          <p>Start</p>
          {/* ////// HEADER + PROCESS BAR ////////// */}
          {/* This will be replaced by Bun's nav bar when it bigger */}
          <div className='flex w-[100%] flex-col items-center lg:hidden'>
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
          <div className='lg:flex lg:flex-row lg:gap-[28px]'>
            <div>
              <div className='mt-[35px] flex w-[100%] flex-col rounded-[8px] border-[3px] border-[#0B2878] px-[16px] md:pr-[32px] lg:mt-[28px]'>
                <div className='mt-[8px] h-[20px] md:mt-[16px] md:h-[29px]'>
                  <p className=' text-center text-[16px] font-bold  md:text-left md:text-[20px] md:font-medium'>
                    Information
                  </p>
                </div>

                <div className='mt-[8px] flex w-full flex-col  md:mt-[15px] md:flex-row md:items-center'>
                  <div className='flex h-[24px] flex-col justify-center md:ml-[4px]'>
                    <p className='text-[16px] font-medium md:w-[104px]'>
                      QR name
                    </p>
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
                          fillOpacity='0.87'
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
                          mediumPaddingLeft='8'
                          paddingLeft='8'
                          mediumHeight='32'
                          mediumTextSize='16'
                          paddingRight='4'
                          mediumPaddingRight='6'
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
                          mediumPaddingLeft='8'
                          paddingLeft='8'
                          mediumHeight='32'
                          mediumTextSize='16'
                          paddingRight='4'
                          mediumPaddingRight='6'
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
                        paddingRight='4'
                        mediumPaddingRight='12'
                        mediumPaddingLeft='16'
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
                    <p className='text-[16px] font-medium md:w-[104px]'>
                      Category
                    </p>
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
                <div className='flex flex-col md:flex-row'>
                  <div className='mt-[10px] md:ml-[4px]'>
                    <div className='flex h-[24px] flex-col justify-center md:h-[30px] md:justify-end'>
                      <p className='text-[16px] font-medium '>
                        Frame background
                      </p>
                    </div>
                    <div className='mt-[4px] flex h-[40px] w-[112px] flex-row items-center rounded-[8px] border pl-[10px] pr-[6px] md:h-[60px] md:w-[200px] md:pl-[12px]'>
                      <p className='text-[14px] font-medium text-primary md:text-[16px]'>
                        #FFFFFF
                      </p>
                      <div className='ml-auto h-[28px] w-[28px] rounded-[8px] border md:h-[48px] md:w-[48px]'></div>
                    </div>
                  </div>
                  <div className='mt-[8px] inline-flex flex-row items-center md:ml-[52px] md:self-end '>
                    <div className='mr-[14px] hidden md:flex'>
                      <ToggleButton type='tablet' />
                    </div>
                    <div className='mr-[27px] flex h-[16px] w-[129px] flex-row items-center md:w-[220px]'>
                      <p className='text-[12px] font-normal md:text-[16px]'>
                        Transparent background
                      </p>
                    </div>
                    <div className='md:hidden'>
                      <ToggleButton type='mobile' />
                    </div>
                  </div>
                </div>

                <div className='mt-[16px]'>
                  <div className='flex h-[24px] flex-col justify-center md:ml-[4px] md:h-[20px]'>
                    <p className='text-[16px]  font-medium '>Additional text</p>
                  </div>
                  <div className='relative mt-[4px] h-[40px] w-auto rounded-[8px] border-[0.5px] border-gray-300 md:ml-[4px] md:h-[60px]'>
                    <input
                      type='text'
                      className='h-full w-full rounded-[8px] pl-[12px] text-[12px] focus:outline-[1px] focus:outline-primary md:text-[16px]'
                      placeholder='Enter additional text'
                    />
                  </div>
                  <div className='mt-[8px] flex flex-row gap-[18px] md:ml-[4px] md:mt-[16px] md:gap-[40px]'>
                    <div className='w-[100px]  grow md:w-[202px] '>
                      <div className='flex-cols flex h-[16px] items-center justify-start md:h-[20px]'>
                        <p className='text-[12px] font-medium md:text-[16px]'>
                          Font
                        </p>
                      </div>
                      <div className='mt-[4px] font-medium'>
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
                          mediumHeight='60'
                          mediumPaddingLeft='16'
                          mediumTextSize='16'
                          paddingRight='4'
                          mediumPaddingRight='20'
                        />
                      </div>
                    </div>
                    <div className='w-[100px]  grow md:w-[202px] '>
                      <div className='flex-cols flex h-[16px] items-center justify-start md:h-[20px]'>
                        <p className='text-[12px] font-medium md:text-[16px]'>
                          {' '}
                          Text color
                        </p>
                      </div>
                      <div className='mt-[4px] flex h-[28px] w-auto flex-row items-center rounded-[8px] border pl-[8px] pr-[4px] md:h-[60px] md:pl-[16px] md:pr-[6px]'>
                        <p className='text-[12px] md:text-[16px] md:font-medium'>
                          #FFFFFF
                        </p>
                        <div className='ml-auto h-[20px] w-[20px] rounded-[8px] border md:h-[48px] md:w-[48px]'></div>
                      </div>
                    </div>
                    <div className='w-[52px] grow md:w-[124px]'>
                      <div className='flex-cols flex h-[16px] items-center justify-start md:h-[20px]'>
                        <p className='text-[12px] font-medium md:text-[16px]'>
                          Text size
                        </p>
                      </div>
                      <div className='mt-[4px] md:font-medium'>
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
                          mediumHeight='60'
                          mediumPaddingLeft='16'
                          mediumTextSize='20'
                          paddingRight='4'
                          mediumPaddingRight='20'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='mt-[8px] flex flex-col gap-y-[8px] md:ml-[4px] md:mt-[16px] md:gap-y-[16px]'>
                    <div className='flex flex-row gap-x-[16px] md:gap-x-[40px]'>
                      <div className='grow md:flex md:w-[202px] md:flex-row md:items-center  '>
                        <div className='flex-cols flex h-[16px] items-center justify-start  md:w-[95px]'>
                          <p className='text-[12px] font-medium md:text-[16px]'>
                            Border width
                          </p>
                        </div>
                        <div className='mt-[4px] grow md:ml-[19px] md:mt-0 md:w-[88px]'>
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
                            mediumHeight='36'
                            mediumPaddingLeft='8'
                            mediumTextSize='20'
                            paddingRight='4'
                            mediumPaddingRight='0'
                          />
                        </div>
                      </div>
                      <div className='grow md:flex md:w-[202px] md:flex-row md:items-center'>
                        <div className='flex-cols flex h-[16px] items-center justify-start  md:w-[95px]'>
                          <p className='text-[12px] font-medium md:text-[16px]'>
                            {' '}
                            Border radius
                          </p>
                        </div>
                        <div className='mt-[4px] grow md:ml-[19px] md:mt-0 md:w-[88px]'>
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
                            mediumHeight='36'
                            mediumPaddingLeft='8'
                            mediumTextSize='20'
                            paddingRight='4'
                            mediumPaddingRight='0'
                          />
                        </div>
                      </div>
                      <div className='md:w-[124px] md:grow'></div>
                    </div>
                    <div className='flex flex-row gap-x-[16px] md:gap-x-[40px]'>
                      <div className='grow md:flex md:w-[202px] md:flex-row md:items-center'>
                        <div className='flex-cols flex h-[16px] items-center justify-start  md:w-[95px]'>
                          <p className='text-[12px] font-medium md:text-[16px]'>
                            {' '}
                            Padding
                          </p>
                        </div>
                        <div className='mt-[4px] grow md:ml-[19px] md:mt-0 md:w-[88px]'>
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
                            mediumHeight='36'
                            mediumPaddingLeft='8'
                            mediumTextSize='20'
                            paddingRight='4'
                            mediumPaddingRight='0'
                          />
                        </div>
                      </div>
                      <div className='grow md:flex md:w-[202px] md:flex-row md:items-center '>
                        <div className='flex-cols flex h-[16px] items-center justify-start  md:w-[95px]'>
                          <p className='text-[12px] font-medium md:text-[16px]'>
                            {' '}
                            Margin
                          </p>
                        </div>
                        <div className='mt-[4px] grow md:ml-[19px] md:mt-0 md:w-[88px]'>
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
                            mediumHeight='36'
                            mediumPaddingLeft='8'
                            mediumTextSize='20'
                            paddingRight='4'
                            mediumPaddingRight='0'
                          />
                        </div>
                      </div>
                      <div className='md:w-[124px] md:grow'></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-[20px] flex w-[100%] flex-col rounded-[8px] border-[3px] border-[#0B2878] pb-[16px] pl-[16px] pr-[16px] pt-[8px]'>
                <div className='mt-[8px] h-[20px] md:mt-[16px] md:h-[29px]'>
                  <p className=' text-center text-[16px] font-bold  md:text-left md:text-[20px] md:font-medium'>
                    Pattern
                  </p>
                </div>

                <div className='mt-[8px] flex flex-wrap items-center justify-start gap-[12px] md:ml-[4px]'>
                  <div className='h-[64px] w-[64px] md:h-[140px] md:w-[140px]'>
                    <Image
                      src='/images/qrcode/pattern/example1.png'
                      alt='Pattern 1'
                      height='140'
                      width='140'
                    />
                  </div>
                  <div className='h-[64px] w-[64px] md:h-[140px] md:w-[140px] '>
                    <Image
                      src='/images/qrcode/pattern/example2.png'
                      alt='Pattern 1'
                      height='140'
                      width='140'
                    />
                  </div>
                  <div className='h-[64px] w-[64px] md:h-[140px] md:w-[140px]'>
                    <Image
                      src='/images/qrcode/pattern/example3.png'
                      alt='Pattern 1'
                      height='140'
                      width='140'
                    />
                  </div>
                  <div className='h-[64px] w-[64px] md:h-[140px] md:w-[140px]'>
                    <Image
                      src='/images/qrcode/pattern/example1.png'
                      alt='Pattern 1'
                      height='140'
                      width='140'
                    />
                  </div>
                  <div className='h-[64px] w-[64px] md:h-[140px] md:w-[140px]'>
                    <Image
                      src='/images/qrcode/pattern/example2.png'
                      alt='Pattern 1'
                      height='140'
                      width='140'
                    />
                  </div>
                  <div className='h-[64px] w-[64px] md:h-[140px] md:w-[140px]'>
                    <Image
                      src='/images/qrcode/pattern/example3.png'
                      alt='Pattern 1'
                      height='140'
                      width='140'
                    />
                  </div>
                  <div className='h-[64px] w-[64px] md:h-[140px] md:w-[140px]'>
                    <Image
                      src='/images/qrcode/pattern/example2.png'
                      alt='Pattern 1'
                      height='140'
                      width='140'
                    />
                  </div>
                  <div className='h-[64px] w-[64px] md:h-[140px] md:w-[140px]'>
                    <Image
                      src='/images/qrcode/pattern/example3.png'
                      alt='Pattern 1'
                      height='140'
                      width='140'
                    />
                  </div>
                </div>
                <div className='mt-[8px] flex flex-col justify-center'>
                  <div className='flex flex-row gap-[65px] md:ml-[4px]'>
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
                        className='font-base ms-2 text-[12px] md:font-bold'
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
                        className='font-base ms-2 text-[12px] md:font-bold'
                      >
                        Gradient color
                      </label>
                    </div>
                  </div>
                  <div className='ml-[4px] mt-[14px]  hidden h-[24px] w-[100px] text-[16px] font-medium md:block'>
                    Pattern color
                  </div>
                  <div className='mt-[8px] flex flex-row md:ml-[4px] md:mt-[2px]'>
                    {/* Chosen color*/}

                    <div
                      className={`${
                        patternColorType === 'singleColor' ? '' : 'hidden'
                      }  flex h-[40px]  w-[138px] flex-row items-center rounded-[8px] border-[1px] border-primary pl-[8px] pr-[6px] md:h-[56px] md:w-[168px] md:pl-[12px] md:pr-[4px]`}
                    >
                      <p className='text-[14px] font-medium md:text-[16px]'>
                        #FFFFFF
                      </p>
                      <div className='ml-auto h-[28px] w-[28px] rounded-[8px] border-[1px] border-primary md:h-[48px] md:w-[48px]'></div>
                    </div>
                    <div
                      className={`${
                        patternColorType === 'gradientColor'
                          ? 'flex flex-row items-center gap-[12px]'
                          : 'hidden'
                      }    `}
                    >
                      <div
                        className={
                          'flex h-[40px]  w-[138px] flex-row items-center rounded-[8px] border-[1px] border-primary pl-[8px] pr-[6px] md:h-[56px] md:w-[168px] md:pl-[12px] md:pr-[4px]'
                        }
                      >
                        <p className='text-[14px] font-medium md:text-[16px]'>
                          #FFFFFF
                        </p>
                        <div className='ml-auto h-[28px] w-[28px] rounded-[8px] border-[1px] border-primary md:h-[48px] md:w-[48px]'></div>
                      </div>
                      <div
                        className={
                          'flex h-[40px]  w-[138px] flex-row items-center rounded-[8px] border-[1px] border-primary pl-[8px] pr-[6px] md:h-[56px] md:w-[168px] md:pl-[12px] md:pr-[4px]'
                        }
                      >
                        <p className='text-[14px] font-medium md:text-[16px]'>
                          #FFFFFF
                        </p>
                        <div className='ml-auto h-[28px] w-[28px] rounded-[8px] border-[1px] border-primary md:h-[48px] md:w-[48px]'></div>
                      </div>
                      <div className='hidden w-[100px] self-start md:flex md:flex-col'>
                        <div className='flex h-[16px] flex-col items-center justify-start'>
                          <p className='text-[12px] font-medium md:text-[16px]'>
                            {' '}
                            Gradient type
                          </p>
                        </div>
                        <div className='mt-[4px] h-[28px] w-[100px] grow'>
                          <DropDown
                            value='Horizontal'
                            options={['Horizontal', 'Vertical', 'Radio']}
                            heightOfDropDown='28'
                            textSize='12'
                            paddingLeft='8'
                            paddingRight='4'
                            mediumPaddingRight='4'
                            mediumPaddingLeft='8'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`mt-[8px] flex flex-col ${
                      patternColorType === 'gradientColor' ? '' : 'hidden'
                    }    `}
                  >
                    {/* Gradient Type*/}
                    <div className='flex-cols flex h-[16px] items-center justify-start md:hidden'>
                      <p className='text-[12px] font-medium'> Gradient type</p>
                    </div>
                    <div className='h-[28px] w-[100px] md:hidden'>
                      <DropDown
                        value='Horizontal'
                        options={['Horizontal', 'Vertical', 'Radio']}
                        heightOfDropDown='28'
                        textSize='12'
                        paddingLeft='8'
                        mediumPaddingLeft='8'
                        mediumPaddingRight='4'
                        paddingRight='4'
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-[20px] flex w-[100%] flex-col rounded-[8px] border-[3px] border-[#0B2878] px-[15px] pb-[16px] pt-[8px]'>
                <div className='mt-[8px] h-[20px] md:mt-[16px] md:h-[29px]'>
                  <p className='text-center text-[16px] font-bold  md:text-left md:text-[20px] md:font-medium'>
                    Logo
                  </p>
                </div>
                <div className='mt-[8px] flex flex-row flex-wrap gap-[10px] md:ml-[1px] md:gap-x-[20px] md:gap-y-[36px]'>
                  <div className='h-[40px] w-[40px] md:h-[68px] md:w-[68px]'>
                    <Image
                      src='/images/qrcode/logo/none.png'
                      alt='Pattern 1'
                      height='100'
                      width='100'
                    />
                  </div>
                  <div className='h-[40px] w-[40px] md:h-[68px] md:w-[68px]'>
                    <Image
                      src='/images/qrcode/logo/youtube.png'
                      alt='Pattern 1'
                      height='100'
                      width='100'
                    />
                  </div>
                  <div className='h-[40px] w-[40px] md:h-[68px] md:w-[68px]'>
                    <Image
                      src='/images/qrcode/logo/facebook.png'
                      alt='Pattern 1'
                      height='100'
                      width='100'
                    />
                  </div>
                  <div className='h-[40px] w-[40px] md:h-[68px] md:w-[68px]'>
                    <Image
                      src='/images/qrcode/logo/instagram.png'
                      alt='Pattern 1'
                      height='100'
                      width='100'
                    />
                  </div>
                  <div className='h-[40px] w-[40px] md:h-[68px] md:w-[68px]'>
                    <Image
                      src='/images/qrcode/logo/google.png'
                      alt='Pattern 1'
                      height='100'
                      width='100'
                    />
                  </div>
                  <div className='h-[40px] w-[40px] md:h-[68px] md:w-[68px]'>
                    <Image
                      src='/images/qrcode/logo/twitter.png'
                      alt='Pattern 1'
                      height='100'
                      width='100'
                    />
                  </div>
                </div>
                <div className='mt-[16px] rounded-[8px]'>
                  <button className='flex w-[100%] flex-col items-center justify-center rounded-[8px] border border-primary py-[6px] md:bg-primary'>
                    <div className='flex flex-row items-center'>
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='block md:hidden'
                      >
                        <rect width='20' height='20' fill='white' />
                        <path
                          d='M7.50033 13.3333H12.5003V8.33333H15.8337L10.0003 2.5L4.16699 8.33333H7.50033V13.3333ZM4.16699 15H15.8337V16.6667H4.16699V15Z'
                          fill='#0B2878'
                        />
                      </svg>

                      <svg
                        width='25'
                        height='24'
                        viewBox='0 0 25 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='hidden md:block'
                      >
                        <rect
                          width='24'
                          height='24'
                          transform='translate(0.397461)'
                          fill='#0B2878'
                        />
                        <path
                          d='M9.39746 16H15.3975V10H19.3975L12.3975 3L5.39746 10H9.39746V16ZM5.39746 18H19.3975V20H5.39746V18Z'
                          fill='white'
                        />
                      </svg>

                      <div className='ml-[4px] flex h-[20px] w-[82px] flex-col justify-center'>
                        <p className='text-[14px] font-normal md:text-white'>
                          Upload image
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <div className='mt-[20px] flex w-[100%] flex-col rounded-[8px] border-[3px] border-[#0B2878] px-[35px] pb-[16px] pt-[28px]'>
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
                    <p className='mr-[8px] text-[14px] font-bold md:text-[18px] '>
                      Size
                    </p>
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
                <div className='mt-[8px] h-[40px] w-full md:mt-[14px]'>
                  <button className='h-[40px] w-full rounded-[8px] bg-primary'>
                    <p className='text-center text-[16px] font-bold text-white'>
                      Save this QR Code
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div className='sticky top-[28px] mt-[28px]  hidden h-[632px] w-[472px] items-center bg-green lg:flex lg:flex-col'>
              <div></div>
              <div className='mt-[32px] flex h-[] flex-row'>
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
              <div>
                <button></button>
              </div>
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
