import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <div className='leading-[28.8px] tracking-[0.32px]'>
      <div className='relative flex flex-col overflow-hidden bg-primary px-[24px] py-[40px] text-white md:px-[40px] lg:flex-row lg:items-stretch lg:justify-between lg:px-[120px] lg:py-[60px]'>
        {/* LEFT */}
        <div className='mb-[40px] lg:w-[600px]'>
          <div className='mb-[16px] flex items-center'>
            <div className='relative h-[48px] w-[48px] md:h-[56px] md:w-[56px] lg:h-[56px] lg:w-[56px]'>
              <Image src='/logo_transparent_white.svg' alt='' fill />
            </div>
            <h3 className='md-[32px] ms-[8px] text-[28px] font-[700] leading-[50.4px] tracking-[0.56px]'>
              Fessior Community
            </h3>
          </div>
          <p className='mb-[20px]'>
            Fessior Community is a team of the Google Developer Student Club -
            Ho Chi Minh City University. Fessior&#39;s mission is to develop
            technology projects which bring practical values to the society and
            build a community of students who are passionate about technology.
          </p>
          <div className='flex'>
            <Link href='https://facebook.com/dscxhcmut'>
              <div className='me-[8px] flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-white'>
                <Image
                  src='/icons/facebook.svg'
                  alt=''
                  width={12}
                  height={16.8}
                />
              </div>
            </Link>
            <Link href='https://furl.one/discord'>
              <div className='me-[8px] flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-white'>
                <Image
                  src='/icons/discord.svg'
                  alt=''
                  width={22.2}
                  height={17.1}
                />
              </div>
            </Link>
            <Link href='https://www.linkedin.com/company/gdschcmut/mycompany/'>
              <div className='me-[8px] flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-white'>
                <Image
                  src='/icons/linkedin.svg'
                  alt=''
                  width={20}
                  height={20}
                />
              </div>
            </Link>
          </div>
        </div>
        {/* RIGHT */}
        <div className='w-500 me-[100px] flex max-w-[500px] flex-col justify-between md:flex-row lg:w-[30%] lg:min-w-[]'>
          <div className='mb-[20px]'>
            <h4 className='text-[24px] font-[700] leading-[43.2px] tracking-[0.48px]'>
              Resources
            </h4>
            <hr className='h-[4px] w-[60px] rounded-[9999px] bg-white' />
            <ul className='mt-[16px]'>
              <li className='mb-[12px]'>
                <Link className='hover:underline' href='#'>
                  About Us
                </Link>
              </li>
              <li className='mb-[12px]'>
                <Link className='hover:underline' href='#'>
                  Privacy Policy
                </Link>
              </li>
              <li className='mb-[12px]'>
                <Link className='hover:underline' href='#'>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className=''>
            <h4 className='text-[24px] font-[700] leading-[43.2px] tracking-[0.48px]'>
              Contact Us
            </h4>
            <hr className='h-[4px] w-[60px] rounded-[9999px] bg-white' />
            <ul className='mt-[16px]'>
              <li className='mb-[12px]'>
                <Link
                  className='hover:underline'
                  href='mailto:admin@fessior.com'
                >
                  <p>
                    <Image
                      className='me-[12px] inline-block'
                      src='/icons/email.svg'
                      width={20}
                      height={16}
                      alt=''
                    />
                    admin@fessior.com
                  </p>
                </Link>
              </li>
              <li className='mb-[12px]'>
                <p>
                  <Image
                    className='me-[12px] inline-block'
                    src='/icons/phonelink_ring.svg'
                    width={24}
                    height={24}
                    alt=''
                  />
                  0123456789
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className='absolute right-[-67px] top-[380px] h-[180px] w-[180px] md:right-[-80px] md:top-[-10px] md:h-[160px] md:w-[160px] lg:right-[-126px] lg:top-[-30px] lg:h-[240px] lg:w-[240px]'>
          <Image className='' src='/logo_transparent_white.svg' alt='' fill />
        </div>
      </div>
      <div className='flex h-[54px] items-center justify-center bg-white'>
        <p className='text-[12px] leading-[21.6px] tracking-[0.24px] text-primary md:text-[16px] md:leading-[28.8px] md:tracking-[0.32px]'>
          Fessior Tools - @2023 by Fessior Community
        </p>
      </div>
    </div>
  );
}

export default Footer;
