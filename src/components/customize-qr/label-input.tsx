import { ReactNode } from 'react';

export interface inputProps {
  label: string;
  icon: ReactNode;
  placeHolder: string;
}
export const InputWithLabel: React.FC<inputProps> = ({
  label,
  icon,
  placeHolder,
}) => {
  return (
    <div className='flex-col'>
      <p className='py-[4px] text-base font-semibold'>{label}</p>
      <div className='relative inline-flex w-[100%] rounded-lg border border-stone-500'>
        <div className='absolute left-[5px] top-[10px]'>{icon}</div>
        <div className='absolute left-[24px] top-[6px] h-[20px] w-[20px]'>
          <div className='mx-[4px] h-6 w-0 scale-x-50 border border-stone-500 border-opacity-30' />
        </div>
        <input
          type='text'
          className=' w-full rounded-lg border-gray-300 px-4 py-2 pl-10'
          placeholder={placeHolder}
        />
      </div>
      {/* <p className='py-[4px] text-base font-semibold'>{label}</p>
      <div className='inline-flex w-full grow items-center rounded-lg border border-[#7E7E7] border-opacity-30 p-[4px]'>
        {icon}
        <div className='mx-[4px] h-6 w-0 scale-x-50 border border-stone-500 border-opacity-30' />
        <p>{placeHolder}</p>
      </div> */}
    </div>
  );
};
