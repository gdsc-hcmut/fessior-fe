'use client';

import { useState } from 'react';

import AuthHeader from '@/components/auth/auth-header';
import {
  ForgotPasswordCommon0,
  ForgotPasswordCommon1,
  ForgotPasswordCommon2,
} from '@/components/auth/forgot-password-common';
import { authHeaderContent } from '@/data/authHeaderContent';
import AuthType from '@/types/auth-type-enum';

export default function ForgotPassword() {
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState('');

  return (
    <div className='flex h-screen flex-col'>
      <AuthHeader {...authHeaderContent[AuthType.FORGOT_PASSWORD][step]} />
      <div className='flex flex-grow flex-col items-stretch px-[20px] py-[28px]'>
        {step === 0 && (
          <ForgotPasswordCommon0
            username={username}
            setUsername={setUsername}
            nextStep={() => setStep(step + 1)}
          />
        )}
        {step === 1 && (
          <ForgotPasswordCommon1
            setUsername={setUsername}
            firstStep={() => {
              setStep(0);
              setUsername('');
            }}
            nextStep={() => setStep(step + 1)}
            username={username}
          />
        )}
        {step === 2 && (
          <ForgotPasswordCommon2
            username={username}
            setUsername={setUsername}
            nextStep={() => setStep(step + 1)}
          />
        )}
      </div>
    </div>
  );
}
