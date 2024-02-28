import { useState } from 'react';

import authHeaderContent from '@/libs/auth-header-content';
import AuthType from '@/types/auth-type-enum';

import { AuthModalHeading } from '../auth-modal-heading';
import {
  CheckEmailIcon,
  ForgotPasswordCommon0,
  ForgotPasswordCommon1,
  ForgotPasswordCommon2,
} from '../forgot-password-common';

export default function ForgotPasswordModalContent() {
  const [step, setStep] = useState(0);
  return (
    <>
      {step === 2 ? (
        <div className='flex items-center md:mb-[24px] lg:mb-[28px]'>
          <CheckEmailIcon />
          <AuthModalHeading
            {...authHeaderContent[AuthType.FORGOT_PASSWORD][2]}
            subtitle=''
            className='ms-[8px] inline-flex flex-col justify-center'
          />
        </div>
      ) : (
        <AuthModalHeading
          {...authHeaderContent[AuthType.FORGOT_PASSWORD][step]}
        />
      )}
      {step === 0 && (
        <ForgotPasswordCommon0 nextStep={() => setStep(step + 1)} />
      )}
      {step === 1 && (
        <ForgotPasswordCommon1 nextStep={() => setStep(step + 1)} />
      )}
      {step === 2 && <ForgotPasswordCommon2 />}
    </>
  );
}
