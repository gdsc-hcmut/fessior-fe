import Image from 'next/image';
import { FC } from 'react';

interface ITextInputProps {
  iconSrc?: string;
  iconAlt?: string;
  placeholder: string;
  value: string;
  onInput: (value: string) => void;
  onEnter?: () => void;
}

const TextInput: FC<ITextInputProps> = ({
  iconSrc,
  iconAlt,
  placeholder,
  value,
  onInput,
  onEnter,
}) => {
  return (
    <div className='flex h-[40px] items-center rounded-[8px] border-[0.5px] border-solid border-[#7e7e7e4d] focus-within:border-[1px] focus-within:border-primary'>
      {iconSrc && (
        <>
          <Image
            src={`\\${iconSrc}`}
            alt={iconAlt ? iconAlt : ''}
            width={0}
            height={0}
            className='mx-[4px] h-auto w-auto'
          />
          <div className='h-[23px] w-[1px] bg-[#6969694d]'></div>
        </>
      )}
      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onEnter) onEnter();
        }}
        value={value}
        onInput={(e) => {
          onInput(e.currentTarget.value);
        }}
        className='mx-[4px] h-[100%] flex-grow px-[4px] text-[12px] text-black outline-none placeholder:text-[#696969]'
        placeholder={placeholder}
        type='text'
      />
    </div>
  );
};

export default TextInput;
