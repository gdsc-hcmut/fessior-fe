import Image from 'next/image';
import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';

import Button from '@/components/button';
import User from '@/types/user-type';

import checkIcon from '../src/assets/check.svg';
import closeIcon from '../src/assets/close.svg';

import UserOption from './UserOption';
import UserValue from './UserValue';

type UserInputProps = {
  userOptions: User[];
  isManagerInput?: boolean;
  onSubmit: (users: User[]) => void;
  onCancel: () => void;
};

export default function UserInput(props: UserInputProps) {
  const { userOptions, isManagerInput, onSubmit, onCancel } = props;

  const [searching, setSearching] = useState<string | null>(null);
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
    () =>
      remainingUserOptions.filter(
        (user) => searching && user.email.includes(searching),
      ),
    [remainingUserOptions, searching],
  );

  const isDropdownVisible = !(displayingUserOptions.length === 0);

  useEffect(() => {
    if (!isDropdownVisible) setFocusingIndex(0);
  }, [isDropdownVisible]);

  const handleUserSelect = (id: string) => {
    setUserValueIds([...userValueIds, id]);
    setSearching(null);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!searching || searching.length === 0) {
        console.log(userValues);
        onSubmit(userValues);
        return;
      }

      if (isDropdownVisible) {
        handleUserSelect(displayingUserOptions[focusingIndex]._id);
        return;
      }

      const searchingEmails = searching.split(' ');
      const invalidEmails: string[] = [];
      const detectedUserIds: string[] = [];

      searchingEmails.forEach((email) => {
        const user = remainingUserOptions.find((user) => user.email === email);

        if (user) {
          detectedUserIds.push(user._id);
        } else {
          invalidEmails.push(email);
        }
      });

      setUserValueIds([...userValueIds, ...detectedUserIds]);
      setSearching(invalidEmails.join(' '));
      return;
    }

    if (e.key === 'ArrowDown' && isDropdownVisible) {
      setFocusingIndex(
        focusingIndex === displayingUserOptions.length - 1
          ? 0
          : focusingIndex + 1,
      );
      return;
    }

    if (e.key === 'ArrowUp' && isDropdownVisible) {
      setFocusingIndex(
        focusingIndex === 0
          ? displayingUserOptions.length - 1
          : focusingIndex - 1,
      );
      return;
    }
  };

  return (
    <div>
      <div className='mb-3 flex flex-col'>
        <div className='mb-2 flex items-start'>
          <div className='min-h-10 relative me-3 flex w-full flex-col rounded-lg border-[1px] border-[#7e7e7e4d] py-2 ps-3 focus-within:border-primary'>
            <div className='flex flex-wrap items-center'>
              {userValues.map((user) => (
                <UserValue
                  {...user}
                  key={user._id}
                  pictureSrc={user.picture}
                  onRemove={() => {
                    setUserValueIds(
                      userValueIds.filter((id) => id !== user._id),
                    );
                  }}
                />
              ))}
            </div>
            <div className='flex'>
              <input
                onKeyDown={handleKeyDown}
                value={searching ?? ''}
                className={
                  'h-full flex-grow outline-none placeholder:text-royal-300'
                }
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
          <Button
            className='whitespace-nowrap'
            onClick={() => onSubmit(userValues)}
          >
            <Image
              src={checkIcon}
              alt='check'
              width={0}
              height={0}
              className=''
            />
          </Button>
        </div>
        <div className='relative'>
          {isDropdownVisible && (
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
          )}
          <p className='italic text-primary'>{`Add multiple ${
            isManagerInput ? 'managers' : 'users'
          } by separating them with a space.${
            isManagerInput
              ? ' To be a manager, they must be added as member first.'
              : ''
          }`}</p>
        </div>
      </div>
    </div>
  );
}
