import Image from 'next/image';

import closeIcon from '../../../src/assets/close.svg';

type UserValueProps = {
  pictureSrc: string;
  email: string;
  onRemove: () => void;
};

export default function UserValue({
  pictureSrc,
  email,
  onRemove,
}: UserValueProps) {
  return (
    <div className='mb-1 me-2 flex items-center rounded-2xl bg-primary-white p-1'>
      <Image
        src={pictureSrc}
        alt='avatar'
        width={20}
        height={20}
        className='me-1 rounded-full'
      />
      <span className='text-sm'>{email}</span>
      <button onClick={onRemove} className='ms-1 flex h-2/3 items-center'>
        <Image
          src={closeIcon}
          alt='close'
          width={18}
          height={18}
          className='rounded-full p-1 hover:cursor-pointer hover:bg-[#ccc] active:bg-[#ccc]'
        />
      </button>
    </div>
  );
}
