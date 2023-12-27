import { clsx } from 'clsx';
import Image from 'next/image';

type TextInputIconProps = {
  iconSrc: string;
  iconAlt?: string;
  divider?: boolean;
  position: 'left' | 'right';
  onIconClick?: () => void;
};

export function TextInputIcon(props: TextInputIconProps) {
  const { iconSrc, iconAlt, divider, onIconClick, position } = props;

  return (
    <div onClick={onIconClick} className='relative flex items-center'>
      <Image
        src={iconSrc}
        alt={iconAlt ? iconAlt : ''}
        width={0}
        height={0}
        className={clsx(
          'mx-[4px] h-auto w-auto',
          !divider && (position === 'left' ? 'ms-[12px]' : 'me-[12px]'),
          onIconClick &&
            'rounded-full p-[4px] hover:cursor-pointer hover:bg-[#ccc]',
        )}
      />
      {divider && (
        <div
          className={clsx(
            'absolute h-[23px] w-[1px] bg-[#6969694d]',
            position === 'left' && 'right-0',
            position === 'right' && 'left-0',
          )}
        ></div>
      )}
    </div>
  );
}

type TextInputProps = {
  iconSrc?: string;
  iconAlt?: string;
  placeholder: string;
  value: string;
  onInput: (value: string) => void;
  onEnter?: () => void;
  type?: string;
  iconPosition?: 'right' | 'left';
  divider?: boolean;
  onIconClick?: () => void;
  fontSize?: number;
  disabled?: boolean;
};

export default function TextInput(props: TextInputProps) {
  const {
    iconSrc,
    iconAlt,
    iconPosition = 'left',
    type,
    placeholder,
    value,
    onInput,
    onEnter,
    divider,
    onIconClick,
    fontSize = 16,
    disabled,
  } = props;
  return (
    <div
      className={clsx(
        'flex h-[40px] items-center rounded-[8px] border-[0.5px] border-solid border-[#7e7e7e4d] text-black focus-within:border-[1px] focus-within:border-primary',
        disabled && 'bg-primary/[.2] text-primary',
      )}
    >
      {iconSrc && iconPosition === 'left' && (
        <TextInputIcon
          iconSrc={iconSrc}
          iconAlt={iconAlt ? iconAlt : ''}
          divider={divider}
          position='left'
          onIconClick={onIconClick}
        />
      )}
      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onEnter) onEnter();
        }}
        value={value}
        onInput={(e) => {
          onInput(e.currentTarget.value);
        }}
        className='mx-[4px] h-[100%] flex-grow px-[4px] outline-none placeholder:text-[#696969]'
        style={{ fontSize: `${fontSize}px` }}
        placeholder={placeholder}
        type={type ? type : 'text'}
        disabled={disabled}
      />
      {iconSrc && iconPosition === 'right' && (
        <TextInputIcon
          iconSrc={iconSrc}
          iconAlt={iconAlt ? iconAlt : ''}
          divider={divider}
          position='right'
          onIconClick={onIconClick}
        />
      )}
    </div>
  );
}
