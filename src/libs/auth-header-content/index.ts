const authHeaderContent = {
  login: [
    {
      title: 'Log In',
      subtitle: 'Don\'t have an account?',
      background: '/images/auth/background_1.svg',
      sublinkAuthType: 'sign-up',
      sublinkText: 'Sign up',
    },
  ],
  'sign-up': [
    {
      title: 'Create your account',
      subtitle: 'Already have an account?',
      sublinkAuthType: 'login',
      background: '/images/auth/background_2.svg',
      sublinkText: 'Log in',
    },
    {
      title: 'Create your account',
      subtitle: 'Already have an account?',
      sublinkAuthType: 'login',
      background: '/images/auth/background_2.svg',
      sublinkText: 'Log in',
    },
  ],
  'forgot-password': [
    {
      title: 'Forgot Password?',
      sublinkAuthType: 'login',
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
