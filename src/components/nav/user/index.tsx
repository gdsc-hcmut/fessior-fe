/* eslint-disable */

import clsx from 'clsx';
import Image from 'next/image';
import { useState, useRef, useContext } from 'react';

import AuthContext from '@/contexts/authContext';
import { useOnClickOutside, useScreenSize } from '@/hooks';
import { getIcon } from '@/utils/common';

import { Icon } from '@/types';
import ScreenSize from '@/types/screen-size-enum';

type UserProps = {
  border?: boolean;
  className?: string;
  whiteTheme?: boolean;
  isOptionDropdown?: boolean;
};

export default function User(props: UserProps) {
  const { border, className, whiteTheme, isOptionDropdown } = props;

  const [showingOption, setShowingOption] = useState(false);
  const { screenSize } = useScreenSize();
  const optionRef = useRef(null);

  const { logout, meProfile } = useContext(AuthContext);

  useOnClickOutside(optionRef, () => setShowingOption(false));

  const handleUserClick = () => {
    if (isOptionDropdown) setShowingOption(!showingOption);
  };

  const userClass = clsx(
    border && (whiteTheme ? 'border-[1px] border-white' : 'border-[1px] border-primary'),
    'relative flex items-center rounded-full hover:cursor-pointer lg:min-w-[170px] md:min-w-[145px]',
    className,
  );

  const usernameClass = clsx(
    whiteTheme && 'text-white',
    'my-[2px] md:me-[20px] lg:me-[16px] ms-[12px] md:ms-[8px] flex flex-col justify-between',
  );

  const optionClass = clsx(
    'absolute z-10 left-0 top-[52px] mt-[8px] w-[172px] overflow-hidden whitespace-nowrap rounded-[8px] bg-white duration-500 transition-[max-height,border]',
    showingOption ? 'max-h-[88px] border-[1px]' : 'max-h-0 border-white',
  );

  const userAvatar =
    meProfile && meProfile.picture
      ? meProfile.picture
      : whiteTheme
      ? '/icons/header/user_white.svg'
      : '/icons/header/user_royal.svg';

  const collapseIcon = getIcon(
    '/icons/header/',
    whiteTheme ? 'collapse_white.svg' : 'collapse_grey.svg',
    showingOption ? Icon.ACTIVE : Icon.INACTIVE,
  );

  const avatarSize =
    screenSize === ScreenSize.SM ? 52 : screenSize === ScreenSize.MD ? 42 : screenSize === ScreenSize.LG ? 52 : 0;

  return (
    <div ref={optionRef} onClick={handleUserClick} className={userClass}>
      <Image
        src={userAvatar}
        alt=''
        width={avatarSize}
        height={avatarSize}
        className='aspect-square h-[52px] w-auto rounded-full md:h-[42px] lg:h-[48px]'
      />
      <div className={usernameClass}>
        <p className='mb-[-4px] text-[12px] tracking-[0.24px]'>Welcome</p>
        <h6 className='text-[20px] font-[500] tracking-[0.4px] md:text-[16px] md:tracking-[0.32px] lg:text-[16px]'>
          {meProfile?.firstName}
        </h6>
      </div>
      <div className='flex-grow'></div>
      {isOptionDropdown && (
        <>
          <Image src={collapseIcon} alt='' width={0} height={0} className='me-[12px] h-[100%] w-auto' />

          <ul className={optionClass}>
            <li
              onClick={() => {}}
              className='flex h-[44px] cursor-pointer items-center px-[12px] transition-all hover:bg-royal-300/[.1] hover:text-primary focus:bg-primary'
            >
              <Image
                src='/icons/header/user_profile.svg'
                alt=''
                width={0}
                height={0}
                className='me-[16px] h-[24px] w-auto'
              />
              <p className='font-[500]'>User Profile</p>
            </li>
            <li
              onClick={logout}
              className='flex h-[44px] cursor-pointer items-center px-[12px] text-red transition-all hover:bg-red/[.1] focus:bg-primary'
            >
              <Image src='/icons/header/logout.svg' alt='' width={0} height={0} className='me-[16px] h-[24px] w-auto' />
              <p className='font-[500]'>Log out</p>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
