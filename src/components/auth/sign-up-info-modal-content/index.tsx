import authHeaderContent from '@/libs/auth-header-content';
import AuthType from '@/types/auth-type-enum';

import AuthModalHeading from '../auth-modal-heading';
import SignUpInfoCommon from '../sign-up-info-common';

export default function SignUpModalContent() {
  return (
    <>
      <AuthModalHeading {...authHeaderContent[AuthType.SIGN_UP][0]} />
      <SignUpInfoCommon />
    </>
  );
}
