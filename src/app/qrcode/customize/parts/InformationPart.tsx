'use client';
import Image from 'next/image';

import TextInputIcon from '@/app/qrcode/customize/text-input-icons';
import QRType from '@/app/qrcode/customize/types/qr-type-enum';
import DropDown from '@/components/listbox-select';

type InformationPartProps = { typeOfQR: QRType };
export default function InformationPart(props: InformationPartProps) {
  const { typeOfQR } = props;
  return (
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
                options={['furl.one', 'bkoisp.info', 'gic.gdsc.app']}
                border={1}
                largeFont='regular'
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`${typeOfQR === QRType.WIFI ? '' : 'hidden'}`}>
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
          <p className='text-[16px] font-medium md:w-[104px]'>Category</p>
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
            <Image src='../icons/close.svg' alt='' height='250' width='250' />
          </div>
        </div>
        <div className='ml-[8px] flex h-[23px] flex-row items-center justify-center rounded-full bg-primary pl-[12px] pr-[8px] text-center text-[12px] text-white'>
          Favorite
          <div className='ml-[4px] h-[12px] w-[12px]'>
            <Image src='../icons/close.svg' alt='' height='250' width='250' />
          </div>
        </div>
      </div>
    </div>
  );
}
