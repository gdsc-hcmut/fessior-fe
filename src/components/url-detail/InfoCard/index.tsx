import Image from 'next/image';

function InfoCard() {
  return (
    <div className='flex w-full flex-col justify-between space-y-5 rounded-lg bg-white px-5 py-5 shadow-[0_2px_4px_0_rgba(11,40,120,0.25)]'>
      <div className='flex items-center justify-between'>
        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#db4437]/10'>
          <Image
            src='/icons/url/click_red.svg'
            alt='More icon'
            width={0}
            height={0}
            className='h-6 w-auto'
          />
        </div>
        <div className='flex flex-col items-end'>
          <p className='font-bold text-[#db4437]'>27</p>
          <p className='font-medium text-[#252641]'>Today&apos;s Click</p>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#FBBC04]/10'>
          <Image
            src='/icons/url/mouse.svg'
            alt='More icon'
            width={0}
            height={0}
            className='h-7 w-auto'
          />
        </div>
        <div className='flex flex-col items-end'>
          <p className='font-bold text-[#FBBC04]'>127</p>
          <p className='font-medium text-[#252641]'>Total Click</p>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#0F9D58]/10'>
          <Image
            src='/icons/url/clock.svg'
            alt='More icon'
            width={0}
            height={0}
            className='h-6 w-auto'
          />
        </div>
        <div className='flex flex-col items-end'>
          <p className='text-[14px] font-bold text-[#0F9D58] xs:text-base'>
            Monday 1/1/2024 8:59:10 PM
          </p>
          <p className='font-medium text-[#252641]'>Created on</p>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
