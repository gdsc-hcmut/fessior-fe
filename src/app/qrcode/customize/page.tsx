'use client';

import Image from 'next/image';
import { FileExtension, DotType } from 'qr-code-styling';
import React, { useState, useContext } from 'react';

import ShortenTools from '@/components/shorten-tools';
import AuthContext from '@/contexts/authContext';

import FramePart from './parts/FramePart';
import InformationPart from './parts/InformationPart';
import LogoPart from './parts/LogoPart';
import NavBar from './parts/NavBar';
import PatternPart from './parts/PatternPart';
import SaveBox from './parts/SaveBox';
import SavePart from './parts/SavePart';
import PatternColorType from './types/pattern-color.enum';
import QRType from './types/qr-type-enum';

export default function QRCustomize() {
  const [typeOfQR, setTypeOfQR] = useState<QRType>(QRType.URL);
  const [fileExt, setFileExt] = useState<FileExtension>('svg');
  const [dotType, setDotType] = useState<DotType>('square');
  const [patternColorType, setPatternColorType] = useState<PatternColorType>(
    PatternColorType.singleColor,
  );
  const { isLoggedIn } = useContext(AuthContext);
  const [isZoom, setIsZoom] = useState(true);
  return (
    <div className='flex flex-col items-center text-primary'>
      {isLoggedIn && (
        <div className='relative flex w-[100%] flex-col items-center justify-start  pt-[88px] leading-[1.2] text-primary'>
          <div>
            <div className='xl:hidden'>
              <div
                className={`fixed right-[20px] top-[112px] z-50 hidden h-[222px] w-[224px]  ${
                  isZoom ? 'flex-col md:flex' : 'hidden'
                }`}
              >
                <button
                  className='z-50 h-[28px] w-[28px] self-start rounded-full bg-primary pl-[8px]'
                  onClick={() => {
                    setIsZoom(!isZoom);
                  }}
                >
                  <Image
                    src='../icons/qr/zoom_minus.svg'
                    alt='1'
                    height='12'
                    width='12'
                  />
                </button>
                <div className='ml-[-20px] mt-[-17px] h-[212px] w-[212px] self-end rounded-[8px] border-[3px] border-primary bg-white p-[3px] '>
                  <Image
                    src='/../images/qr/example_qr.png'
                    alt='Pattern 1'
                    height='250'
                    width='250'
                  />
                </div>
              </div>
              <div
                className={`fixed right-[8px] top-[112px] z-50 flex h-[132px] w-[132px] flex-col 
                        ${!isZoom ? '' : 'hidden'}
        `}
              >
                <button
                  className='z-50 mr-[-2px] h-[24px] w-[24px] self-end rounded-full bg-primary pl-[6px]'
                  onClick={() => {
                    setIsZoom(!isZoom);
                  }}
                >
                  <Image
                    src='../icons/qr/zoom_plus.svg'
                    alt='2'
                    height='12'
                    width='12'
                  />
                </button>
              </div>
            </div>

            <div
              className={`fixed right-[8px] top-[112px] z-50 flex h-[132px] w-[132px] flex-col ${
                isZoom ? '' : 'hidden'
              } md:hidden`}
            >
              <button
                className='z-50 h-[24px] w-[24px] self-start rounded-full bg-primary pl-[6px]'
                onClick={() => {
                  setIsZoom(!isZoom);
                }}
              >
                <Image
                  src='../icons/qr/zoom_minus.svg'
                  alt='3'
                  height='12'
                  width='12'
                />
              </button>
              <div className='mt-[-12px] h-[120px] w-[120px] self-end rounded-[8px] border-[3px] border-primary bg-white p-[3px] '>
                <Image
                  src='/../images/qr/example_qr.png'
                  alt='preview QR'
                  height='200'
                  width='200'
                />
              </div>
            </div>
            <div
              className={`fixed right-[8px] top-[112px] z-50 flex h-[132px] w-[132px] flex-col 
                        ${!isZoom ? '' : 'hidden'} md:hidden
        `}
            >
              <button
                className='z-50 mr-[-2px] h-[24px] w-[24px] self-end rounded-full bg-primary pl-[6px]'
                onClick={() => {
                  setIsZoom(!isZoom);
                }}
              >
                <Image
                  src='../icons/qr/zoom_plus.svg'
                  alt='4'
                  height='12'
                  width='12'
                />
              </button>
            </div>
          </div>
          <div className='w-[90%] md:w-[85%] xl:relative'>
            <NavBar />
            <div className='xl:relative xl:flex xl:flex-row xl:gap-[28px] '>
              <div className='flex flex-col gap-y-[20px] drop-shadow-[0_4px_47px_rgba(11,40,120,0.3)] xl:mt-[28px] xl:grow xl:items-center xl:gap-y-[24px] xl:rounded-[8px] xl:border-[0.5px] xl:border-[#7E7E7E] xl:border-opacity-30 xl:bg-white xl:px-[24px] xl:py-[24px]'>
                <InformationPart typeOfQR={typeOfQR} />
                <FramePart />
                <PatternPart
                  dotType={dotType}
                  setDotType={setDotType}
                  patternColorType={patternColorType}
                  setPatternColorType={setPatternColorType}
                />
                <LogoPart />
                <SavePart setFileExt={setFileExt} />
              </div>
              {/* SAVE BOX WHEN LAPTOP VIEW */}
              <SaveBox setFileExt={setFileExt} />
            </div>
            <div className=''>
              <button
                className='mt-2 rounded-lg border-2 border-black bg-white p-2 hover:bg-blue-900 hover:text-white'
                onClick={() =>
                  setTypeOfQR(
                    typeOfQR === QRType.URL ? QRType.WIFI : QRType.URL,
                  )
                }
              >
                CHANGE TO {typeOfQR === QRType.WIFI ? 'url' : 'wifi'}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className='px-[20px] text-center md:flex md:max-w-[1000px] md:flex-col md:items-center lg:flex lg:flex-col lg:items-center'>
        <h2 className='text-[36px] font-[700] leading-[65px]'>Fessior Tools</h2>
        <p className='text-center leading-[24px] md:max-w-[640px]'>
          Your one-stop destination for essential utilities. Discover a world of
          community-driven tools that simplify your daily tasks.
        </p>

        <ShortenTools />
      </div>
      <div className='absolute left-[40px] top-[145px] hidden h-[12px] w-[12px] rounded-full bg-primary md:left-[30px] md:h-[28px] md:w-[28px] xl:left-[100px] xl:h-[40px] xl:w-[40px]' />
    </div>
  );
}
