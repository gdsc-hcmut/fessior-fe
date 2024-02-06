import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

type DropDownProps = {
  value: string;
  options: string[];
  typeOfDevice?: 'mobile' | 'tablet' | 'laptop';
  heightOfDropDown: '28' | '24' | '40';
  textSize: '12' | '16';
  paddingLeft: '4' | '6' | '8' | '16';
  mediumHeight?: '32' | '36' | '48' | '60';
  mediumTextSize?: '16' | '20';
  mediumPaddingLeft?: '8' | '16';
};

export default function DropDown(props: DropDownProps) {
  const {
    value,
    options,
    typeOfDevice,
    heightOfDropDown,
    textSize,
    paddingLeft,
    mediumHeight,
    mediumPaddingLeft,
    mediumTextSize,
  } = props;
  const [selected, setSelected] = useState(value);
  const currentDevice = typeOfDevice ? typeOfDevice : 'mobile';

  return (
    <div className='w-full'>
      <Listbox value={selected} onChange={setSelected}>
        <div className='relative w-full'>
          <Listbox.Button
            className={`relative w-full cursor-default rounded-lg border bg-white 
            ${paddingLeft === '4' ? 'pl-[4px]' : ''}
            ${paddingLeft === '6' ? 'pl-[6px]' : ''}
            ${paddingLeft === '8' ? 'pl-[8px]' : ''}
            ${paddingLeft === '16' ? 'pl-[16px]' : ''}
            ${mediumPaddingLeft === '8' ? 'md:pl-[8px]' : ''}
            ${mediumPaddingLeft === '16' ? 'md:pl-[16px]' : ''}
            
             pr-[20px] text-left ${textSize === '12' ? 'text-[12px]' : ''}
             ${textSize === '16' ? 'text-[16px]' : ''}
             ${mediumTextSize === '16' ? 'md:text-[16px]' : ''}
             ${
               mediumTextSize === '20' ? 'md:text-[20px]' : ''
             } focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300`}
          >
            <span className='block truncate'>
              <div
                className={`
                ${heightOfDropDown === '28' ? 'h-[28px]' : ''} 
                ${heightOfDropDown === '24' ? 'h-[24px]' : ''}
                ${heightOfDropDown === '40' ? 'h-[40px]' : ''}
                ${mediumHeight === '32' ? 'md:h-[32px]' : ''}
                ${mediumHeight === '36' ? 'md:h-[36px]' : ''}
                ${mediumHeight === '48' ? 'md:h-[48px]' : ''}
                ${mediumHeight === '60' ? 'md:h-[60px]' : ''} 
                flex items-center `}
              >
                {selected}
              </div>
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <svg
                width='10'
                height='7'
                viewBox='0 0 10 7'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1.175 0.533203L5 4.34987L8.825 0.533203L10 1.7082L5 6.7082L0 1.7082L1.175 0.533203Z'
                  fill='#252641'
                  fill-opacity='0.87'
                />
              </svg>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options
              className={`absolute z-50 mt-1 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none
              ${currentDevice === 'mobile' ? 'max-h-[100px]' : ''}
              ${currentDevice === 'tablet' ? 'max-h-[120px]' : ''} 
              ${currentDevice === 'laptop' ? 'max-h-[150px]' : ''}
              ${textSize === '12' ? 'text-[12px]' : ''}
              ${textSize === '16' ? 'text-[16px]' : ''}
              ${mediumTextSize === '16' ? 'md:text-[16px]' : ''}
              ${mediumTextSize === '20' ? 'md:text-[20px]' : ''}
              `}
            >
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-1 pr-4
                    ${paddingLeft === '4' ? 'pl-[4px]' : ''}
                    ${paddingLeft === '6' ? 'pl-[6px]' : ''}
                    ${paddingLeft === '8' ? 'pl-[8px]' : ''}
                    ${paddingLeft === '16' ? 'pl-[16px]' : ''}
                    ${mediumPaddingLeft === '8' ? 'md:pl-[8px]' : ''}
                    ${mediumPaddingLeft === '16' ? 'md:pl-[16px]' : ''}
                    ${active ? 'text-primary' : 'text-[#252641]'}`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center ${
                            paddingLeft === '4' ? 'pl-[4px]' : ''
                          }
                        ${paddingLeft === '6' ? 'pl-[6px]' : ''}
                        ${paddingLeft === '8' ? 'pl-[8px]' : ''}
                        ${
                          paddingLeft === '16' ? 'pl-[16px]' : ''
                        } text-amber-600`}
                        ></span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
