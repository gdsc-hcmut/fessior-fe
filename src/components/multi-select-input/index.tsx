import clsx from 'clsx';
import Image from 'next/image';
import { ReactNode, useMemo, useRef, useState } from 'react';

import { useOnClickOutside } from '@/hooks';

import InputIcon, { InputIconProps } from '../input-icon';

type MultiSelectInputProps<T> = {
  remainingOptions: T[];
  selectedValues: T[];
  placeholder?: string;
  isSearchable?: boolean;
  isDisabled?: boolean;
  className?: string;
  leftIconProps?: Omit<InputIconProps, 'position'>;
  rightIconProps?: Omit<InputIconProps, 'position'>;
  tabIndex?: number;
  isAutoFocus?: boolean;
  onSelect: (option: T) => void;
  onDeselect: (option: T) => void;
  renderSelectedValue?: (value: T) => ReactNode;
  renderRemainingOption?: (option: T) => ReactNode;
  stringifyOption?: (option: T) => string;
};

export default function MultiSelectInput<T>({
  remainingOptions,
  selectedValues,
  placeholder,
  isDisabled,
  className,
  leftIconProps,
  rightIconProps,
  tabIndex,
  isAutoFocus,
  onSelect,
  onDeselect,
  renderSelectedValue = (value: T) => (typeof value === 'string' ? <p className='truncate'>{value}</p> : null),
  renderRemainingOption = (option: T) => (typeof option === 'string' ? <p className='truncate'>{option}</p> : null),
  stringifyOption = (option: T) => (typeof option === 'string' ? option : ''),
}: MultiSelectInputProps<T>) {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(inputRef, () => setIsOpen(false));

  const filteredRemainingOptions = useMemo(
    () =>
      remainingOptions.filter((option) => stringifyOption(option).toLowerCase().includes(searchPhrase.toLowerCase())),
    [remainingOptions, searchPhrase, stringifyOption],
  );

  const filteredSelectedValues = useMemo(
    () => selectedValues.filter((value) => stringifyOption(value).toLowerCase().includes(searchPhrase.toLowerCase())),
    [selectedValues, stringifyOption, searchPhrase],
  );

  const containerClass = useMemo(
    () =>
      clsx(
        'flex h-12 py-2 relative items-center rounded-lg border-[0.5px] border-solid border-[#7e7e7e4d] text-black focus-within:border focus-within:border-primary',
        isDisabled && 'bg-primary/[.2] text-primary',
        className,
      ),
    [isDisabled, className],
  );

  const inputClass = useMemo(
    () => clsx('mx-2 flex-grow px-1 outline-none placeholder:text-royal-300', isDisabled && 'bg-transparent'),
    [isDisabled],
  );

  return (
    <div className={containerClass} onFocus={() => setIsOpen(true)} ref={inputRef}>
      {leftIconProps && <InputIcon {...leftIconProps} position='left' />}
      <input
        value={searchPhrase}
        onInput={(e) => {
          setSearchPhrase(e.currentTarget.value);
          setIsOpen(true);
        }}
        className={inputClass}
        placeholder={placeholder}
        disabled={isDisabled}
        size={1}
        tabIndex={tabIndex}
        autoFocus={isAutoFocus}
      />
      {isOpen && (!!filteredRemainingOptions || !!filteredSelectedValues) && (
        <div className='absolute top-[115%] z-[1] w-[100%] overflow-hidden rounded-[8px] border-t-[1px] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'>
          {filteredSelectedValues.map((value) => (
            <div
              className='flex h-[40px] cursor-pointer items-center px-[8px] transition-all hover:bg-royal-300/[.1] focus:bg-royal-300/[.1]'
              key={stringifyOption(value)}
              onClick={(e) => {
                e.stopPropagation();
                onDeselect(value);
              }}
            >
              <div className='me-[12px]'>
                <Image
                  src='/icons/shorten/tick_royal.svg'
                  alt='tick'
                  width={0}
                  height={0}
                  className='h-[100%] w-auto'
                />
              </div>
              {renderSelectedValue(value)}
            </div>
          ))}
          {filteredRemainingOptions.map((option) => (
            <div
              className='flex h-[40px] cursor-pointer items-center px-[8px] transition-all hover:bg-royal-300/[.1] focus:bg-royal-300/[.1]'
              key={stringifyOption(option)}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(option);
              }}
            >
              {renderRemainingOption(option)}
            </div>
          ))}
        </div>
      )}
      {rightIconProps && <InputIcon {...rightIconProps} position='right' />}
    </div>
  );
}
