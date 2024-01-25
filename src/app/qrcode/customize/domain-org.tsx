export interface dropProps {
  label: string;
  placeholder: string;
}
export const DomainOrg: React.FC<dropProps> = ({ label, placeholder }) => {
  return (
    <div className='mt-[10px] inline-flex h-[28px] w-[236px] items-center bg-white'>
      <h1 className='mr-[8px] w-[68px] text-xs font-medium'>{label}</h1>
      <div className='inline-flex w-[160px] rounded-lg border border-[#7E7E7E] border-opacity-30'>
        <div className='my-[5px] ml-[7px]'>{placeholder}</div>
        <div className='my-auto ml-auto mr-[4px] flex h-[20px] w-[20px] items-center justify-center text-xs'>
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
        </div>
      </div>
    </div>
  );
};

export default DomainOrg;
