'use client';

import { useState } from 'react';

import {
  ForgotPasswordCommon0,
  ForgotPasswordCommon1,
  ForgotPasswordCommon2,
} from '@/components/auth';
import { AuthHeader } from '@/components/auth-sm';
import authHeaderContent from '@/libs/auth-header-content';
import AuthType from '@/types/auth-type-enum';

export default function ForgotPassword() {
  const [authStep, setAuthStep] = useState(0);

  return (
    <div className='flex h-screen flex-col'>
      <AuthHeader {...authHeaderContent[AuthType.FORGOT_PASSWORD][authStep]} />
      <div className='mt-[28px] flex flex-grow flex-col items-stretch px-[20px]'>
        {authStep === 0 && (
          <ForgotPasswordCommon0 nextStep={() => setAuthStep(authStep + 1)} />
        )}
        {authStep === 1 && (
          <ForgotPasswordCommon1 nextStep={() => setAuthStep(authStep + 1)} />
        )}
        {authStep === 2 && <ForgotPasswordCommon2 />}
      </div>
    </div>
  );
}
