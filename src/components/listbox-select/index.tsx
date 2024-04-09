import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import useScreenSize from '@/hooks/useScreenSize';
import ScreenSize from '@/types/screen-size-enum';

type DropDownProps = {
  value: string;
  options: string[];
  border: number;
  largeFont?: string;
};

export default function DropDown(props: DropDownProps) {
  const { value, options, largeFont, border } = props;
  const { screenSize, loaded } = useScreenSize();
  const [selected, setSelected] = useState(value);
  const c_fontWeight =
    screenSize === ScreenSize.LG
      ? largeFont === 'bold'
        ? 700
        : largeFont === 'medium'
        ? 500
        : 400
      : 400;
  return (
    <div className='relative h-full w-full'>
      <Listbox value={selected} onChange={setSelected}>
        <div className='relative h-full w-full'>
          <Listbox.Button
            style={{
              borderWidth: `${border}px`,
            }}
            className={`relative h-[100%] w-full cursor-pointer rounded-lg border border-primary bg-white
            pl-[8px] pr-[4px] text-left text-[12px] focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2
            focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 md:text-[16px]`}
          >
            <span className='block truncate'>
              <div
                style={{
                  fontWeight: `${c_fontWeight}`,
                }}
                className={'flex items-center '}
              >
                {selected}
              </div>
            </span>
            <span
              className={
                'pointer-events-none absolute inset-y-0 right-0 flex items-center pl-[8px] pr-[4px]'
              }
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
              className={
                'absolute z-50 mt-1 max-h-[100px] w-full overflow-auto rounded-md bg-white text-[12px] shadow-lg ring-1 ring-black/5 focus:outline-none md:text-[16px]'
              }
            >
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  style={{
                    fontWeight: `${c_fontWeight}`,
                  }}
                  className={({ active }) =>
                    `relative cursor-default select-none py-1 pl-[8px]
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
                          style={{
                            fontWeight: `${c_fontWeight}`,
                          }}
                          className={`absolute inset-y-0 left-0 flex items-center
                        pl-[8px] text-amber-600`}
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
