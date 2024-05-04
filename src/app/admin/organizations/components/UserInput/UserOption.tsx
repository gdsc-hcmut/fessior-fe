import clsx from 'clsx';
import Image from 'next/image';

type UserOptionProps = {
  firstName: string;
  lastName: string;
  pictureSrc: string;
  email: string;
  isFocusing?: boolean;
  onSelect: () => void;
};

export default function UserOption({
  firstName,
  lastName,
  pictureSrc,
  email,
  isFocusing,
  onSelect,
}: UserOptionProps) {
  const optionClass = clsx(
    'flex w-full items-center border-b-[1px] p-2 hover:cursor-pointer hover:bg-primary-white',
    isFocusing && 'cursor-pointer bg-primary-white',
  );

  return (
    <div onClick={onSelect} className={optionClass}>
      <Image
        src={pictureSrc}
        alt=''
        width={32}
        height={32}
        className='me-2 rounded-full'
      />
      <div className=''>
        <p className='font-medium'>{`${firstName} ${lastName}`}</p>
        <p className='text-gray-600'>{email}</p>
      </div>
    </div>
  );
}
