import Image from 'next/image';
import React from 'react';

import Button from '../button';

type RadioButtonProps = {
  name: string;
  name1: string;
};

const RadioButton = ({ name, name1 }: RadioButtonProps) => {
  return (
    <div>
      <div className='flex-start inline-flex h-[24px] w-[60px] justify-center'>
        <input
          type='radio'
          id='default-radio-1'
          name='radio-group'
          value=''
          className='my-auto h-5 w-5 rounded-full bg-zinc-300'
        />
        <label
          htmlFor='default-radio-1'
          className='mx-auto my-auto ml-2 inline-block text-[16px] font-bold text-primary'
        >
          {name}
        </label>
      </div>
      <div className='mx-[40px] inline-flex'>
        <div className='flex-start inline-flex h-[24px] w-[60px] justify-center'>
          <input
            type='radio'
            id='default-radio-2'
            name='radio-group'
            value=''
            className='my-auto h-5 w-5 rounded-full bg-zinc-300'
          />
          <label
            htmlFor='default-radio-2'
            className='mx-auto my-auto ml-2 inline-block text-[16px] font-bold text-primary'
          >
            {name1}
          </label>
        </div>
      </div>
    </div>
  );
};

type SizeSelectInputProps = {
  name: string;
};
const SizeSelectInput = ({ name }: SizeSelectInputProps) => {
  return (
    <div className='inline-flex h-[24px] w-[140px] text-center'>
      <p className='my-auto flex pr-2 font-bold'>{name}</p>
      <select className='my-auto flex h-[24px] w-[80px] items-center rounded-lg border-2 border-primary text-left text-[12px] text-primary focus:border-primary focus:ring-primary dark:border-primary dark:bg-primary dark:text-primary dark:placeholder-primary dark:focus:border-primary dark:focus:ring-primary'>
        <option value='100px' selected>
          100px
        </option>
        <option value='200px'>200px</option>
        <option value='300px'>300px</option>
        <option value='400px'>400px</option>
        <option value='500px'>500px</option>
        <option value='600px'>600px</option>
        <option value='700px'>700px</option>
        <option value='800px'>800px</option>
      </select>
    </div>
  );
};
const QRBox = () => {
  return (
    <div className='hidden h-[632px] w-[472px] rounded-lg border border-zinc-500 border-opacity-30 bg-white shadow-xl lg:block'>
      <div className='mx-5 mt-5 h-[432px] w-[432px] rounded-lg border border-black bg-white  md:bg-primary'>
        <Image
          src='/icons/qr-image.svg'
          alt='qr-image'
          width={378}
          height={378}
          className='m-7 rounded-lg border border-black'
        />
      </div>
      <div className='mx-[76px] mt-7 flex h-7 w-[360px] items-center'>
        <RadioButton name='SVG' name1='PNG' />
        <div className='inline-flex'>
          <SizeSelectInput name='Size' />
        </div>
      </div>
      <Button
        onClick={() => {}}
        width='full'
        className='mx-[20px] mt-7 h-[60px] w-[432px] text-[20px] font-bold'
      >
        Save this QR Code
      </Button>
      <div className='mr-5 mt-1 text-right text-[16px] font-bold text-slate-500 underline hover:text-primary'>
        View more save option
      </div>
    </div>
  );
};

export default QRBox;
