import { ReactNode } from 'react';

export interface titleProps {
  content: string;
}
export const Title: React.FC<titleProps> = ({ content }) => {
  return (
    <button className='rounded-lg hover:bg-[#0B2878] hover:text-[white]'>
      <div className='inline-flex items-center rounded-lg border border-black px-[8px] py-[4px] text-[14px] md:px-[32px] md:py-[8px] md:text-[18px]'>
        <p className='text-center'>{content}</p>
      </div>
    </button>
  );
};
