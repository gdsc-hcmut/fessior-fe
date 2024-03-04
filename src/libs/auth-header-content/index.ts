import AuthType from '@/types/auth-type-enum';

const authHeaderContent = {
  login: [
    {
      title: 'Log In',
      subtitle: 'Do not have an account?',
      background: '/images/auth/background_1.svg',
      sublinkAuthType: AuthType.SIGN_UP_INFO,
      sublinkText: 'Sign up',
    },
  ],
  'sign-up-info': [
    {
      title: 'Create your account',
      subtitle: 'Already have an account?',
      sublinkAuthType: AuthType.LOGIN,
      background: '/images/auth/background_2.svg',
      sublinkText: 'Log in',
    },
  ],
  'sign-up': [
    {
      title: 'Create your account',
      subtitle: 'Already have an account?',
      sublinkAuthType: AuthType.LOGIN,
      background: '/images/auth/background_2.svg',
      sublinkText: 'Log in',
    },
  ],
  'forgot-password': [
    {
      title: 'Forgot Password?',
      sublinkAuthType: AuthType.LOGIN,
      sublinkText: 'Return to Log in',
      background: '/images/auth/background_3.svg',
    },
    {
      title: 'Reset your password',
      subtitle: 'Create a new password for your account',
      background: '/images/auth/background_3.svg',
    },
    {
      title: 'Check your email',
      subtitle: 'Verify your account to reset password',
      background: '/images/auth/background_3.svg',
    },
  ],
};

export default authHeaderContent;
