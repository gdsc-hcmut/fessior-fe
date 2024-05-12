import Image from 'next/image';
import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from 'react';

import Button from '@/components/button';

import checkIcon from '../../../src/assets/check.svg';
import closeIcon from '../../../src/assets/close.svg';
import User from '../../../src/types/user';

import UserOptionList from './UserOptionList';
import UserValueList from './UserValueList';

type UserInputProps = {
  userOptions: User[];
  isManagerInput?: boolean;
  onSubmit: (users: User[]) => void;
  onCancel: () => void;
};

export default function UserInput({ userOptions, isManagerInput, onSubmit, onCancel }: UserInputProps) {
  const [searching, setSearching] = useState('');
  const [userValueIds, setUserValueIds] = useState<string[]>([]);
  const [focusingIndex, setFocusingIndex] = useState(0);

  const remainingUserOptions = useMemo(
    () => userOptions.filter((user) => !userValueIds.includes(user._id)),
    [userOptions, userValueIds],
  );

  const userValues = useMemo(
    () => userOptions.filter((user) => userValueIds.includes(user._id)),
    [userOptions, userValueIds],
  );

  const displayingUserOptions = useMemo(
    () => remainingUserOptions.filter((user) => searching && user.email.includes(searching)),
    [remainingUserOptions, searching],
  );

  const isDropdownVisible = !(displayingUserOptions.length === 0);

  useEffect(() => {
    if (!isDropdownVisible) {
      setFocusingIndex(0);
    }
  }, [isDropdownVisible]);

  const handleUserSelect = (id: string) => {
    setUserValueIds([...userValueIds, id]);
    setSearching('');
  };

  const handleEnterKey = () => {
    if (!searching || searching.length === 0) {
      onSubmit(userValues);
      return;
    }

    if (isDropdownVisible) {
      handleUserSelect(displayingUserOptions[focusingIndex]._id);
      return;
    }

    const invalidEmails: string[] = [];
    const detectedUserIds: string[] = [];

    searching.split(' ').forEach((email) => {
      const user = remainingUserOptions.find((remainingUser) => remainingUser.email === email);

      if (user) {
        detectedUserIds.push(user._id);
      } else {
        invalidEmails.push(email);
      }
    });

    setUserValueIds([...userValueIds, ...detectedUserIds]);
    setSearching(invalidEmails.join(' '));
  };

  const handleArrowKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' && isDropdownVisible) {
      setFocusingIndex(focusingIndex === displayingUserOptions.length - 1 ? 0 : focusingIndex + 1);
      return;
    }

    if (e.key === 'ArrowUp' && isDropdownVisible) {
      setFocusingIndex(focusingIndex === 0 ? displayingUserOptions.length - 1 : focusingIndex - 1);
      return;
    }
  };

  const inputMessage = `Add multiple ${isManagerInput ? 'managers' : 'users'} by separating them with a space.${
    isManagerInput ? ' To be a manager, they must be added as member first.' : ''
  }`;

  return (
    <div>
      <div className='mb-3 flex flex-col'>
        <div className='mb-2 flex items-start'>
          <div className='min-h-10 relative me-3 flex w-full flex-col rounded-lg border-[1px] border-[#7e7e7e4d] py-2 ps-3 focus-within:border-primary'>
            <UserValueList userValues={userValues} userValueIds={userValueIds} setUserValueIds={setUserValueIds} />
            <div className='flex'>
              <input
                onKeyDown={(e: KeyboardEvent) => {
                  if (e.key === 'Enter') handleEnterKey();
                  else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') handleArrowKey(e);
                }}
                value={searching ?? ''}
                className={'h-full flex-grow outline-none placeholder:text-royal-300'}
                autoFocus
                size={1}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setSearching(e.currentTarget.value);
                }}
              />
              <button onClick={onCancel} className='flex items-center'>
                <Image
                  src={closeIcon}
                  alt='close'
                  width={0}
                  height={0}
                  className='mx-[8px] me-[12px] h-auto w-auto rounded-full p-[4px] hover:cursor-pointer hover:bg-[#ccc] active:bg-[#ccc]'
                />
              </button>
            </div>
          </div>
          <Button className='whitespace-nowrap' onClick={() => onSubmit(userValues)}>
            <Image src={checkIcon} alt='check' width={0} height={0} className='' />
          </Button>
        </div>
        <div className='relative'>
          {isDropdownVisible && (
            <UserOptionList
              displayingUserOptions={displayingUserOptions}
              focusingIndex={focusingIndex}
              handleUserSelect={handleUserSelect}
            />
          )}
          <p className='italic text-primary'>{inputMessage}</p>
        </div>
      </div>
    </div>
  );
}
