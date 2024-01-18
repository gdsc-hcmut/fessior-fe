import { clsx } from 'clsx';
import Image from 'next/image';

export type BrandProps = {
  theme: 'white' | 'primary';
};

export default function Brand(props: BrandProps) {
  const { theme = 'primary' } = props;

  const titleClass = clsx(
    'text-[20px] font-[700] tracking-[0.4px] md:tracking-[0.48px] lg:tracking-[0.56px] leading-[1px] md:text-[24px] lg:text-[28px]',
    theme === 'white' ? 'text-white' : 'text-primary',
  );

  const logoSrc =
    theme === 'white'
      ? '/logo_transparent_white.svg'
      : '/logo_transparent_navy.svg';

  return (
    <div className='flex items-center'>
      <Image
        src={logoSrc}
        alt=''
        width={0}
        height={0}
        className='me-[4px] h-[36px] w-auto md:me-[8px] md:h-[40px] lg:h-[48px]'
      />
      <h4 className={titleClass}>Fessior Tools</h4>
    </div>
  );
}
