'use client';

import AuthHeader from '@/components/auth/auth-header';
import SignUpInfoCommon from '@/components/auth/sign-up-info-common';
import { authHeaderContent } from '@/data/authHeaderContent';
import AuthType from '@/types/auth-type-enum';

export default function SignUp() {
  return (
    <div className='flex h-screen flex-col'>
      <AuthHeader {...authHeaderContent[AuthType.SIGN_UP][0]} />
      <div className='mt-[28px] flex flex-grow flex-col items-stretch px-[20px]'>
        <SignUpInfoCommon />
      </div>
    </div>
  );
}
