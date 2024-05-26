import clsx from 'clsx';
import { ReactNode, useMemo, useRef, useState } from 'react';

import { useOnClickOutside } from '@/hooks';
import { getIcon } from '@/utils/common';

import InputIcon, { InputIconProps } from '../input-icon';

import Icon from '@/types/icon-enum';

type SingleSelectInputProps<T> = {
  options: T[];
  selectedValue: T;
  isDisabled?: boolean;
  className?: string;
  leftIconProps?: Omit<InputIconProps, 'position'>;
  rightIconProps?: Omit<InputIconProps, 'position'>;
  noCollapseIcon?: boolean;
  onSelect: (option: T) => void;
  renderSelectedValue?: (value: T) => ReactNode;
  renderOptionItem?: (option: T) => ReactNode;
};

export default function SingleSelectInput<T>({
  options,
  selectedValue,
  isDisabled,
  className,
  leftIconProps,
  rightIconProps,
  noCollapseIcon,
  renderSelectedValue = (value: T) => (typeof value === 'string' ? <p className='truncate'>{value}</p> : null),
  renderOptionItem = (option: T) => (typeof option === 'string' ? <p className='truncate'>{option}</p> : null),
  onSelect,
}: SingleSelectInputProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(inputRef, () => setIsOpen(false));

  const containerClass = useMemo(
    () =>
      clsx(
        'flex h-12 py-2 relative items-center rounded-lg border-[0.5px] border-solid border-[#7e7e7e4d] text-black focus-within:border focus-within:border-primary',
        isDisabled ? 'bg-primary/[.2] text-primary' : 'hover:cursor-pointer',
        className,
      ),
    [isDisabled, className],
  );

  return (
    <div
      className={containerClass}
      onClick={() => {
        if (isDisabled) return;
        setIsOpen(!isOpen);
      }}
      ref={inputRef}
    >
      {leftIconProps && <InputIcon {...leftIconProps} position='left' />}
      <div className='mx-2 flex-grow px-1'>{renderSelectedValue(selectedValue)}</div>
      {isOpen && !!options.length && (
        <div className='absolute top-[115%] z-[1] w-[100%] overflow-hidden rounded-[8px] border-t-[1px] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'>
          {options.map((option, index) => (
            <div
              className='flex h-[40px] cursor-pointer items-center px-[8px] transition-all hover:bg-royal-300/[.1] focus:bg-royal-300/[.1]'
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {renderOptionItem(option)}
            </div>
          ))}
        </div>
      )}
      {rightIconProps && <InputIcon {...rightIconProps} position='right' />}
      {!noCollapseIcon && (
        <InputIcon
          src={getIcon('/icons/shorten', 'collapse_grey.svg', isOpen ? Icon.ACTIVE : Icon.INACTIVE)}
          alt='collapse'
          position='right'
        />
      )}
    </div>
  );
}
