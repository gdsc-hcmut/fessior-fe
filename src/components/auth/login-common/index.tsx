import { CredentialResponse } from '@react-oauth/google';
import { useState, useContext, useEffect } from 'react';

import AuthContext from '@/contexts/authContext';
import useAuthRouter from '@/hooks/useAuthRouter';
import useInputErrorText from '@/hooks/useInputErrorText';
import AuthType from '@/types/auth-type-enum';
import { isValidUsername } from '@/utils/auth';

import AuthForm from '../auth-form';
import CustomGoogleLogin from '../custom-google-login';

export default function LoginCommon() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { inputErrorTexts, setInputErrorText } = useInputErrorText(2);

  const authRouter = useAuthRouter();

  const { login } = useContext(AuthContext);

  const handleLoginWithUsername = async () => {
    let isProblem = false;

    if (username === '') {
      setInputErrorText(0, 'Please enter your email');
      isProblem = true;
    } else if (!isValidUsername(username)) {
      setInputErrorText(0, 'Please enter a valid email');
      isProblem = true;
    }

    if (password === '') {
      setInputErrorText(1, 'Please enter your password');
      isProblem = true;
    }

    if (isProblem) return;

    try {
      await login({ username, password });
      authRouter();
    } catch (e: any) {
      setInputErrorText(1, e.response.data.message);
    }
  };

  useEffect(() => {
    if (username !== '') setInputErrorText(0, '');
  }, [username, setInputErrorText]);

  useEffect(() => {
    if (password !== '') setInputErrorText(1, '');
  }, [password, setInputErrorText]);

  const handleLoginWithGoogle = async (
    credentialResponse: CredentialResponse,
  ) => {
    if (credentialResponse.credential) {
      try {
        const response = await login({
          token: credentialResponse.credential,
        });
        if (response.hasPassword) {
          authRouter();
        } else {
          authRouter(AuthType.SIGN_UP, true);
        }
      } catch (e: any) {
        console.log(e.message);
      }
    }
  };

  return (
    <>
      <div className='flex py-[24px]'>
        <CustomGoogleLogin onSuccess={handleLoginWithGoogle} />
      </div>
      <div className='mb-[16px] flex items-center'>
        <hr className='flex-grow bg-[#B3B3B3]' />
        <p className='px-[8px] text-primary'>OR</p>
        <hr className='flex-grow bg-[#B3B3B3]' />
      </div>
      <AuthForm
        isLogin
        subActionAuthType={AuthType.FORGOT_PASSWORD}
        subActionText='Forgot your password?'
        initFields={[
          {
            label: 'Email',
            currentValue: username,
            onChange: (input: string) => {
              setUsername(input);
            },
          },
          {
            label: 'Password',
            isPassword: true,
            currentValue: password,
            onChange: (input: string) => {
              setPassword(input);
            },
          },
        ]}
        onAction={handleLoginWithUsername}
        actionText='Log In'
        errorTexts={inputErrorTexts}
      />
    </>
  );
}
