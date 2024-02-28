'use client';

import { useState } from 'react';

import { AuthHeader } from '@/components/auth/auth-header';
import { SignUpCommon0, SignUpCommon1 } from '@/components/auth/sign-up-common';
import authHeaderContent from '@/libs/auth-header-content';
import AuthType from '@/types/auth-type-enum';

export default function SignUp() {
  const [authStep, setAuthStep] = useState(0);
  return (
    <div className='flex h-screen flex-col'>
      <AuthHeader {...authHeaderContent[AuthType.SIGN_UP][authStep]} />
      <div className='mt-[28px] flex flex-grow flex-col items-stretch px-[20px]'>
        {authStep === 0 && (
          <SignUpCommon0 nextStep={() => setAuthStep(authStep + 1)} />
        )}
        {authStep === 1 && <SignUpCommon1 />}
      </div>
    </div>
  );
}
