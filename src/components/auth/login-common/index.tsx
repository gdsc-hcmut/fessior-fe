import { CredentialResponse } from '@react-oauth/google';
import { useState, useContext, useEffect } from 'react';

import ModalAlert from '@/components/modal-alert';
import AuthContext from '@/contexts/authContext';
import AuthFormContext from '@/contexts/authFormContext';
import { useAuthRouter, useInputErrorText } from '@/hooks';
import { isValidUsername } from '@/utils/auth';

import AuthForm from '../auth-form';
import CustomGoogleLogin from '../custom-google-login';

import { AuthFormFieldEnum, AlertLevel } from '@/types';
import AuthType from '@/types/auth-type-enum';

export default function LoginCommon() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginAllowed, setIsLoginAllowed] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState<string | null>(null);

  const { login } = useContext(AuthContext);
  const { setIsAuthErrorModalVisible } = useContext(AuthFormContext);

  const { inputErrorTexts, setInputErrorText } = useInputErrorText(2);

  const authRouter = useAuthRouter();

  useEffect(() => {
    setIsAuthErrorModalVisible(!!loginErrorText);
  }, [loginErrorText, setIsAuthErrorModalVisible]);

  useEffect(() => {
    if (username !== '' && password !== '') setIsLoginAllowed(true);
    else setIsLoginAllowed(false);
  }, [username, password]);

  useEffect(() => {
    setInputErrorText(0, '');
  }, [username, setInputErrorText]);

  const handleLoginWithUsername = async () => {
    if (!isValidUsername(username)) {
      setInputErrorText(0, 'Please enter a valid email');
      setIsLoginAllowed(false);
      return;
    }

    try {
      await login({ username, password });
      authRouter();
    } catch (e: any) {
      setLoginErrorText(e.response.data.message);
    }
  };

  const handleLoginWithGoogle = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        const response = await login({
          token: credentialResponse.credential,
        });
        if (response.isFirstLogin) {
          authRouter(AuthType.SIGN_UP, true);
        } else {
          authRouter();
        }
      } catch (e: any) {
        setLoginErrorText(e.message);
      }
    }
  };

  const clearForm = () => {
    setUsername('');
    setPassword('');
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
            type: AuthFormFieldEnum.PASSWORD,
            currentValue: password,
            onChange: (input: string) => {
              setPassword(input);
            },
          },
        ]}
        onAction={handleLoginWithUsername}
        isActionAllowed={isLoginAllowed}
        actionText='Log In'
        errorTexts={inputErrorTexts}
      />
      {/* ALERT MODAL */}
      {loginErrorText && (
        <ModalAlert
          title='Log In'
          description={`${loginErrorText}. Please try again.`}
          onDismiss={() => setLoginErrorText(null)}
          primaryActionButtonText='Try Again'
          onPrimaryAction={() => {
            clearForm();
            setLoginErrorText(null);
          }}
          type={AlertLevel.ERROR}
        />
      )}
    </>
  );
}
