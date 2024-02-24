import { clsx } from 'clsx';
import Image from 'next/image';
import { useRef, useState } from 'react';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import Icon from '@/types/icon-enum';
import Organization from '@/types/organization-type';
import { getIcon } from '@/utils/common';

type SelectInputProps = {
  value: string | Organization;
  options: string[] | Organization[];
  onChange: (value: string | Organization) => void;
  className?: string;
  fontSize?: number;
  height?: number;
};

export default function SelectInput(props: SelectInputProps) {
  const {
    value,
    options,
    onChange,
    className,
    fontSize = 12,
    height = 40,
  } = props;
  const [isSelecting, setIsSelecting] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    setIsSelecting(false);
  });

  const isOrganization = (
    option: string | Organization,
  ): option is Organization => {
    return (option as Organization)._id !== undefined;
  };

  const renderOption = (option: string | Organization) => {
    if (isOrganization(option)) {
      return option.shortName;
    } else {
      return option;
    }
  };

  return (
    <div
      onClick={() => {
        setIsSelecting(!isSelecting);
      }}
      tabIndex={1}
      ref={ref}
      style={{ fontSize: `${fontSize}px` }}
      className={clsx('relative cursor-pointer text-default-text', className)}
    >
      <div
        style={{ height: `${height}px` }}
        className='flex items-center justify-between rounded-[8px] border-[0.5px] border-solid border-[#7e7e7e4d] px-[8px] focus:border-[1px] focus:border-primary'
      >
        <p className='truncate'>{renderOption(value)}</p>
        <Image
          src={getIcon(
            '/icons/shorten',
            'collapse_grey.svg',
            isSelecting ? Icon.ACTIVE : Icon.INACTIVE,
          )}
          alt='collapse'
          width={0}
          height={0}
          className='h-auto w-auto'
        />
      </div>
      {isSelecting && (
        <div className='absolute top-[44px] z-[1] w-[100%] overflow-hidden rounded-[12px] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'>
          {options.map((option) => (
            <div
              key={renderOption(option)}
              onClick={(e) => {
                e.stopPropagation();
                onChange(option);
                setIsSelecting(false);
              }}
              tabIndex={1}
              className='flex h-[40px] cursor-pointer items-center px-[8px] transition-all hover:bg-primary hover:text-white focus:bg-primary'
            >
              <p className='truncate'>{renderOption(option)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
