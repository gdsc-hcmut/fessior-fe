import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

type DropDownProps = {
  value: string;
  options: string[];
  typeOfDevice?: 'mobile' | 'tablet' | 'laptop';
  heightOfDropDown: '28' | '24' | '40';
  textSize: '12' | '16';
  paddingLeft: '4' | '6' | '8' | '16';
  mediumHeight?: '28' | '32' | '36' | '48' | '60' | '56';
  mediumTextSize?: '16' | '20' | '18';
  mediumPaddingLeft?: '8' | '16';
  paddingRight: '2' | '4';
  mediumPaddingRight?: '0' | '2' | '4' | '6' | '12' | '20';
  largeHeight?: '24' | '32' | '36' | '60';
  largeTextSize?: '16' | '18' | '20';
  largeFont?: 'medium' | 'bold' | 'regular';
  largePaddingLeft?: '4' | '8' | '16';
  largePaddingRight?: '2' | '4' | '6' | '16' | '8';
  border?: 'none' | '1';
  mediumBorder?: 'none' | '1';
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
    paddingRight,
    mediumPaddingRight,
    largeFont,
    largeHeight,
    largePaddingLeft,
    largePaddingRight,
    largeTextSize,
    border,
    mediumBorder,
  } = props;
  const [selected, setSelected] = useState(value);
  const currentDevice = typeOfDevice ? typeOfDevice : 'mobile';

  return (
    <div className='w-full'>
      <Listbox value={selected} onChange={setSelected}>
        <div className='relative w-full'>
          <Listbox.Button
            className={`relative w-full cursor-default rounded-lg border bg-white 
            ${border === '1' ? 'border-[1px] border-primary' : ''}
            
            ${mediumBorder === '1' ? 'md:border-[1px] md:border-primary' : ''}
            ${paddingLeft === '4' ? 'pl-[4px]' : ''}
            ${paddingLeft === '6' ? 'pl-[6px]' : ''}
            ${paddingLeft === '8' ? 'pl-[8px]' : ''}
            ${paddingLeft === '16' ? 'pl-[16px]' : ''}
            ${mediumPaddingLeft === '8' ? 'md:pl-[8px]' : ''}
            ${mediumPaddingLeft === '16' ? 'md:pl-[16px]' : ''}
            ${largePaddingLeft === '4' ? 'xl:pl-[4px]' : ''}
            ${largePaddingLeft === '8' ? 'xl:pl-[8px]' : ''}
            ${largePaddingLeft === '16' ? 'xl:pl-[16px]' : ''}

            
            ${paddingRight === '2' ? 'pr-[2px]' : ''}
            ${paddingRight === '4' ? 'pr-[4px]' : ''}
            ${mediumPaddingRight === '0' ? 'md:pr-[0px]' : ''}
            ${mediumPaddingRight === '2' ? 'md:pr-[2px]' : ''}
            ${mediumPaddingRight === '4' ? 'md:pr-[4px]' : ''}
            ${mediumPaddingRight === '6' ? 'md:pr-[6px]' : ''}
            ${mediumPaddingRight === '12' ? 'md:pr-[12px]' : ''}
            ${mediumPaddingRight === '20' ? 'md:pr-[20px]' : ''}
            ${largePaddingRight === '2' ? 'xl:pr-[2px]' : ''}
            ${largePaddingRight === '4' ? 'xl:pr-[4px]' : ''}
            ${largePaddingRight === '6' ? 'xl:pr-[6px]' : ''}
            ${largePaddingRight === '8' ? 'xl:pr-[8px]' : ''}
            ${largePaddingRight === '16' ? 'xl:pr-[16px]' : ''}
             text-left ${textSize === '12' ? 'text-[12px]' : ''}
             ${textSize === '16' ? 'text-[16px]' : ''}
             ${mediumTextSize === '16' ? 'md:text-[16px]' : ''}
             ${mediumTextSize === '20' ? 'md:text-[20px]' : ''}
             ${mediumTextSize === '18' ? 'md:text-[18px]' : ''}
             ${largeTextSize === '16' ? 'xl:text-[16px]' : ''}
             ${largeTextSize === '18' ? 'xl:text-[18px]' : ''}
             ${largeTextSize === '20' ? 'xl:text-[20px]' : ''}
             focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300`}
          >
            <span className='block truncate'>
              <div
                className={`
                ${heightOfDropDown === '28' ? 'h-[28px]' : ''} 
                ${heightOfDropDown === '24' ? 'h-[24px]' : ''}
                ${heightOfDropDown === '40' ? 'h-[40px]' : ''}
                ${mediumHeight === '28' ? 'md:h-[28px]' : ''}
                ${mediumHeight === '32' ? 'md:h-[32px]' : ''}
                ${mediumHeight === '36' ? 'md:h-[36px]' : ''}
                ${mediumHeight === '48' ? 'md:h-[48px]' : ''}
                ${mediumHeight === '56' ? 'md:h-[56px]' : ''} 
                ${mediumHeight === '60' ? 'md:h-[60px]' : ''} 
                ${largeHeight === '24' ? 'xl:h-[24px]' : ''}
                ${largeHeight === '32' ? 'xl:h-[32px]' : ''}
                ${largeHeight === '36' ? 'xl:h-[36px]' : ''}
                ${largeHeight === '60' ? 'xl:h-[60px]' : ''}
                ${largeFont === 'medium' ? 'xl:font-medium' : ''}
                ${largeFont === 'bold' ? 'xl:font-bold' : ''}
                ${largeFont === 'regular' ? 'xl:font-normal' : ''}
                flex items-center `}
              >
                {selected}
              </div>
            </span>
            <span
              className={`pointer-events-none absolute inset-y-0 right-0 flex items-center 
            ${paddingRight === '2' ? 'pr-[2px]' : ''}
            ${paddingRight === '4' ? 'pr-[4px]' : ''}
            ${mediumPaddingRight === '0' ? 'md:pr-[0px]' : ''}
            ${mediumPaddingRight === '2' ? 'md:pr-[2px]' : ''}
            ${mediumPaddingRight === '4' ? 'md:pr-[4px]' : ''}
            ${mediumPaddingRight === '6' ? 'md:pr-[6px]' : ''}
            ${mediumPaddingRight === '12' ? 'md:pr-[12px]' : ''}
            ${mediumPaddingRight === '20' ? 'md:pr-[20px]' : ''}
            ${largePaddingRight === '2' ? 'xl:pr-[2px]' : ''}
            ${largePaddingRight === '4' ? 'xl:pr-[4px]' : ''}
            ${largePaddingRight === '6' ? 'xl:pr-[6px]' : ''}
            ${largePaddingRight === '8' ? 'xl:pr-[8px]' : ''}
            ${largePaddingRight === '16' ? 'xl:pr-[16px]' : ''}
            `}
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6.175 6.53516L10 10.3518L13.825 6.53516L15 7.71016L10 12.7102L5 7.71016L6.175 6.53516Z'
                  fill='#252641'
                  fillOpacity='0.87'
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
              ${mediumTextSize === '18' ? 'md:text-[18px]' : ''}
              ${mediumTextSize === '20' ? 'md:text-[20px]' : ''}
              ${largeTextSize === '16' ? 'xl:text-[16px]' : ''}
              ${largeTextSize === '18' ? 'xl:text-[18px]' : ''}
              ${largeTextSize === '20' ? 'xl:text-[20px]' : ''}
              `}
            >
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-1 
                    ${paddingLeft === '4' ? 'pl-[4px]' : ''}
                    ${paddingLeft === '6' ? 'pl-[6px]' : ''}
                    ${paddingLeft === '8' ? 'pl-[8px]' : ''}
                    ${paddingLeft === '16' ? 'pl-[16px]' : ''}
                    ${mediumPaddingLeft === '8' ? 'md:pl-[8px]' : ''}
                    ${mediumPaddingLeft === '16' ? 'md:pl-[16px]' : ''}
                    ${largePaddingLeft === '4' ? 'xl:pl-[4px]' : ''}
                    ${largePaddingLeft === '8' ? 'xl:pl-[8px]' : ''}
                    ${largePaddingLeft === '16' ? 'xl:pl-[16px]' : ''}
                    ${largeFont === 'medium' ? 'xl:font-medium' : ''}
                ${largeFont === 'bold' ? 'xl:font-bold' : ''}
                ${largeFont === 'regular' ? 'xl:font-normal' : ''}
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
                        ${paddingLeft === '16' ? 'pl-[16px]' : ''}
                        ${mediumPaddingLeft === '8' ? 'md:pl-[8px]' : ''}
                        ${mediumPaddingLeft === '16' ? 'md:pl-[16px]' : ''}
                        ${largePaddingLeft === '4' ? 'xl:pl-[4px]' : ''}
                        ${largePaddingLeft === '8' ? 'xl:pl-[8px]' : ''}
                        ${largePaddingLeft === '16' ? 'xl:pl-[16px]' : ''}
                        ${largeFont === 'medium' ? 'xl:font-medium' : ''}
                        ${largeFont === 'bold' ? 'xl:font-bold' : ''}
                        ${largeFont === 'regular' ? 'xl:font-normal' : ''}
                        text-amber-600`}
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
