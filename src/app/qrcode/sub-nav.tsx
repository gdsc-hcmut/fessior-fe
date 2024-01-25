export interface titleProps {
  content: string;
  isActive: 'true' | 'false';
}
export const Title: React.FC<titleProps> = ({ content, isActive }) => {
  if (isActive === 'false')
    return (
      <button className='flex rounded-lg bg-white text-[#0B2878] hover:bg-[#0B2878] hover:text-[white]'>
        <div className='inline-flex flex-col rounded-lg border border-black px-[8px] py-[4px] text-[14px] md:px-[32px] md:py-[8px] md:text-[18px] lg:w-[160px]'>
          <p className='text-center'>{content}</p>
        </div>
      </button>
    );
  else
    return (
      <button className='flex rounded-lg bg-[#0B2878] text-white hover:cursor-pointer'>
        <div className='inline-flex flex-col items-center rounded-lg border border-black px-[8px] py-[4px] text-[14px] md:px-[32px] md:py-[8px] md:text-[18px] lg:w-[160px]'>
          <p className='text-center'>{content}</p>
        </div>
      </button>
    );
};
