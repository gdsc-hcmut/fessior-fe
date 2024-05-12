import Image from 'next/image';
import { useState } from 'react';

import Button from '@/components/button';

import DeleteButton from '../DeleteButton';
import UserInput from '../UserInput';

import User from '@/types/user-type';

type UserDropdownListProps = {
  users: User[];
  options: User[];
  isManagerList?: boolean;
  blockDeleteIds?: string[];
  onChangeUsers: (users: User[]) => void;
};

export default function UserDropdownList({
  users,
  options,
  isManagerList,
  blockDeleteIds,
  onChangeUsers,
}: UserDropdownListProps) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className=''>
      <div className=''>
        {isAdding ? (
          <UserInput
            userOptions={options}
            onSubmit={(newUsers: User[]) => {
              onChangeUsers([...users, ...newUsers]);
              setIsAdding(false);
            }}
            onCancel={() => {
              setIsAdding(false);
            }}
            isManagerInput={isManagerList}
          />
        ) : (
          <Button
            className='mb-3 mt-1'
            onClick={() => {
              setIsAdding(true);
            }}
          >
            + Add {`${isManagerList ? 'Managers' : 'Members'}`}
          </Button>
        )}
      </div>
      {users.map((user) => (
        <UserDropdownItem
          key={user._id}
          user={user}
          onRemove={() =>
            onChangeUsers(
              users.filter((originalUser) => originalUser._id !== user._id),
            )
          }
          isDeleteDisabled={blockDeleteIds?.includes(user._id)}
        />
      ))}
    </div>
  );
}

type UserDropdownItemProps = {
  user: User;
  onRemove: () => void;
  isDeleteDisabled?: boolean;
};

function UserDropdownItem(props: UserDropdownItemProps) {
  const { user, isDeleteDisabled, onRemove } = props;

  return (
    <div className='flex w-full items-center border-b-[1px] p-2'>
      <div className='flex flex-grow items-center'>
        <Image
          src={user.picture}
          alt=''
          width={32}
          height={32}
          className='me-2 rounded-full'
        />
        <div className=''>
          <p className='font-medium'>{`${user.firstName} ${user.lastName}`}</p>
          <p className='text-gray-600'>{user.email}</p>
        </div>
      </div>
      <DeleteButton onClick={onRemove} isDisabled={isDeleteDisabled} />
    </div>
  );
}
