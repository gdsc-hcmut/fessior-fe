'use client';

import { useSearchParams } from 'next/navigation';

import AuthHeader from '@/components/auth/auth-header';
import SignUpCommon from '@/components/auth/sign-up-common';
import { authHeaderContent } from '@/data/authHeaderContent';
import AuthType from '@/types/auth-type-enum';

export default function SignUp() {
  const isDirectedFromLogin = !!useSearchParams().get('from_login');

  return (
    <div className='flex h-screen flex-col'>
      <AuthHeader
        {...authHeaderContent[AuthType.SIGN_UP][0]}
        subtitle={
          isDirectedFromLogin
            ? 'Set a password for your initial login with Google.'
            : authHeaderContent[AuthType.SIGN_UP][0].subtitle
        }
        sublinkText={
          isDirectedFromLogin
            ? undefined
            : authHeaderContent[AuthType.SIGN_UP][0].sublinkText
        }
      />
      <div className='flex flex-grow flex-col items-stretch px-[20px] py-[28px]'>
        <SignUpCommon />
      </div>
    </div>
  );
}
