'use client';
import Image from 'next/image';

export default function LogoPart() {
  return (
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
  );
}
