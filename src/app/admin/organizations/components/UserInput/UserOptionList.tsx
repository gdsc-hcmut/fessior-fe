import clsx from 'clsx';
import Image from 'next/image';

import User from '../../../src/types/user';

type UserOptionListProps = {
  displayingUserOptions: User[];
  focusingIndex: number;
  handleUserSelect: (id: string) => void;
};

export default function UserOptionList(props: UserOptionListProps) {
  const { displayingUserOptions, focusingIndex, handleUserSelect } = props;

  return (
    <div className='absolute left-0 right-[65px] max-h-[328px] overflow-y-auto overflow-x-hidden rounded-lg border-[1px] bg-white shadow-2xl'>
      {displayingUserOptions.map((user, index) => (
        <UserOption
          isFocusing={focusingIndex === index}
          key={user._id}
          onSelect={() => handleUserSelect(user._id)}
          {...user}
          pictureSrc={user.picture}
        />
      ))}
    </div>
  );
}

type UserOptionProps = {
  firstName: string;
  lastName: string;
  pictureSrc: string;
  email: string;
  isFocusing?: boolean;
  onSelect: () => void;
};

function UserOption({ firstName, lastName, pictureSrc, email, isFocusing, onSelect }: UserOptionProps) {
  const optionClass = clsx(
    'flex w-full items-center border-b-[1px] p-2 hover:cursor-pointer hover:bg-primary-white',
    isFocusing && 'cursor-pointer bg-primary-white',
  );

  return (
    <div onClick={onSelect} className={optionClass}>
      <Image src={pictureSrc} alt='' width={32} height={32} className='me-2 rounded-full' />
      <div className=''>
        <p className='font-medium'>{`${firstName} ${lastName}`}</p>
        <p className='text-gray-600'>{email}</p>
      </div>
    </div>
  );
}
