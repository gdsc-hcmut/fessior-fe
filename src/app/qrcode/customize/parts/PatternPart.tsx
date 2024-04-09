'use client';
import Image from 'next/image';
import { DotType } from 'qr-code-styling';

import DropDown from '@/components/listbox-select';

import PatternColorType from '../types/pattern-color.enum';

interface PatternPartProps {
  dotType: DotType;
  setDotType: React.Dispatch<React.SetStateAction<DotType>>;
  patternColorType: PatternColorType;
  setPatternColorType: React.Dispatch<React.SetStateAction<PatternColorType>>;
}

export default function PatternPart(props: PatternPartProps) {
  const { dotType, setDotType, patternColorType, setPatternColorType } = props;
  const handleRadioButton = (value: PatternColorType) => {
    setPatternColorType(value);
  };
  return (
    <div
      id='patternPart'
      className='flex w-[100%] flex-col rounded-[8px] border-[3px] border-[#0B2878] bg-white pb-[16px] pl-[16px] pr-[16px] pt-[8px] xl:pl-[34px] xl:pt-[28px]'
    >
      <div className='mt-[8px] h-[20px] md:mt-[16px] md:h-[29px] xl:ml-[-6px] xl:mt-0 xl:h-[28px]'>
        <p className=' text-center text-[16px] font-bold  md:text-left md:text-[20px] md:font-medium xl:text-[28px]'>
          Pattern
        </p>
      </div>
      <div className='mt-[8px] flex flex-wrap items-center justify-start gap-[12px] md:ml-[4px] xl:mt-[40px] xl:gap-[24px]'>
        <button
          className={`h-[64px] w-[64px] md:h-[140px] md:w-[140px]
          ${
            dotType === 'square'
              ? 'rounded-[8px] border-[3px] border-primary'
              : 'rounded-[8px] border-[1px] border-[6D7EAE]'
          }`}
        >
          <Image
            src='../icons/qr/pattern_square.svg'
            alt='square pattern'
            height='140'
            width='140'
            onClick={() => setDotType('square')}
          />
        </button>
        <button
          className={`h-[64px] w-[64px] md:h-[140px] md:w-[140px]
          ${
            dotType === 'dots'
              ? 'rounded-[8px] border-[3px] border-primary'
              : 'rounded-[8px] border-[1px] border-[6D7EAE]'
          }`}
        >
          <Image
            src='../icons/qr/pattern_extra_round.svg'
            alt='extra round pattern'
            height='140'
            width='140'
            onClick={() => setDotType('dots')}
          />
        </button>
        <button
          className={`h-[64px] w-[64px] md:h-[140px] md:w-[140px]
          ${
            dotType === 'rounded'
              ? 'rounded-[8px] border-[3px] border-primary'
              : 'rounded-[8px] border-[1px] border-[6D7EAE]'
          }`}
        >
          <Image
            src='../icons/qr/pattern_semi_round.svg'
            alt='semi round pattern'
            height='140'
            width='140'
            onClick={() => setDotType('rounded')}
          />
        </button>
        <button
          className={`h-[64px] w-[64px] md:h-[140px] md:w-[140px]
          ${
            dotType === 'extra-rounded'
              ? 'rounded-[8px] border-[3px] border-primary'
              : 'rounded-[8px] border-[1px] border-[6D7EAE]'
          }`}
        >
          <Image
            src='../icons/qr/pattern_square.svg'
            alt='square pattern'
            height='140'
            width='140'
            onClick={() => setDotType('extra-rounded')}
          />
        </button>
        <button
          className={`h-[64px] w-[64px] md:h-[140px] md:w-[140px]
          ${
            dotType === 'classy'
              ? 'rounded-[8px] border-[3px] border-primary'
              : 'rounded-[8px] border-[1px] border-[6D7EAE]'
          }`}
        >
          <Image
            src='../icons/qr/pattern_extra_round.svg'
            alt='extra round pattern'
            height='140'
            width='140'
            onClick={() => setDotType('classy')}
          />
        </button>
        <button
          className={`h-[64px] w-[64px] md:h-[140px] md:w-[140px]
          ${
            dotType === 'classy-rounded'
              ? 'rounded-[8px] border-[3px] border-primary'
              : 'rounded-[8px] border-[1px] border-[6D7EAE]'
          }`}
        >
          <Image
            src='../icons/qr/pattern_semi_round.svg'
            alt='semi round pattern'
            height='140'
            width='140'
            onClick={() => setDotType('classy-rounded')}
          />
        </button>
      </div>
      <div className='mt-[8px] flex flex-col justify-center xl:mt-[20px]'>
        <div className='flex flex-row gap-[65px] md:ml-[4px]'>
          <div className='flex flex-row items-center xl:h-[20px]'>
            <input
              id='singleColor'
              type='radio'
              value=''
              name='patternColor'
              className='h-[16px] w-[16px]'
              onChange={() => handleRadioButton(PatternColorType.singleColor)}
              defaultChecked={true}
            />
            <label
              htmlFor='singleColor'
              className='font-base ms-2 text-[12px] md:text-[16px] md:font-bold xl:text-[17px]'
            >
              Single color
            </label>
          </div>
          <div className='flex flex-row items-center xl:h-[20px]'>
            <input
              id='gradientColor'
              type='radio'
              value=''
              name='patternColor'
              className='h-[16px] w-[16px]'
              onChange={() => handleRadioButton(PatternColorType.gradientColor)}
            />
            <label
              htmlFor='gradientColor'
              className='font-base ms-2 text-[12px] md:text-[16px] md:font-bold xl:text-[17px]'
            >
              Gradient color
            </label>
          </div>
        </div>
        <div className='ml-[4px] mt-[14px]  hidden h-[24px] w-[100px] text-[16px] font-medium md:block xl:hidden'>
          Pattern color
        </div>
        <div className='mt-[8px] flex flex-row md:ml-[4px] md:mt-[2px] xl:mt-[20px]'>
          <div
            className={`${
              patternColorType === PatternColorType.singleColor ? '' : 'hidden'
            }  flex h-[40px] w-[138px]  flex-row items-center rounded-[8px] border-[1px] border-primary pl-[8px] pr-[6px] md:h-[56px] md:w-[168px] md:pl-[12px] md:pr-[4px] xl:h-[60px] xl:w-[240px] xl:pl-[18px] xl:pr-[8px]`}
          >
            <p className='text-[14px] font-medium md:text-[16px] xl:text-[20px]'>
              #FFFFFF
            </p>
            <div className='ml-auto h-[28px] w-[28px] rounded-[8px] border-[1px] border-primary md:h-[48px] md:w-[48px] xl:h-[44px] xl:w-[44px]'></div>
          </div>
          <div
            className={`${
              patternColorType === PatternColorType.gradientColor
                ? 'flex flex-row items-center gap-[12px]'
                : 'hidden'
            }   xl:w-full `}
          >
            <div
              className={
                'flex h-[40px]  w-[138px] flex-row items-center rounded-[8px] border-[1px] border-primary pl-[8px] pr-[6px] md:h-[56px] md:w-[168px] md:pl-[12px] md:pr-[4px] xl:h-[60px] xl:w-[240px] xl:pl-[18px] xl:pr-[8px]'
              }
            >
              <p className='text-[14px] font-medium md:text-[16px] xl:text-[20px]'>
                #FFFFFF
              </p>
              <div className='ml-auto h-[28px] w-[28px] rounded-[8px] border-[1px] border-primary md:h-[48px] md:w-[48px] xl:h-[44px] xl:w-[44px]'></div>
            </div>
            <div
              className={
                'flex h-[40px]  w-[138px] flex-row items-center rounded-[8px] border-[1px] border-primary pl-[8px] pr-[6px] md:h-[56px] md:w-[168px] md:pl-[12px] md:pr-[4px] xl:h-[60px] xl:w-[240px] xl:pl-[18px] xl:pr-[8px]'
              }
            >
              <p className='text-[14px] font-medium md:text-[16px] xl:text-[20px]'>
                #FFFFFF
              </p>
              <div className='ml-auto h-[28px] w-[28px] rounded-[8px] border-[1px] border-primary md:h-[48px] md:w-[48px] xl:h-[44px] xl:w-[44px]'></div>
            </div>
            <div className='hidden w-[100px] self-start md:flex md:flex-col xl:mr-[18px] xl:w-auto xl:grow'>
              <div className='flex h-[16px] flex-col items-center justify-start md:hidden'>
                <p className='text-[12px] font-medium md:text-[16px]'>
                  Gradient type
                </p>
              </div>
              <div className='mt-[4px] h-[28px] w-[100px] grow md:mt-0 md:h-[56px] md:w-[120px] xl:h-[60px] xl:w-full xl:max-w-[240px]'>
                <DropDown
                  value='Horizontal'
                  options={['Horizontal', 'Vertical', 'Radio']}
                  border={1}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`mt-[8px] flex flex-col ${
            patternColorType === PatternColorType.gradientColor ? '' : 'hidden'
          }    xl:hidden`}
        >
          <div className='flex-cols flex h-[16px] items-center justify-start md:hidden'>
            <p className='text-[12px] font-medium'> Gradient type</p>
          </div>
          <div className='h-[28px] w-[100px] md:hidden'>
            <DropDown
              value='Horizontal'
              options={['Horizontal', 'Vertical', 'Radio']}
              border={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
