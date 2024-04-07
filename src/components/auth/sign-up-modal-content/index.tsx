import { useSearchParams } from 'next/navigation';

import authHeaderContent from '@/libs/auth-header-content';
import AuthType from '@/types/auth-type-enum';

import AuthModalHeading from '../auth-modal-heading';
import SignUpCommon from '../sign-up-common';

export default function SignUpModalContent() {
  const isDirectedFromLogin = !!useSearchParams().get('from_login');

  return (
    <>
      <AuthModalHeading
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
      <SignUpCommon />
    </>
  );
}
