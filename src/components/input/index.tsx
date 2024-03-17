import { clsx } from 'clsx';
import { ReactNode, useEffect, useRef, useState } from 'react';

import DefaultDropdownItems from '@/components/default-dropdown-item';
import Dropdown from '@/components/dropdown';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import Icon from '@/types/icon-enum';
import ShortenInputFieldType from '@/types/shorten-input-field-type';
import { getIcon } from '@/utils/common';

import InputIcon from './input-icon';

type InputProps = {
  textValue: string;
  iconSrc?: string;
  iconAlt?: string;
  placeholder?: string;
  onInput?: (value: string) => void;
  onEnter?: () => void;
  type?: string;
  iconPosition?: 'right' | 'left';
  divider?: boolean;
  onIconClick?: () => void;
  fontSize?: number;
  disabled?: boolean;
  className?: string;
  height?: number;
  dropdownOptions?: ShortenInputFieldType[];
  dropdownValues?: ShortenInputFieldType[];
  onDropdownSelect?: (option: ShortenInputFieldType) => void;
  renderCustomDropdownItems?: (
    options: ShortenInputFieldType[],
    onSelect: (option: ShortenInputFieldType) => void,
    values?: ShortenInputFieldType[],
    creatingValue?: string,
    onCreate?: () => void,
  ) => ReactNode;
  collapseIcon?: boolean;
};

export default function Input(props: InputProps) {
  const {
    iconSrc,
    iconAlt,
    iconPosition = 'left',
    type,
    placeholder,
    textValue,
    onInput,
    onEnter,
    divider,
    onIconClick,
    fontSize = 16,
    disabled,
    className,
    height = 40,
    dropdownOptions,
    dropdownValues,
    renderCustomDropdownItems,
    onDropdownSelect,
    collapseIcon,
  } = props;

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const ref = useRef(null);

  const handleSelect = (option: ShortenInputFieldType) => {
    if (onDropdownSelect) onDropdownSelect(option);
    if (!dropdownValues) setIsDropdownVisible(false);
  };

  const getDropdownItems = () => {
    if (!dropdownOptions) return null;

    if (renderCustomDropdownItems)
      return renderCustomDropdownItems(
        dropdownOptions,
        handleSelect,
        dropdownValues,
        textValue.length > 0 ? textValue : undefined,
      );

    return (
      <DefaultDropdownItems options={dropdownOptions} onSelect={handleSelect} />
    );
  };

  useEffect(() => {
    if (!onInput) return;

    if (textValue !== '') {
      setIsDropdownVisible(true);
    }
  }, [textValue, onInput]);

  useOnClickOutside(ref, () => {
    setIsDropdownVisible(false);
  });

  const containerClass = clsx(
    'flex w-[100%] relative items-center rounded-[8px] border-[0.5px] border-solid border-[#7e7e7e4d] text-black focus-within:border-[1px] focus-within:border-primary',
    disabled && 'bg-primary/[.2] text-primary',
    !disabled && !onInput && 'hover:cursor-pointer',
    className,
  );

  const inputClass = clsx(
    'mx-[8px] h-[100%] flex-grow px-[4px] outline-none placeholder:text-royal-300',
    disabled && 'bg-transparent',
    !onInput && 'bg-white',
  );

  return (
    <div
      onFocus={() => setIsDropdownVisible(true)}
      ref={ref}
      style={{ height: `${height}px` }}
      className={containerClass}
    >
      {iconSrc && iconPosition === 'left' && (
        <InputIcon
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
        value={textValue}
        onInput={(e) => {
          if (onInput) onInput(e.currentTarget.value);
        }}
        className={inputClass}
        style={{ fontSize: `${fontSize}px` }}
        placeholder={placeholder}
        type={type ? type : 'text'}
        disabled={disabled || !onInput}
        size={1}
      />
      {
        !disabled && !onInput && (
          <div
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            className='absolute bottom-0 left-0 right-0 top-0'
          ></div>
        ) // disabled input element will propagate click event -> this div will overlay the input to pass up mouse events in order to work properly with select-input case
      }
      {iconSrc && iconPosition === 'right' && (
        <InputIcon
          iconSrc={iconSrc}
          iconAlt={iconAlt ? iconAlt : ''}
          divider={divider}
          position='right'
          onIconClick={onIconClick}
        />
      )}
      {collapseIcon && (
        <InputIcon
          iconSrc={getIcon(
            '/icons/shorten',
            'collapse_grey.svg',
            isDropdownVisible ? Icon.ACTIVE : Icon.INACTIVE,
          )}
          iconAlt={iconAlt ? iconAlt : ''}
          divider={divider}
          position='right'
          onIconClick={onIconClick}
        />
      )}
      {dropdownOptions && onDropdownSelect && isDropdownVisible && (
        <Dropdown positionTop={height + 4}>{getDropdownItems()}</Dropdown>
      )}
    </div>
  );
}
