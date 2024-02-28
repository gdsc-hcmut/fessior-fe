import AuthType from '@/types/auth-type-enum';

import ForgotPasswordModalContent from '../forgot-password-modal-content';
import LoginModalContent from '../login-modal-content';
import SignUpModalContent from '../sign-up-modal-content';

export default function AuthModalContentProvider({
  authType,
}: {
  authType: string;
}) {
  if (authType === AuthType.LOGIN) return <LoginModalContent />;
  if (authType === AuthType.SIGN_UP) return <SignUpModalContent />;
  if (authType === AuthType.FORGOT_PASSWORD)
    return <ForgotPasswordModalContent />;
}
