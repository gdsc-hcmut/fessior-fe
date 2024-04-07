import { useState } from 'react';

import authHeaderContent from '@/libs/auth-header-content';
import AuthType from '@/types/auth-type-enum';

import AuthModalHeading from '../auth-modal-heading';
import {
  ForgotPasswordCommon0,
  ForgotPasswordCommon1,
  ForgotPasswordCommon2,
} from '../forgot-password-common';

export default function ForgotPasswordModalContent() {
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState('');
  return (
    <>
      <AuthModalHeading
        {...authHeaderContent[AuthType.FORGOT_PASSWORD][step]}
      />
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
    </>
  );
}
