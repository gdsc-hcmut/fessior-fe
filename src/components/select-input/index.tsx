import { FC, useState } from 'react';

import IOrganization from '@/types/organization-type';

interface ISelectInputProps {
  value: string | IOrganization;
  options: string[] | IOrganization[];
  onChange: (value: string | IOrganization) => void;
  className?: string;
}

const SelectInput: FC<ISelectInputProps> = ({
  value,
  options,
  onChange,
  className,
}) => {
  const [isSelecting, setIsSelecting] = useState(false);

  const isOrganization = (
    option: string | IOrganization,
  ): option is IOrganization => {
    return (option as IOrganization)._id !== undefined;
  };

  const renderOption = (option: string | IOrganization) => {
    if (isOrganization(option)) {
      return option.shortName;
    } else {
      return option;
    }
  };

  return (
    <div
      tabIndex={1}
      onFocus={() => setIsSelecting(true)}
      onBlur={() => setIsSelecting(false)}
      className={`relative cursor-pointer text-[12px] text-black ${
        className ? className : ''
      }`}
    >
      <div className='flex h-[40px] items-center rounded-[8px] border-[0.5px] border-solid border-[#7e7e7e4d] px-[8px] focus:border-[1px] focus:border-primary'>
        <p>{renderOption(value)}</p>
      </div>
      {isSelecting && (
        <div className='absolute top-[44px] w-[100%] overflow-hidden rounded-[12px] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'>
          {options.map((option) => (
            <div
              key={renderOption(option)}
              onMouseDown={() => onChange(option)}
              tabIndex={1}
              className='flex h-[40px] cursor-pointer items-center px-[8px] hover:bg-primary hover:text-white focus:bg-primary'
            >
              <p>{renderOption(option)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectInput;
