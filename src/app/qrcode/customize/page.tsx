'use client';

import Image from 'next/image';
import { DotType } from 'qr-code-styling';
import { useState, useContext } from 'react';

import DropDown from '@/components/listbox-select';
import QRNavBar from '@/components/qr-navbar';
import ShortenTools from '@/components/shorten-tools';
import TextInputIcon from '@/components/text-input-icons';
import ToggleButton from '@/components/toggle-button';
import AuthContext from '@/contexts/authContext';
import PatternColorType from '@/types/pattern-color-enum';
import QRType from '@/types/qr-type-enum';

export default function QRCustomize() {
  const [typeOfQR, setTypeOfQR] = useState<QRType>(QRType.URL);
  const { isLoggedIn } = useContext(AuthContext);
  const [isZoom, setIsZoom] = useState(true);
  const [isViewSaveOptionExpand, setIsViewSaveOptionExpand] = useState(false);
  const [patternColorType, setPatternColorType] = useState<PatternColorType>(
    PatternColorType.singleColor,
  );
  const handleRadioButton = (value: PatternColorType) => {
    setPatternColorType(value);
  };
  const [dotsType, setDotsType] = useState<DotType>('square');
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
            <QRNavBar />
            <div className='xl:relative xl:flex xl:flex-row xl:gap-[28px] '>
              <div className='flex flex-col gap-y-[20px] drop-shadow-[0_4px_47px_rgba(11,40,120,0.3)] xl:mt-[28px] xl:grow xl:items-center xl:gap-y-[24px] xl:rounded-[8px] xl:border-[0.5px] xl:border-[#7E7E7E] xl:border-opacity-30 xl:bg-white xl:px-[24px] xl:py-[24px]'>
                {/* INFORMATION PART */}
                <div
                  className='flex w-[100%] flex-col rounded-[8px] border-[3px] border-[#0B2878] bg-white px-[16px] md:pr-[32px] xl:px-[36px] xl:pb-[20px]'
                  id='informationPart'
                >
                  <div className='mt-[8px] h-[20px] md:mt-[16px] md:h-[29px] xl:ml-[-8px] xl:mt-[28px] xl:flex xl:h-[28px] xl:items-center'>
                    <p className=' text-center text-[16px] font-bold  md:text-left md:text-[20px] md:font-medium xl:text-[28px]'>
                      Information
                    </p>
                  </div>
                  <div
                    className={`${
                      typeOfQR === QRType.WIFI ? 'md:mt-[20px]' : 'mt-[40px]'
                    } mt-[8px] hidden w-full flex-row items-center xl:mt-[40px] xl:flex `}
                  >
                    <div className='flex h-[24px] flex-col justify-center md:ml-[4px] xl:ml-0 xl:h-[20px]'>
                      <p className='text-[16px] font-medium md:w-[104px] xl:w-[128px] xl:text-[20px]'>
                        Categories
                      </p>
                    </div>

                    <div className='mt-[4px] h-[40px] w-full md:ml-[33px] md:mt-0 md:h-[48px] xl:ml-[8px] xl:h-[60px]'>
                      <TextInputIcon
                        iconSrc='../icons/qr/search.svg'
                        placeholder='Add or create new categories'
                      />
                    </div>
                  </div>
                  <div className='mt-[8px] flex w-full flex-col  md:mt-[15px] md:flex-row md:items-center xl:mt-[20px]'>
                    <div className='flex h-[24px] flex-col justify-center md:ml-[4px] xl:ml-0 xl:h-[20px]'>
                      <p className='text-[16px] font-medium md:w-[104px] xl:w-[128px] xl:text-[20px]'>
                        QR name
                      </p>
                    </div>

                    <div className='mt-[4px] h-[40px] w-full md:ml-[33px] md:mt-0 md:h-[48px] xl:ml-[8px] xl:h-[60px]'>
                      <TextInputIcon
                        iconSrc='../icons/qr/tag.svg'
                        placeholder='Enter your QR name'
                      />
                    </div>
                  </div>
                  <div className={`${typeOfQR === QRType.URL ? '' : 'hidden'}`}>
                    <div className='mt-[8px] flex w-full flex-col  md:mt-[20px] md:flex-row md:items-center xl:mt-[20px]'>
                      <div className='flex h-[24px] flex-col justify-center md:ml-[4px] xl:ml-0 xl:h-[20px]'>
                        <p className='text-[16px] font-medium md:w-[104px] xl:w-[128px] xl:text-[20px]'>
                          Your URL
                        </p>
                      </div>

                      <div className='mt-[4px] h-[40px] w-full md:ml-[33px] md:mt-0 md:h-[48px] xl:ml-[8px] xl:h-[60px]'>
                        <TextInputIcon
                          iconSrc='../icons/qr/link.svg'
                          placeholder='Enter your URL'
                        />
                      </div>
                    </div>
                    <div className='mr-[52px] mt-[10px] flex w-auto flex-col md:ml-[4px] md:mr-[0px] md:mt-[20px] md:flex-row md:items-center xl:mb-[28px] xl:ml-[0px] xl:mt-[20px] xl:w-full'>
                      <div className='flex flex-row items-center md:w-[277px] md:grow xl:w-[272px] xl:grow-0'>
                        <div className='flex h-[18px] w-[68px] flex-col justify-center md:w-[104px] xl:h-[28px] xl:w-[128px]'>
                          <p className='text-[12px] md:text-[16px] md:font-medium xl:text-[20px]'>
                            Organization
                          </p>
                        </div>

                        <div className='relative ml-[8px] h-[20px] max-w-[240px] grow md:ml-[33px] md:h-[32px] xl:ml-[8px] xl:block xl:w-[136px] xl:grow-0 xl:rounded-[8px] '>
                          <DropDown
                            border={1}
                            value='GDSC'
                            options={['GDSC', 'CTCT', 'OISP']}
                            largeFont='regular'
                          />
                        </div>
                      </div>
                      <div className='mt-[10px] flex flex-row items-center md:ml-[85px] md:mt-0 md:w-[240px] md:grow xl:ml-[62px]'>
                        <div className='flex h-[18px] w-[68px] flex-col justify-center md:w-[54px] xl:h-[32px] xl:w-[80px]'>
                          <p className='text-[12px] md:text-[16px] md:font-medium xl:text-[20px]'>
                            Domain
                          </p>
                        </div>
                        <div className='relative ml-[8px] h-[20px] max-w-[240px]  grow md:ml-[46px] md:h-[32px] xl:ml-[8px] xl:block xl:w-[136px] xl:grow-0 xl:rounded-[8px]'>
                          <DropDown
                            value='furl.one'
                            options={[
                              'furl.one',
                              'bkoisp.info',
                              'gic.gdsc.app',
                            ]}
                            border={1}
                            largeFont='regular'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${typeOfQR === QRType.WIFI ? '' : 'hidden'}`}
                  >
                    <div className='mt-[8px] flex w-full flex-col  md:mt-[20px] md:flex-row md:items-center'>
                      <div className='flex h-[24px] flex-col justify-center md:ml-[4px]'>
                        <p className='text-[16px] font-medium md:w-[104px] xl:text-[20px]'>
                          Wifi SSID
                        </p>
                      </div>

                      <div className='mt-[4px] h-[40px] w-full md:ml-[33px] md:mt-0 md:h-[48px] xl:h-[60px]'>
                        <TextInputIcon
                          iconSrc='../icons/qr/tag.svg'
                          placeholder='Enter your wifi SSID (name)'
                        />
                      </div>
                    </div>
                    <div className='flex flex-col md:flex-row'>
                      <div className='mt-[16px] flex flex-row items-center'>
                        <div className='flex h-[24px] w-[100px] flex-col justify-center md:ml-[4px] md:w-[104px]'>
                          <p className='text-[16px]  font-medium xl:text-[20px]'>
                            Encryption
                          </p>
                        </div>
                        <div className='h-[20px] w-[136px] md:ml-[33px] md:h-[32px] md:w-[160px]'>
                          <DropDown
                            value='WPA/WPA2'
                            options={['WPA/WPA2', 'WEP', 'NONE', 'RAW']}
                            border={1}
                          />
                        </div>
                      </div>
                      <div className='hidden max-w-[80px] grow md:block xl:hidden'></div>
                      <div className=' mt-[16px] flex flex-row items-center xl:ml-[40px]'>
                        <div className='flex h-[24px] w-[100px] flex-col justify-center md:ml-[4px] md:w-[80px] xl:w-[120px]'>
                          <p className='text-[16px]   font-medium xl:text-[20px]'>
                            Organization
                          </p>
                        </div>
                        <div className='h-[20px] w-[136px] md:ml-[33px] md:h-[32px] md:w-[160px]'>
                          <DropDown
                            value='GDSC'
                            options={['GDSC', 'CTCT', 'OISP']}
                            border={1}
                          />
                        </div>
                      </div>
                    </div>

                    <div className='mt-[8px] flex w-full flex-col  md:mt-[20px] md:flex-row md:items-center'>
                      <div className='flex h-[24px] flex-col justify-center md:ml-[4px]'>
                        <p className='text-[16px] font-medium md:w-[104px] xl:text-[20px]'>
                          Password
                        </p>
                      </div>

                      <div className='mt-[4px] h-[40px] w-full md:ml-[33px] md:mt-0 md:h-[48px] xl:h-[60px] '>
                        <TextInputIcon
                          iconSrc='../icons/qr/shield.svg'
                          placeholder='Enter your password'
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      'mt-[8px] flex w-full flex-col md:mt-[20px] md:flex-row md:items-center xl:hidden'
                    }
                  >
                    <div className='flex h-[24px] flex-col justify-center md:ml-[4px]'>
                      <p className='text-[16px] font-medium md:w-[104px]'>
                        Category
                      </p>
                    </div>

                    <div className='mt-[4px] h-[40px] w-full md:ml-[33px] md:mt-0 md:h-[48px]'>
                      <TextInputIcon
                        iconSrc='../icons/qr/search.svg'
                        placeholder='Add or create categories'
                      />
                    </div>
                  </div>
                  <div className='mb-[16px] mt-[12px] flex flex-row items-center xl:hidden'>
                    <div className='flex h-[15px] flex-col justify-center'>
                      <p className='text-[12px] font-medium  text-black md:text-[16px]'>
                        Chosen categories
                      </p>
                    </div>
                    <div className='ml-[8px] flex h-[23px] flex-row items-center justify-center rounded-full bg-primary pl-[12px] pr-[8px] text-center text-[12px] text-white'>
                      Event
                      <div className='ml-[4px] h-[12px] w-[12px]'>
                        <Image
                          src='../icons/close.svg'
                          alt=''
                          height='250'
                          width='250'
                        />
                      </div>
                    </div>
                    <div className='ml-[8px] flex h-[23px] flex-row items-center justify-center rounded-full bg-primary pl-[12px] pr-[8px] text-center text-[12px] text-white'>
                      Favorite
                      <div className='ml-[4px] h-[12px] w-[12px]'>
                        <Image
                          src='../icons/close.svg'
                          alt=''
                          height='250'
                          width='250'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* FRAME PART */}
                <div
                  id='framePart'
                  className=' flex w-[100%] flex-col rounded-[8px] border-[3px] border-[#0B2878] bg-white px-[16px] pb-[16px] xl:pl-[34px] xl:pt-[28px]'
                >
                  <div className='mt-[8px] h-[20px] md:mt-[16px] md:h-[29px] xl:ml-[-6px] xl:mt-0 xl:h-[28px]'>
                    <p className=' text-center text-[16px] font-bold  md:text-left md:text-[20px] md:font-medium xl:text-[28px]'>
                      Frame
                    </p>
                  </div>
                  <div className='flex flex-col md:flex-row'>
                    <div className='mt-[10px] md:ml-[4px] md:mt-[40px] xl:ml-[2px]'>
                      <div className='flex h-[24px] flex-col justify-center md:h-[30px] md:justify-end xl:h-[20px]'>
                        <p className='text-[16px] font-medium xl:text-[18px]'>
                          Frame background
                        </p>
                      </div>
                      <div className='mt-[4px] flex h-[40px] w-[112px] flex-row items-center rounded-[8px] border pl-[10px] pr-[6px] md:h-[60px] md:w-[200px] md:border md:border-primary md:pl-[12px] xl:h-[60px] xl:w-[240px] xl:pl-[16px] xl:pr-[6px]'>
                        <p className='text-[14px] font-medium text-primary md:text-[16px] xl:text-[20px]'>
                          #FFFFFF
                        </p>
                        <div className='ml-auto h-[28px] w-[28px] rounded-[8px] border md:h-[48px] md:w-[48px] md:border md:border-primary'></div>
                      </div>
                    </div>
                    <div className='mt-[8px] inline-flex flex-row items-center md:ml-[52px] md:self-end '>
                      <div className='mr-[14px] hidden md:flex'>
                        <ToggleButton type='tablet' />
                      </div>
                      <div className='mr-[27px] flex h-[16px] w-[129px] flex-row items-center md:w-[220px]'>
                        <p className='text-[12px] font-normal md:text-[16px] xl:text-[20px] xl:font-medium'>
                          Transparent background
                        </p>
                      </div>
                      <div className='md:hidden'>
                        <ToggleButton type='mobile' />
                      </div>
                    </div>
                  </div>

                  <div className='mt-[16px]'>
                    <div className=''>
                      <div className='flex h-[24px] flex-col justify-center md:ml-[4px] md:h-[20px]'>
                        <p className='text-[16px]  font-medium xl:text-[18px] '>
                          Additional text
                        </p>
                      </div>
                      <div className='relative mt-[4px] h-[40px] w-auto rounded-[8px] border-[1px] border-primary md:ml-[4px] md:h-[60px]'>
                        <input
                          type='text'
                          className='h-full w-full rounded-[8px] pl-[12px] text-[12px] focus:outline-[1px] focus:outline-primary md:text-[16px] xl:pl-[16px] xl:text-[18px]'
                          placeholder='Enter additional text'
                        />
                      </div>
                      <div className='mt-[8px] flex flex-row gap-[18px] md:ml-[4px] md:mt-[16px] md:gap-[40px]'>
                        <div className='w-[100px]  grow md:w-[202px] '>
                          <div className='flex-cols flex h-[16px] items-center justify-start md:h-[20px]'>
                            <p className='text-[12px] font-medium md:text-[16px] xl:text-[18px]'>
                              Font
                            </p>
                          </div>
                          <div className='mt-[4px] h-[28px] font-medium md:h-[60px]'>
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
                              border={1}
                            />
                          </div>
                        </div>
                        <div className='w-[100px]  grow md:w-[202px] '>
                          <div className='flex-cols flex h-[16px] items-center justify-start md:h-[20px]'>
                            <p className='text-[12px] font-medium md:text-[16px] xl:text-[18px]'>
                              {' '}
                              Text color
                            </p>
                          </div>
                          <div className='mt-[4px] flex h-[28px] w-auto flex-row items-center rounded-[8px] border pl-[8px] pr-[4px] md:h-[60px] md:border md:border-primary md:pl-[16px] md:pr-[6px]'>
                            <p className='text-[12px] md:text-[16px] md:font-medium '>
                              #FFFFFF
                            </p>
                            <div className='ml-auto h-[20px] w-[20px] rounded-[8px] border md:h-[48px] md:w-[48px] md:border md:border-primary'></div>
                          </div>
                        </div>
                        <div className='w-[52px] grow md:w-[124px]'>
                          <div className='flex-cols flex h-[16px] items-center justify-start md:h-[20px]'>
                            <p className='text-[12px] font-medium md:text-[16px] xl:text-[18px]'>
                              Text size
                            </p>
                          </div>
                          <div className='mt-[4px] h-[28px] md:h-[60px] md:font-medium'>
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
                              border={1}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='mt-[8px] flex flex-col gap-y-[8px] md:ml-[4px] md:mt-[16px] md:gap-y-[16px]'>
                      <div className='flex flex-row gap-x-[16px] md:gap-x-[40px]'>
                        <div className='grow md:flex md:w-[202px] md:flex-row md:items-center  '>
                          <div className='flex-cols flex h-[16px] items-center justify-start  md:w-[95px] xl:w-[128px]'>
                            <p className='text-[12px] font-medium md:text-[16px] xl:text-[18px]'>
                              Border width
                            </p>
                          </div>
                          <div className='mt-[4px] h-[28px] grow md:ml-[19px] md:mt-0 md:h-[36px] md:w-[88px] xl:ml-[2px]'>
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
                              border={1}
                            />
                          </div>
                        </div>
                        <div className='grow md:flex md:w-[202px] md:flex-row md:items-center'>
                          <div className='flex-cols flex h-[16px] items-center justify-start  md:w-[95px] xl:w-[128px]'>
                            <p className='text-[12px] font-medium md:text-[16px] xl:text-[18px]'>
                              {' '}
                              Border radius
                            </p>
                          </div>
                          <div className='mt-[4px] h-[28px] grow md:ml-[19px] md:mt-0 md:h-[36px] md:w-[88px] xl:ml-[2px]'>
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
                              border={1}
                            />
                          </div>
                        </div>
                        <div className='md:w-[124px] md:grow'></div>
                      </div>
                      <div className='flex flex-row gap-x-[16px] md:gap-x-[40px]'>
                        <div className='grow md:flex md:w-[202px] md:flex-row md:items-center'>
                          <div className='flex-cols flex h-[16px] items-center justify-start  md:w-[95px] xl:w-[128px]'>
                            <p className='text-[12px] font-medium md:text-[16px] xl:text-[18px]'>
                              {' '}
                              Padding
                            </p>
                          </div>
                          <div className='mt-[4px] h-[28px] grow md:ml-[19px] md:mt-0 md:h-[36px] md:w-[88px] xl:ml-[2px]'>
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
                              border={1}
                            />
                          </div>
                        </div>
                        <div className='grow md:flex md:w-[202px] md:flex-row md:items-center '>
                          <div className='flex-cols flex h-[16px] items-center justify-start  md:w-[95px] xl:w-[128px]'>
                            <p className='text-[12px] font-medium md:text-[16px] xl:text-[18px]'>
                              {' '}
                              Margin
                            </p>
                          </div>
                          <div className='mt-[4px] h-[28px] grow md:ml-[19px] md:mt-0 md:h-[36px] md:w-[88px] xl:ml-[2px]'>
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
                              border={1}
                            />
                          </div>
                        </div>
                        <div className='md:w-[124px] md:grow'></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* PATTERN PART */}
                <div
                  id='patternPart'
                  className='flex w-[100%] flex-col rounded-[8px] border-[3px] border-[#0B2878] bg-white pb-[16px] pl-[16px] pr-[16px] pt-[8px] xl:pl-[34px] xl:pt-[28px]'
                >
                  <div className='mt-[8px] h-[20px] md:mt-[16px] md:h-[29px] xl:ml-[-6px] xl:mt-0 xl:h-[28px]'>
                    <p className=' text-center text-[16px] font-bold  md:text-left md:text-[20px] md:font-medium xl:text-[28px]'>
                      Pattern
                    </p>
                  </div>
                  <div className='mt-[8px] flex flex-wrap items-center justify-start gap-[12px] md:ml-[4px] xl:mt-[40px] xl:gap-[24px]'>
                    <button
                      className={`h-[64px] w-[64px] md:h-[140px] md:w-[140px]
          ${
            dotsType === 'square'
              ? 'rounded-[8px] border-[3px] border-primary'
              : 'rounded-[8px] border-[1px] border-[6D7EAE]'
          }`}
                    >
                      <Image
                        src='../icons/qr/pattern_square.svg'
                        alt='square pattern'
                        height='140'
                        width='140'
                        onClick={() => setDotsType('square')}
                      />
                    </button>
                    <button
                      className={`h-[64px] w-[64px] md:h-[140px] md:w-[140px]
          ${
            dotsType === 'dots'
              ? 'rounded-[8px] border-[3px] border-primary'
              : 'rounded-[8px] border-[1px] border-[6D7EAE]'
          }`}
                    >
                      <Image
                        src='../icons/qr/pattern_extra_round.svg'
                        alt='extra round pattern'
                        height='140'
                        width='140'
                        onClick={() => setDotsType('dots')}
                      />
                    </button>
                    <button
                      className={`h-[64px] w-[64px] md:h-[140px] md:w-[140px]
          ${
            dotsType === 'rounded'
              ? 'rounded-[8px] border-[3px] border-primary'
              : 'rounded-[8px] border-[1px] border-[6D7EAE]'
          }`}
                    >
                      <Image
                        src='../icons/qr/pattern_semi_round.svg'
                        alt='semi round pattern'
                        height='140'
                        width='140'
                        onClick={() => setDotsType('rounded')}
                      />
                    </button>
                    <button
                      className={`h-[64px] w-[64px] md:h-[140px] md:w-[140px]
          ${
            dotsType === 'extra-rounded'
              ? 'rounded-[8px] border-[3px] border-primary'
              : 'rounded-[8px] border-[1px] border-[6D7EAE]'
          }`}
                    >
                      <Image
                        src='../icons/qr/pattern_square.svg'
                        alt='square pattern'
                        height='140'
                        width='140'
                        onClick={() => setDotsType('extra-rounded')}
                      />
                    </button>
                    <button
                      className={`h-[64px] w-[64px] md:h-[140px] md:w-[140px]
          ${
            dotsType === 'classy'
              ? 'rounded-[8px] border-[3px] border-primary'
              : 'rounded-[8px] border-[1px] border-[6D7EAE]'
          }`}
                    >
                      <Image
                        src='../icons/qr/pattern_extra_round.svg'
                        alt='extra round pattern'
                        height='140'
                        width='140'
                        onClick={() => setDotsType('classy')}
                      />
                    </button>
                    <button
                      className={`h-[64px] w-[64px] md:h-[140px] md:w-[140px]
          ${
            dotsType === 'classy-rounded'
              ? 'rounded-[8px] border-[3px] border-primary'
              : 'rounded-[8px] border-[1px] border-[6D7EAE]'
          }`}
                    >
                      <Image
                        src='../icons/qr/pattern_semi_round.svg'
                        alt='semi round pattern'
                        height='140'
                        width='140'
                        onClick={() => setDotsType('classy-rounded')}
                      />
                    </button>
                  </div>
                  <div className='mt-[8px] flex flex-col justify-center xl:mt-[20px]'>
                    <div className='flex flex-row gap-[65px] md:ml-[4px]'>
                      <div className='flex flex-row items-center xl:h-[20px]'>
                        <input
                          id='singleColor'
                          type='radio'
                          value=''
                          name='patternColor'
                          className='h-[16px] w-[16px]'
                          onChange={() =>
                            handleRadioButton(PatternColorType.singleColor)
                          }
                          defaultChecked={true}
                        />
                        <label
                          htmlFor='singleColor'
                          className='font-base ms-2 text-[12px] md:text-[16px] md:font-bold xl:text-[17px]'
                        >
                          Single color
                        </label>
                      </div>
                      <div className='flex flex-row items-center xl:h-[20px]'>
                        <input
                          id='gradientColor'
                          type='radio'
                          value=''
                          name='patternColor'
                          className='h-[16px] w-[16px]'
                          onChange={() =>
                            handleRadioButton(PatternColorType.gradientColor)
                          }
                        />
                        <label
                          htmlFor='gradientColor'
                          className='font-base ms-2 text-[12px] md:text-[16px] md:font-bold xl:text-[17px]'
                        >
                          Gradient color
                        </label>
                      </div>
                    </div>
                    <div className='ml-[4px] mt-[14px]  hidden h-[24px] w-[100px] text-[16px] font-medium md:block xl:hidden'>
                      Pattern color
                    </div>
                    <div className='mt-[8px] flex flex-row md:ml-[4px] md:mt-[2px] xl:mt-[20px]'>
                      <div
                        className={`${
                          patternColorType === PatternColorType.singleColor
                            ? ''
                            : 'hidden'
                        }  flex h-[40px] w-[138px]  flex-row items-center rounded-[8px] border-[1px] border-primary pl-[8px] pr-[6px] md:h-[56px] md:w-[168px] md:pl-[12px] md:pr-[4px] xl:h-[60px] xl:w-[240px] xl:pl-[18px] xl:pr-[8px]`}
                      >
                        <p className='text-[14px] font-medium md:text-[16px] xl:text-[20px]'>
                          #FFFFFF
                        </p>
                        <div className='ml-auto h-[28px] w-[28px] rounded-[8px] border-[1px] border-primary md:h-[48px] md:w-[48px] xl:h-[44px] xl:w-[44px]'></div>
                      </div>
                      <div
                        className={`${
                          patternColorType === PatternColorType.gradientColor
                            ? 'flex flex-row items-center gap-[12px]'
                            : 'hidden'
                        }   xl:w-full `}
                      >
                        <div
                          className={
                            'flex h-[40px]  w-[138px] flex-row items-center rounded-[8px] border-[1px] border-primary pl-[8px] pr-[6px] md:h-[56px] md:w-[168px] md:pl-[12px] md:pr-[4px] xl:h-[60px] xl:w-[240px] xl:pl-[18px] xl:pr-[8px]'
                          }
                        >
                          <p className='text-[14px] font-medium md:text-[16px] xl:text-[20px]'>
                            #FFFFFF
                          </p>
                          <div className='ml-auto h-[28px] w-[28px] rounded-[8px] border-[1px] border-primary md:h-[48px] md:w-[48px] xl:h-[44px] xl:w-[44px]'></div>
                        </div>
                        <div
                          className={
                            'flex h-[40px]  w-[138px] flex-row items-center rounded-[8px] border-[1px] border-primary pl-[8px] pr-[6px] md:h-[56px] md:w-[168px] md:pl-[12px] md:pr-[4px] xl:h-[60px] xl:w-[240px] xl:pl-[18px] xl:pr-[8px]'
                          }
                        >
                          <p className='text-[14px] font-medium md:text-[16px] xl:text-[20px]'>
                            #FFFFFF
                          </p>
                          <div className='ml-auto h-[28px] w-[28px] rounded-[8px] border-[1px] border-primary md:h-[48px] md:w-[48px] xl:h-[44px] xl:w-[44px]'></div>
                        </div>
                        <div className='hidden w-[100px] self-start md:flex md:flex-col xl:mr-[18px] xl:w-auto xl:grow'>
                          <div className='flex h-[16px] flex-col items-center justify-start md:hidden'>
                            <p className='text-[12px] font-medium md:text-[16px]'>
                              Gradient type
                            </p>
                          </div>
                          <div className='mt-[4px] h-[28px] w-[100px] grow md:mt-0 md:h-[56px] md:w-[120px] xl:h-[60px] xl:w-full xl:max-w-[240px]'>
                            <DropDown
                              value='Horizontal'
                              options={['Horizontal', 'Vertical', 'Radio']}
                              border={1}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`mt-[8px] flex flex-col ${
                        patternColorType === PatternColorType.gradientColor
                          ? ''
                          : 'hidden'
                      }    xl:hidden`}
                    >
                      <div className='flex-cols flex h-[16px] items-center justify-start md:hidden'>
                        <p className='text-[12px] font-medium'>
                          {' '}
                          Gradient type
                        </p>
                      </div>
                      <div className='h-[28px] w-[100px] md:hidden'>
                        <DropDown
                          value='Horizontal'
                          options={['Horizontal', 'Vertical', 'Radio']}
                          border={1}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* LOGO PART */}
                <div
                  id='logoPart'
                  className='flex w-[100%] flex-col rounded-[8px] border-[3px] border-[#0B2878] bg-white px-[15px] pb-[16px] pt-[8px] xl:pl-[32px] xl:pt-[28px]'
                >
                  <div className='mt-[8px] h-[20px] md:mt-[16px] md:h-[29px] xl:ml-[-6px] xl:mt-0 xl:h-[28px] '>
                    <p className='text-center text-[16px] font-bold  md:text-left md:text-[20px] md:font-medium xl:text-[28px]'>
                      Logo
                    </p>
                  </div>
                  <div className='mt-[8px] flex flex-row flex-wrap gap-[10px] md:ml-[1px] md:gap-x-[20px] md:gap-y-[36px] xl:mt-[40px]'>
                    <button className='h-[40px] w-[40px] md:h-[68px] md:w-[68px]'>
                      <Image
                        src='../icons/qr/none_logo.svg'
                        alt='None logo'
                        height='100'
                        width='100'
                      />
                    </button>
                    <button className='h-[40px] w-[40px] md:h-[68px] md:w-[68px]'>
                      <Image
                        src='../icons/qr/youtube_logo.svg'
                        alt='Youtube logo'
                        height='100'
                        width='100'
                      />
                    </button>
                    <button className='h-[40px] w-[40px] md:h-[68px] md:w-[68px]'>
                      <Image
                        src='../icons/qr/facebook_logo.svg'
                        alt='Facebook logo'
                        height='100'
                        width='100'
                      />
                    </button>
                    <button className='h-[40px] w-[40px] md:h-[68px] md:w-[68px]'>
                      <Image
                        src='../icons/qr/instagram_logo.svg'
                        alt='Instagram logo'
                        height='100'
                        width='100'
                      />
                    </button>
                    <button className='h-[40px] w-[40px] md:h-[68px] md:w-[68px]'>
                      <Image
                        src='../icons/qr/google_logo.svg'
                        alt='Google logo'
                        height='100'
                        width='100'
                      />
                    </button>
                    <button className='h-[40px] w-[40px] md:h-[68px] md:w-[68px]'>
                      <Image
                        src='../icons/qr/twitter_logo.svg'
                        alt='Twitter logo'
                        height='100'
                        width='100'
                      />
                    </button>
                  </div>
                  <div className='mt-[16px] rounded-[8px] xl:mt-[20px]'>
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
                {/* SAVE PART */}
                <div
                  id='savePart'
                  className='flex w-[100%] flex-col rounded-[8px] border-[3px] border-[#0B2878] bg-white px-[35px] pb-[2px] pt-[28px] xl:hidden'
                >
                  <div className=' ml-auto mr-auto h-[200px] w-[200px] rounded-[8px] border border-primary p-[10px] md:h-[532px] md:w-[532px]'>
                    <Image
                      src='/../images/qr/example_qr.png'
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
                        defaultChecked={true}
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
                      <div className='h-[24px] w-[64px] md:w-[80px]'>
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
                          border={1}
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
                      {isViewSaveOptionExpand
                        ? 'View less'
                        : 'View more save option'}
                    </button>
                  </div>
                </div>
              </div>
              {/* SAVE BOX WHEN LAPTOP VIEW */}
              <div className='relative mt-[28px] hidden w-[472px] xl:flex xl:flex-col'>
                <div className='sticky top-[110px] flex w-[100%] flex-col items-center rounded-[8px] bg-white px-[20px] pb-[9px] pt-[20px] drop-shadow-[0_4px_47px_rgba(11,40,120,0.3)]'>
                  <div className=' aspect-square w-full rounded-[8px] bg-[#0B2878] px-[27px] py-[27px]'>
                    <div className='h-full w-full rounded-[8px]'>
                      <Image
                        src='/../images/qr/example_qr.png'
                        alt='Pattern 1'
                        height='500'
                        width='500'
                      />
                    </div>
                  </div>
                  <div className='mt-[32px] flex h-[20px] flex-row items-center'>
                    <div className='mr-[32px] flex h-[20px] w-[64px] flex-row items-center '>
                      <input
                        id='saveSVG'
                        type='radio'
                        value=''
                        name='saveType'
                        className='mr-[8px] h-[20px] w-[20px] text-primary hover:cursor-pointer'
                        defaultChecked={true}
                      />
                      <label
                        htmlFor='saveSVG'
                        className='text-[18px] font-bold'
                      >
                        SVG
                      </label>
                    </div>
                    <div className='mr-[40px] flex h-[20px] w-[64px] flex-row items-center'>
                      <input
                        id='savePNG'
                        type='radio'
                        value=''
                        name='saveType'
                        className='mr-[8px] h-[20px] w-[20px] hover:cursor-pointer'
                      />
                      <label
                        htmlFor='savePNG'
                        className='text-[18px] font-bold'
                      >
                        PNG
                      </label>
                    </div>
                    <div className='flex h-[28px] w-[124px] flex-row items-center'>
                      <p className='mr-[12px] w-[32px] text-[18px] font-medium'>
                        Size
                      </p>
                      <DropDown
                        border={1}
                        value='100px'
                        options={[
                          '20px',
                          '24px',
                          '32px',
                          '36px',
                          '40px',
                          '48px',
                        ]}
                      />
                    </div>
                  </div>
                  <div className='mt-[24px] flex w-full flex-col'>
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
                      className={`px-auto mr-[-1px]  h-[18px] self-end text-[12px] font-bold text-[#6D7EAE] underline ${
                        isViewSaveOptionExpand ? 'mt-[4px]' : 'mt-[8px]'
                      }`}
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
              </div>
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
