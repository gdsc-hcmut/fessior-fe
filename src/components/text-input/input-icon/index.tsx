import { clsx } from 'clsx';
import Image from 'next/image';

export type TextInputIconProps = {
  src: string;
  alt: string;
  hasDividerLine?: boolean;
  position: 'left' | 'right';
  onClick?: () => void;
};

export default function TextInputIcon(props: TextInputIconProps) {
  const { src, alt, hasDividerLine, onClick, position } = props;

  const iconImgClass = clsx(
    'mx-[8px] h-auto w-auto',
    !hasDividerLine && (position === 'left' ? 'ms-[12px]' : 'me-[12px]'),
    onClick && 'rounded-full p-[4px] hover:cursor-pointer hover:bg-[#ccc] active:bg-[#ccc]',
  );

  return (
    <div onClick={onClick} className='flex h-[100%] items-center'>
      {hasDividerLine && position === 'right' && <div className='h-[60%] w-[1px] bg-[#6969694d]'></div>}
      <Image src={src} alt={alt} width={0} height={0} className={iconImgClass} />
      {hasDividerLine && position === 'left' && <div className='h-[60%] w-[1px] bg-[#6969694d]'></div>}
    </div>
  );
}
