import { clsx } from 'clsx';
import Image from 'next/image';

export type BrandProps = {
  theme: 'white' | 'primary';
};

export default function Brand({ theme = 'primary' }: BrandProps) {
  return (
    <div className='flex h-[40px] items-center md:h-[44px] lg:h-[50px]'>
      <Image
        src={
          theme === 'white'
            ? '/logo_transparent_white.svg'
            : '/logo_transparent_navy.svg'
        }
        alt=''
        width={0}
        height={0}
        className='me-[4px] h-[100%] w-auto'
      />
      <h4
        className={clsx(
          'text-[20px] font-[700] leading-[1px] md:text-[24px] lg:text-[28px]',
          theme === 'white' ? 'text-white' : 'text-primary',
        )}
      >
        Fessior Tools
      </h4>
    </div>
  );
}
