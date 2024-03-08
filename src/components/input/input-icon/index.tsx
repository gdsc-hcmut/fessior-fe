import { clsx } from 'clsx';
import Image from 'next/image';

type InputIconProps = {
  iconSrc: string;
  iconAlt?: string;
  divider?: boolean;
  position: 'left' | 'right';
  onIconClick?: () => void;
};

export default function InputIcon(props: InputIconProps) {
  const { iconSrc, iconAlt, divider, onIconClick, position } = props;

  const inputIconClass = clsx(
    'mx-[8px] h-auto w-auto',
    !divider && (position === 'left' ? 'ms-[12px]' : 'me-[12px]'),
    onIconClick &&
      'rounded-full p-[4px] hover:cursor-pointer hover:bg-[#ccc] active:bg-[#ccc]',
  );

  return (
    <div onClick={onIconClick} className='flex h-[100%] items-center'>
      {divider && position === 'right' && (
        <div className='h-[60%] w-[1px] bg-[#6969694d]'></div>
      )}
      <Image
        src={iconSrc}
        alt={iconAlt ? iconAlt : ''}
        width={0}
        height={0}
        className={inputIconClass}
      />
      {divider && position === 'left' && (
        <div className='h-[60%] w-[1px] bg-[#6969694d]'></div>
      )}
    </div>
  );
}
