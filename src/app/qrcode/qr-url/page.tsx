'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';

import Button from '@/components/button';
import CategoryItem from '@/components/category-item';
import Input from '@/components/input';
import ShortenTools from '@/components/shorten-tools';
import AuthContext from '@/contexts/authContext';
import meService from '@/libs/api/me';
import Organization from '@/types/organization-type';

export default function QRURLScreen() {
  const router = useRouter();
  const [inputQRName, setInputQRName] = useState('');
  const [inputURL, setInputURL] = useState('');
  const [inputCategory, setInputCategory] = useState('');
  const [organizationOpt, setOrganizationOpts] = useState('GDSC');
  const [domainOpt, setDomainOpts] = useState('gic.gdsc.app');
  const [organizationOptions, setOrganizationOptions] = useState<
    null | Organization[]
  >(null);
  const [organizationValue, setOrganizationValue] =
    useState<null | Organization>(null);
  const [domainValue, setDomainValue] = useState('');
  const [domainOptions, setDomainOptions] = useState<null | string[]>(null);
  const { meProfile, isAuthStatusReady } = useContext(AuthContext);

  useEffect(() => {
    if (!meProfile) return;

    (async () => {
      try {
        const organizationOptionsInitial = await meService.getOrganization();
        setOrganizationOptions(organizationOptionsInitial);
        setDomainOptions(organizationOptionsInitial[0].domains);
        setOrganizationValue(organizationOptionsInitial[0]);
        setDomainValue(organizationOptionsInitial[0].domains[0]);
      } catch (e: any) {
        console.log(e.message);
      }
    })();
  }, [meProfile]);

  useEffect(() => {
    if (organizationValue) {
      setDomainOptions(organizationValue.domains);
      setDomainValue(organizationValue.domains[0]);
    }
  }, [organizationValue]);

  const handleChange = (mode: string) => {
    switch (mode) {
      case 'organization':
        return (value: Organization) => {
          setOrganizationValue(value);
        };
      case 'domain':
        return (value: string) => {
          setDomainValue(value);
        };
      default:
        return () => {};
    }
  };
  const consoleLog = () => {
    console.log(meProfile);
    console.log(organizationOptions);
    console.log(organizationValue);
    console.log(domainOptions);
  };
  const eventCategory = {
    _id: '1',
    name: 'Event',
    color: '#ff0000',
    organization: 'org1',
    urls: ['url1', 'url2'],
  };
  const favCategory = {
    _id: '2',
    name: 'Favourite',
    color: '#ff0000',
    organization: 'org2',
    urls: ['url1', 'url2'],
  };
  return (
    <>
      <div className='relative flex flex-col items-center overflow-hidden leading-[1.2] text-primary'>
        <div className='md:max-w-[1000px] lg:flex lg:flex-col lg:items-center'>
          <div className='text-center'>
            <h1 className='mt-[80px] text-[36px] font-[700] leading-[65px] md:mt-[168px] md:text-[48px] lg:text-[60px]'>
              <span>Fessior</span> QR Generator
            </h1>
            <p className='hidden leading-[24px] md:block md:text-[20px] lg:mb-0 lg:mt-3 lg:text-[24px]'>
              Convenience, efficiency, and versatility:{' '}
              <br className='md:hidden' /> QR Code Management Made Easy
            </p>
          </div>
          <div className='mx-auto my-5 flex w-[100%] max-w-[360px] text-[16px] font-[500] md:my-6 md:max-w-[416px] md:text-[20px]'>
            <Button
              onClick={() => consoleLog}
              className='flex items-center justify-center'
              width='full'
              type='positive'
            >
              <div className='transition-all'>
                <Image
                  src={'/icons/link-qr-chosen.svg'}
                  alt='link icon'
                  width={40}
                  height={40}
                  className='pr-2'
                />
              </div>
              Website URL
            </Button>
            <Button
              width='full'
              type='neutral'
              className='ml-6 flex items-center justify-center'
              onClick={() => {
                router.push('/qrcode/qr-wifi');
              }}
            >
              <div className='transition-all'>
                <Image
                  src={'/icons/wifi.svg'}
                  alt='wifi icon'
                  width={40}
                  height={40}
                  className='pr-2'
                />
              </div>
              Wi-fi
            </Button>
          </div>
          <div className='relative mx-auto mb-[172px] w-[90%] rounded-[8px] border-[3px] border-solid border-primary bg-white p-[16px] shadow-[0px_4px_47px_0px_rgba(11,40,120,0.30)] sm:max-w-[480px] md:flex md:w-[85%] md:max-w-[760px] md:flex-grow md:flex-col md:border-[0.5px] md:border-[#7e7e7e4d] lg:w-[100%] lg:max-w-[856px] lg:p-[24px]'>
            <div className='container md:inline-flex'>
              <h6 className='mb-[4px] flex-shrink-0 text-[16px] font-[500] md:mb-[8px] md:mt-[6px] md:text-[20px]'>
                QR Name
              </h6>
              <div className='mb-[16px] md:ml-6 md:w-[90%]'>
                <Input
                  iconSrc='/icons/label_outline.svg'
                  iconAlt='label outline icon'
                  placeholder='Enter your QR name'
                  textValue={inputQRName}
                  divider={true}
                  iconPosition='left'
                  onInput={setInputQRName}
                  onEnter={() => {}}
                />
              </div>
            </div>
            <div className='container md:inline-flex'>
              <h6 className='mb-[4px] flex-shrink-0 text-[16px] font-[500] md:mb-[8px] md:mt-[6px] md:text-[20px]'>
                Your URL
              </h6>
              <div className='mb-[12px] md:mb-[20px] md:ml-6 md:w-[90%]'>
                <Input
                  iconSrc='/icons/link-qr-20px.svg'
                  iconAlt='link icon'
                  placeholder='Enter your URL'
                  textValue={inputURL}
                  iconPosition='left'
                  divider={true}
                  onInput={setInputURL}
                  onEnter={() => {}}
                />
              </div>
            </div>
            <div>
              <div className='inline-block md:mb-[8px] md:flex md:flex-grow lg:mb-0'>
                <div className='mb-[8px] flex items-center justify-between md:me-[20px] md:inline-flex lg:mb-5'>
                  <p className='inline  text-[12px] font-[500] text-black md:text-[16px]'>
                    Organization
                  </p>
                  <Input
                    textValue={organizationOpt}
                    dropdownOptions={['GDSC', 'CTCT', 'OISP']}
                    onDropdownSelect={(selectedOption: any) => {
                      setOrganizationOpts(selectedOption);
                    }}
                    collapseIcon={true}
                    className='ms-[8px] w-[140px] md:ms-[13px]'
                  />
                </div>
                <div className='flex items-center justify-between md:mb-2 md:inline-flex lg:mb-5'>
                  <p className='inline text-[12px] font-[500] text-black md:text-[16px]'>
                    Domain
                  </p>
                  <Input
                    textValue={domainOpt}
                    dropdownOptions={[
                      'furl.one',
                      'bkoisp.info',
                      'gic.gdsc.app',
                    ]}
                    onDropdownSelect={(selectedOption: any) => {
                      setDomainOpts(selectedOption);
                    }}
                    collapseIcon={true}
                    className='ms-[8px] w-[140px] md:ms-[13px]'
                  />
                </div>
              </div>
            </div>
            <div className='mb-[8px] md:mb-[16px] md:flex md:items-center md:justify-between'>
              <h6 className='mb-[4px] text-[16px] font-[500] md:mb-0 md:inline md:text-[20px]'>
                Category
              </h6>
              <div className='md:ml-6 md:inline-block md:flex-grow'>
                <Input
                  iconSrc='/icons/search-20px.svg'
                  iconAlt='search icon'
                  placeholder='Add or create categories'
                  textValue={inputCategory}
                  divider={true}
                  onInput={setInputCategory}
                />
              </div>
            </div>
            <div className='mb-0'>
              <p className='me-[16px] inline text-[12px] font-[500] text-black md:text-[16px]'>
                Chosen categories
              </p>
              <div className='inline space-x-2'>
                <CategoryItem
                  category={eventCategory}
                  onClick={() => console.log('event')}
                />
                <CategoryItem
                  category={favCategory}
                  onClick={() => console.log('Fav')}
                />
              </div>
            </div>
            <div className='mx-auto mt-6 flex max-w-[288px] items-center justify-between space-x-4 md:max-w-[352px] md:space-x-8'>
              <Button
                type='positive'
                className='h-[40px] w-[136px] md:w-[160px]'
                onClick={() => {}}
              >
                Create Now
              </Button>
              <Button
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
