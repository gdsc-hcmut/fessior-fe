import AuthType from '@/types/auth-type-enum';

import ForgotPasswordModalContent from '../forgot-password-modal-content';
import LoginModalContent from '../login-modal-content';
import SignUpInfoModalContent from '../sign-up-info-modal-content';
import SignUpModalContent from '../sign-up-modal-content';

type AuthModalContentProviderProps = {
  authType: AuthType;
};

export default function AuthModalContentProvider(
  props: AuthModalContentProviderProps,
) {
  const { authType } = props;

  if (authType === AuthType.LOGIN) return <LoginModalContent />;
  if (authType === AuthType.SIGN_UP) return <SignUpModalContent />;
  if (authType === AuthType.SIGN_UP_INFO) return <SignUpInfoModalContent />;
  if (authType === AuthType.FORGOT_PASSWORD)
    return <ForgotPasswordModalContent />;
}
