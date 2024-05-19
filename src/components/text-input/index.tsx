import clsx from 'clsx';
import { useMemo } from 'react';

import InputIcon, { InputIconProps } from '../input-icon';

type TextInputProps = {
  value: string;
  onInput: (value: string) => void;
  onEnterKey?: () => void;
  placeholder?: string;
  isDisabled?: boolean;
  type?: string;
  className?: string;
  leftIconProps?: Omit<InputIconProps, 'position'>;
  rightIconProps?: Omit<InputIconProps, 'position'>;
  tabIndex?: number;
  isAutoFocus?: boolean;
};

export default function TextInput({
  value,
  onInput,
  onEnterKey,
  placeholder,
  isDisabled,
  type,
  className,
  leftIconProps,
  rightIconProps,
  tabIndex,
  isAutoFocus,
}: TextInputProps) {
  const containerClass = useMemo(
    () =>
      clsx(
        'flex w-[100%] py-2 relative items-center rounded-[8px] border-[0.5px] border-solid border-[#7e7e7e4d] text-black focus-within:border-[1px] focus-within:border-primary',
        isDisabled && 'bg-primary/[.2] text-primary',
        className,
      ),
    [isDisabled, className],
  );

  const inputClass = useMemo(
    () => clsx('mx-[8px] flex-grow px-[4px] outline-none placeholder:text-royal-300', isDisabled && 'bg-transparent'),
    [isDisabled],
  );

  return (
    <div className={containerClass}>
      {leftIconProps && <InputIcon {...leftIconProps} position='left' />}
      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onEnterKey) onEnterKey();
        }}
        value={value}
        onInput={(e) => onInput(e.currentTarget.value)}
        className={inputClass}
        placeholder={placeholder}
        type={type}
        disabled={isDisabled}
        size={1}
        tabIndex={tabIndex}
        autoFocus={isAutoFocus}
      />
      {rightIconProps && <InputIcon {...rightIconProps} position='right' />}
    </div>
  );
}
