'use client';

import { useState } from 'react';

import AuthHeader from '@/components/auth/auth-header';
import {
  ForgotPasswordCommon0,
  ForgotPasswordCommon1,
  ForgotPasswordCommon2,
} from '@/components/auth/forgot-password-common';
import authHeaderContent from '@/libs/auth-header-content';
import AuthType from '@/types/auth-type-enum';

export default function ForgotPassword() {
  const [authStep, setAuthStep] = useState(0);

  return (
    <div className='flex h-screen flex-col'>
      <AuthHeader {...authHeaderContent[AuthType.FORGOT_PASSWORD][authStep]} />
      <div className='flex flex-grow flex-col items-stretch px-[20px] py-[28px]'>
        {authStep === 0 && (
          <ForgotPasswordCommon0 nextStep={() => setAuthStep(authStep + 1)} />
        )}
        {authStep === 1 && (
          <ForgotPasswordCommon1 nextStep={() => setAuthStep(authStep + 1)} />
        )}
        {authStep === 2 && (
          <ForgotPasswordCommon2 firstStep={() => setAuthStep(0)} />
        )}
      </div>
    </div>
  );
}
