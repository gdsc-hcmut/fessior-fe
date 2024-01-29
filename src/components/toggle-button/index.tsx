import React, { useState } from 'react';

interface ToggleButtonProps {
  className: string;
  motherWidth: number;
  motherHeight: number;
  childRadius: number;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  className,
  motherHeight,
  motherWidth,
  childRadius,
}) => {
  const [isActive, setIsActive] = useState(false);
  const differenceWidth: number = Math.floor((motherHeight - childRadius) / 2);
  const translateToEnd: number = Math.floor(
    motherWidth - childRadius - differenceWidth,
  );
  console.log('Dif ', differenceWidth);
  console.log('Move ', translateToEnd);
  console.log('ChildRadius ', childRadius);
  return (
    <label className={`inline-flex cursor-pointer items-center ${className} `}>
      <input
        type='checkbox'
        value=''
        className='sr-only'
        checked={isActive}
        onChange={() => setIsActive(!isActive)}
      />
      <div
        className={`h-[${motherHeight}px] w-[${motherWidth}px] ${
          isActive ? 'bg-[#0B2878]' : 'bg-[#E6E6E6]'
        } justify-left flex items-center rounded-full `}
      >
        <div
          className={`h-[${childRadius}px] w-[${childRadius}px] rounded-full ${
            !isActive ? 'bg-[#0B2878]' : 'bg-[#E6E6E6]'
          } duration-200 ${
            isActive
              ? `translate-x-[${translateToEnd}px]`
              : `translate-x-[${differenceWidth}px]`
          }`}
        />
      </div>
    </label>
  );
};

export default ToggleButton;
