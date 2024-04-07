import AuthType from '@/types/auth-type-enum';

const authHeaderContent = {
  login: [
    {
      title: 'Log In',
      subtitle: 'Do not have an account?',
      background: '/images/auth/background_1.png',
      sublinkAuthType: AuthType.SIGN_UP_INFO,
      sublinkText: 'Sign up',
    },
  ],
  'sign-up-info': [
    {
      title: 'Create your account',
      subtitle: 'Already have an account?',
      sublinkAuthType: AuthType.LOGIN,
      background: '/images/auth/background_2.png',
      sublinkText: 'Log in',
    },
  ],
  'sign-up': [
    {
      title: 'Create your account',
      subtitle: 'Already have an account?',
      sublinkAuthType: AuthType.LOGIN,
      background: '/images/auth/background_2.png',
      sublinkText: 'Log in',
    },
  ],
  'forgot-password': [
    {
      title: 'Forgot Password?',
      sublinkAuthType: AuthType.LOGIN,
      sublinkText: 'Return to Log in',
      background: '/images/auth/background_3.png',
    },
    {
      title: 'Verify your email',
      subtitle:
        'If we find a matching account, we will send you an verification code.',
      background: '/images/auth/background_3.png',
    },
    {
      title: 'Reset your password',
      subtitle: 'Create a new password for your account.',
      background: '/images/auth/background_3.png',
    },
  ],
};

export default authHeaderContent;
