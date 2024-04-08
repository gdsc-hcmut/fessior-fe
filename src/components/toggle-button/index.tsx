'use client';
import clsx from 'clsx';
import React, { useState } from 'react';

import useScreenSize from '@/hooks/useScreenSize';
import ScreenSize from '@/types/screen-size-enum';

const ToggleButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const { screenSize, loaded } = useScreenSize();
  return (
    <label
      className={clsx(
        'h-[11px] w-[22px] cursor-pointer items-center',
        screenSize === ScreenSize.SM
          ? 'h-[11px] w-[22px]'
          : 'h-[20px] w-[38px]',
      )}
    >
      <input
        type='checkbox'
        value=''
        className='sr-only'
        checked={isActive}
        onChange={() => setIsActive(!isActive)}
      />
      <div
        className={clsx(
          ' justify-left flex items-center rounded-full ',
          screenSize === ScreenSize.SM
            ? 'h-[11px] w-[22px]'
            : 'h-[20px] w-[38px]',
          isActive ? 'bg-[#0B2878]' : 'bg-[#E6E6E6]',
        )}
      >
        <div
          className={clsx(
            ' rounded-full  duration-200',
            isActive ? 'bg-[#E6E6E6]' : 'bg-[#0B2878]',
            screenSize === ScreenSize.SM
              ? isActive
                ? 'h-[6px] w-[6px] translate-x-[14px]'
                : 'h-[6px] w-[6px] translate-x-[2px]'
              : isActive
              ? 'h-[12px] w-[12px] translate-x-[22px]'
              : 'h-[12px] w-[12px] translate-x-[4px]',
          )}
        />
      </div>
    </label>
  );
};

export default ToggleButton;
