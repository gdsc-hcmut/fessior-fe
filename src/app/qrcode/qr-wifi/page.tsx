'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/button';
import CategoryItem from '@/components/category-item';
import SelectInput from '@/components/select-input';
import ShortenTools from '@/components/shorten-tools';
import TextInput from '@/components/text-input';

export default function CreateQRWifiScreen() {
  const router = useRouter();
  function navToWebsite() {
    router.push('/qrcode/qr-url');
  }

  return (
    <>
      <div className='relative flex flex-col items-center overflow-hidden leading-[1.2] text-primary'>
        <div className='md:max-w-[1000px] lg:flex lg:flex-col lg:items-center'>
          <div className='text-center'>
            <h1 className='mt-[80px] text-[36px] font-[700] leading-[65px] md:mt-[168px] md:text-[48px] lg:text-[60px]'>
              <span className=' md:inline'>Fessior</span> QR Generator
            </h1>
            <p className='mb-[20px] hidden leading-[24px] md:block md:text-[24px] lg:mb-0 lg:text-[28px] lg:leading-[65px]'>
              Convenience, efficiency, and versatility:{' '}
              <br className='md:hidden' /> QR Code Management Made Easy
            </p>
          </div>
          <div className='m-6 mx-auto flex w-[100%] max-w-[360px] justify-between text-[16px] font-[500] md:max-w-[416px] md:text-[20px]'>
            <Button
              image='/icons/link-qr.svg'
              imageOnHover='/icons/link-qr-choosen.svg'
              imageAlt='icons'
              imageSize={40}
              onClick={() => {
                navToWebsite();
              }}
              className='flex items-center justify-center'
              width='full'
              type='neutral'
            >
              Website URL
            </Button>
            <Button
              image='/icons/wifi-white.svg'
              imageOnHover='/icons/wifi-white.svg'
              imageAlt='icons'
              imageSize={40}
              width='full'
              type='positive'
              className='ml-6 flex items-center justify-center'
              onClick={() => {}}
            >
              Wi-fi
            </Button>
          </div>

          <div className='relative mx-auto mb-[172px]  w-[90%] rounded-[8px] border-[3px] border-solid border-primary bg-white p-[16px] shadow-[0px_4px_47px_0px_rgba(11,40,120,0.30)] sm:max-w-[480px] md:flex md:w-[85%] md:max-w-[760px] md:flex-grow md:flex-col md:border-[0.5px] md:border-[#7e7e7e4d] lg:w-[100%] lg:max-w-[740px] lg:p-[24px]'>
            <div className='container md:inline-flex'>
              <h6 className='mb-[4px] flex-shrink-0 text-[16px] font-[500] md:mb-[8px] md:mt-[6px] md:text-[20px]'>
                QR Name
              </h6>
              <div className='mb-[16px] md:ml-6 md:w-[90%]'>
                <TextInput
                  iconSrc='/icons/label_outline.svg'
                  iconAlt='icon'
                  placeholder='Enter your QR name'
                  value=''
                  divider={true}
                  iconPosition='left'
                  onInput={() => {}}
                  onEnter={() => {}}
                />
              </div>
            </div>
            <div className='container md:inline-flex'>
              <h6 className='mb-[4px] flex-shrink-0 text-[16px] font-[500] md:mb-[8px] md:mt-[6px] md:text-[20px]'>
                WiFi SSID
              </h6>
              <div className='mb-[16px] md:ml-[24px] md:w-[90%]'>
                <TextInput
                  iconSrc='/icons/label_outline.svg'
                  iconAlt='icon'
                  placeholder='Wifi SSID (Name)'
                  value=''
                  divider={true}
                  iconPosition='left'
                  onInput={() => {}}
                  onEnter={() => {}}
                />
              </div>
            </div>
            <div>
              <div className='inline-block md:mb-[8px] md:flex md:flex-grow'>
                <div className='mb-4 flex items-center justify-between md:mb-[8px] md:me-[20px] md:inline-flex'>
                  <p className='inline text-[16px] font-[500] md:text-[20px]'>
                    Encryption
                  </p>
                  <SelectInput
                    value='WPA/WPA2'
                    options={['WPA/WPA2', 'WEP', 'NONE', 'RAW']}
                    onChange={() => {}}
                    className='ms-[24px] w-[124px] md:ms-2'
                  />
                </div>
              </div>
            </div>
            <div className='mb-[16px] md:flex md:items-center md:justify-between'>
              <h6 className='mb-[4px] text-[16px] font-[500] md:mb-0 md:inline md:text-[20px]'>
                Password
              </h6>
              <div className='md:ml-[20px] md:inline-block md:flex-grow'>
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
            <div className='mb-[8px] md:mb-[16px] md:flex md:items-center md:justify-between'>
              <h6 className='mb-[4px] text-[16px] font-[500] md:mb-0 md:inline md:text-[20px]'>
                Category
              </h6>
              <div className='md:ml-[24px] md:inline-block md:flex-grow'>
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
            <div className='mb-[8px]'>
              <p className='me-[6px] inline font-[500] text-[12Spx] text-black md:text-[16px]'>
                Chosen categories
              </p>
              <div className='inline'>
                <CategoryItem text='Event' />
                <CategoryItem text='Favorite' />
              </div>
            </div>
            <div className='mx-auto mt-6 flex max-w-[288px] items-center justify-between space-x-4 md:max-w-[352px]'>
              <Button
                width='full'
                type='positive'
                className='h-[40px] w-[136px] md:w-[160px]'
                onClick={() => {}}
              >
                Create Now
              </Button>
              <Button
                width='full'
                type='neutral'
                className='h-[40px] w-[136px] md:w-[160px]'
                onClick={() => {}}
              >
                Customize QR
              </Button>
            </div>
            <div className='absolute left-[-15px] top-[-15px] z-[-1] h-[80px] w-[120px] rounded-[8px] bg-primary'></div>
            <div className='absolute bottom-[-15px] right-[-15px] z-[-1] h-[80px] w-[120px] rounded-[8px] bg-primary'></div>
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
        <div className='absolute right-[-10px] top-[100px] hidden h-[40px] w-[40px] rounded-full bg-primary md:block'></div>
        <div className='absolute left-[40px] top-[145px] hidden h-[12px] w-[12px] rounded-full bg-primary md:left-[30px] md:h-[28px] md:w-[28px] lg:left-[100px] lg:h-[40px] lg:w-[40px]'></div>
        <div className='absolute left-[-70px] top-[727px] h-[120px] w-[120px] rounded-full bg-primary'></div>
        <div className='absolute bottom-[9px] right-[-30px] h-[80px] w-[80px] rounded-full bg-primary md:hidden'></div>
        <div className='absolute bottom-[0px] right-[60px] h-[20px] w-[20px] rounded-full bg-primary md:hidden'></div>
      </div>
    </>
  );
}
