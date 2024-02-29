import { clsx } from 'clsx';
import Image from 'next/image';

type TextInputIconProps = {
  iconSrc: string;
  mediumIconSrc: string;
  iconAlt?: string;
  placeholder: string;
};

export default function TextInputIcon(props: TextInputIconProps) {
  const { iconSrc, iconAlt, placeholder, mediumIconSrc } = props;
  return (
    <div className='relative h-full w-full rounded-[8px] border-[0.5px] border-gray-300 md:border-[1px] md:border-primary'>
      <input
        type='text'
        className='h-full w-full rounded-[8px] pl-[36px] text-[12px] focus:outline-[1px] focus:outline-primary md:pl-[48px] md:text-[16px] xl:pl-[78px] xl:text-[18px] '
        placeholder={placeholder}
      />
      <Image
        src={iconSrc}
        alt={iconAlt ? iconAlt : ''}
        width={0}
        height={0}
        className={'absolute left-[5px] top-2.5 h-[20px] w-[20px] md:hidden '}
      />
      <Image
        src={mediumIconSrc}
        alt={iconAlt ? iconAlt : ''}
        width={0}
        height={0}
        className={'absolute hidden md:left-[10px] md:top-[12px] md:block md:h-[24px] md:w-[24px] xl:left-[18px] xl:top-[18px]'}
      />
      <div className='absolute left-[30px] top-[8px] h-[24px] w-[0.5px] bg-[#696969] opacity-[30%] md:left-[40px] md:top-[12px] xl:left-[60px] xl:top-[18px]'></div>
    </div>
  );
}
