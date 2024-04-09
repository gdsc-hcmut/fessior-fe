import { authHeaderContent } from '@/data/authHeaderContent';
import AuthType from '@/types/auth-type-enum';

import AuthModalHeading from '../auth-modal-heading';
import LoginCommon from '../login-common';

export default function LoginModalContent() {
  return (
    <>
      <AuthModalHeading {...authHeaderContent[AuthType.LOGIN][0]} />
      <LoginCommon />
    </>
  );
}
