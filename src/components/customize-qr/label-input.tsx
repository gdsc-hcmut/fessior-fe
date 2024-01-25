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
      <p className='py-[4px] text-[14px] font-semibold'>{label}</p>
      <div className='inline-flex w-full grow items-center rounded-lg border border-[#7E7E7] border-opacity-30 p-[4px]'>
        {icon}
        <div className='mx-[4px] h-6 w-0 scale-x-50 border border-stone-500 border-opacity-30' />
        <p>{placeHolder}</p>
      </div>
    </div>
  );
};
