import React, { useState } from 'react';

interface ToggleButtonProps {
  type: 'mobile' | 'tablet' | 'laptop';
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ type }) => {
  const [isActive, setIsActive] = useState(false);
  if (type === 'mobile') {
    return (
      <label className='h-[11px] w-[22px] cursor-pointer items-center'>
        <input
          type='checkbox'
          value=''
          className='sr-only'
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
        />
        <div
          className={`h-[11px] w-[22px] ${
            isActive ? 'bg-[#0B2878]' : 'bg-[#E6E6E6]'
          } justify-left flex items-center rounded-full `}
        >
          <div
            className={`h-[6px] w-[6px] rounded-full ${
              !isActive ? 'bg-[#0B2878]' : 'bg-[#E6E6E6]'
            } duration-200 ${
              isActive ? 'translate-x-[14px]' : 'translate-x-[2px]'
            }`}
          />
        </div>
      </label>
    );
  } else if (type === 'tablet') {
    return (
      <label className='h-[20px] w-[38px] cursor-pointer items-center'>
        <input
          type='checkbox'
          value=''
          className='sr-only'
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
        />
        <div
          className={`h-[20px] w-[38px] ${
            isActive ? 'bg-[#0B2878]' : 'bg-[#E6E6E6]'
          } justify-left flex items-center rounded-full `}
        >
          <div
            className={`h-[12px] w-[12px] rounded-full ${
              !isActive ? 'bg-[#0B2878]' : 'bg-[#E6E6E6]'
            } duration-200 ${
              isActive ? 'translate-x-[22px]' : 'translate-x-[4px]'
            }`}
          />
        </div>
      </label>
    );
  }
};

export default ToggleButton;
