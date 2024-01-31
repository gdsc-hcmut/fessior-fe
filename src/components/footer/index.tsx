import Image from 'next/image';

import { getCurrentYear } from '@/utils/common';

import FooterContactItemList from './footer-contact-item-list';
import FooterResourceItemList from './footer-resource-item-list';
import SocialMediaButtonList from './social-media-button-list';

export default function Footer() {
  return (
    <div className='leading-[28.8px] tracking-[0.32px] text-default-text'>
      <div className='relative flex flex-col overflow-hidden px-[24px] py-[40px] md:px-[40px] lg:flex-row lg:items-stretch lg:justify-between lg:px-[calc(160px-(1920px-100vw)/4)] lg:py-[60px]'>
        {/* LEFT */}
        <div className='mb-[40px] lg:mx-[24px] lg:w-[600px]'>
          <div className='mb-[16px] flex items-center'>
            <div className='relative h-[48px] w-[48px] md:h-[56px] md:w-[56px] lg:h-[56px] lg:w-[56px]'>
              <Image
                src='/images/logo_transparent_navy.svg'
                alt='fessior-logo'
                fill
              />
            </div>
            <h3 className='md-[32px] ms-[8px] text-[28px] font-[700] leading-[50.4px] tracking-[0.56px] text-primary'>
              Fessior Community
            </h3>
          </div>
          <p className='mb-[20px]'>
            Fessior Community is a team of the Google Developer Student Club -
            Ho Chi Minh City University of Technology. Fessior&#39;s mission is
            to develop technology projects which bring practical values to the
            society and build a community of students who are passionate about
            technology.
          </p>
          <SocialMediaButtonList />
        </div>
        {/* RIGHT */}
        <div className='w-500 me-[100px] flex max-w-[500px] flex-col justify-between md:flex-row lg:w-[30%] lg:min-w-[]'>
          <div className='mx-[12px] mb-[20px]'>
            <h4 className='text-[24px] font-[700] leading-[43.2px] tracking-[0.48px] text-primary'>
              Resources
            </h4>
            <hr className='h-[4px] w-[60px] rounded-[9999px] bg-primary' />
            <FooterResourceItemList />
          </div>
          <div className=''>
            <h4 className='text-[24px] font-[700] leading-[43.2px] tracking-[0.48px] text-primary'>
              Contact Us
            </h4>
            <hr className='h-[4px] w-[60px] rounded-[9999px] bg-primary' />
            <FooterContactItemList />
          </div>
        </div>
        <div className='absolute right-[-67px] top-[380px] h-[180px] w-[180px] md:right-[-80px] md:top-[0px] md:h-[160px] md:w-[160px] lg:right-[-126px] lg:top-[0px] lg:h-[240px] lg:w-[240px]'>
          <Image
            className=''
            src='/images/logo_transparent_navy.svg'
            alt='fessior-logo'
            fill
          />
        </div>
      </div>
      <div className='flex h-[54px] items-center justify-center bg-primary'>
        <p className='text-[12px] leading-[21.6px] tracking-[0.24px] text-white md:text-[16px] md:leading-[28.8px] md:tracking-[0.32px]'>
          {`Fessior Tools - @${getCurrentYear()} by Fessior Community`}
        </p>
      </div>
    </div>
  );
}
