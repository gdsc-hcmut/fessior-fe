import { useState } from 'react';

import authHeaderContent from '@/libs/auth-header-content';
import AuthType from '@/types/auth-type-enum';

import { AuthModalHeading } from '../auth-modal-heading';
import { SignUpCommon0, SignUpCommon1 } from '../sign-up-common';

export default function SignUpModalContent() {
  const [step, setStep] = useState(0);
  return (
    <>
      <AuthModalHeading {...authHeaderContent[AuthType.SIGN_UP][step]} />
      {step === 0 && <SignUpCommon0 nextStep={() => setStep(step + 1)} />}
      {step === 1 && <SignUpCommon1 />}
    </>
  );
}
