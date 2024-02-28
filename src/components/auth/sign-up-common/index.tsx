import { CredentialResponse } from '@react-oauth/google';
import { useContext, useState, useEffect } from 'react';

import AuthContext from '@/contexts/authContext';
import useAuthRouter from '@/hooks/useAuthRouter';
import useInputErrorText from '@/hooks/useInputErrorText';
import { createPassword } from '@/libs/api/auth';
import meService from '@/services/me.service';
import { validatePassword } from '@/utils/auth';

import AuthForm from '../auth-form';
import CustomGoogleLogin from '../custom-google-login';

export function SignUpCommon0({ nextStep }: { nextStep: () => void }) {
  const { login } = useContext(AuthContext);
  const authRouter = useAuthRouter();

  const handleSignUpWithGoogle = async (
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
          nextStep();
        }
      } catch (e: any) {
        console.log(e.message);
      }
    }
  };

  return (
    <>
      <p className='mb-[8px] font-[600]'>
        Create an account in just a few steps!
      </p>
      <ul className='mb-[40px] list-inside list-disc lg:mb-[60px]'>
        <li className='text-[14px] leading-relaxed'>
          <span className='relative left-[-8px]'>
            Log in with your Google account
          </span>
        </li>
        <li className='text-[14px] leading-relaxed'>
          <span className='relative left-[-8px]'>
            Once logged in, your account email will be automatically set as your
            username
          </span>
        </li>
        <li className='text-[14px] leading-relaxed'>
          <span className='relative left-[-8px]'>
            Complete the process by entering the password you want to create
          </span>
        </li>
      </ul>
      <CustomGoogleLogin onSuccess={handleSignUpWithGoogle} />
    </>
  );
}

export function SignUpCommon1() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { login, meProfile } = useContext(AuthContext);
  const [email, setEmail] = useState(meProfile?.email);
  const { inputErrorTexts, setInputErrorText } = useInputErrorText(3);
  const [isActionAllowed, setIsActionAllowed] = useState(false);

  const authRouter = useAuthRouter();

  useEffect(() => {
    (async () => {
      if (!meProfile?.email) {
        setEmail((await meService.getMe()).email);
      }
    })();
  }, [meProfile?.email]);

  useEffect(() => {
    if (confirmPassword !== '' && password !== confirmPassword) {
      setInputErrorText(2, 'Password does not match');
    } else {
      setInputErrorText(2, '');
    }

    if (
      password === confirmPassword &&
      !validatePassword(3, password).includes(false)
    ) {
      setIsActionAllowed(true);
    } else {
      setIsActionAllowed(false);
    }
  }, [password, confirmPassword, setInputErrorText]);

  if (!email) return;

  return (
    <AuthForm
      subActionAuthType=''
      subActionText='Change Google account'
      actionText='Sign Up'
      initFields={[
        { label: 'Email', fixedValue: true, currentValue: email },
        {
          label: 'Password',
          isPassword: true,
          currentValue: password,
          onChange: (input) => setPassword(input),
        },
        {
          label: 'Confirm your password',
          isPassword: true,
          currentValue: confirmPassword,
          onChange: (input) => setConfirmPassword(input),
        },
      ]}
      onAction={async () => {
        const validation = password === confirmPassword;
        if (validation) {
          try {
            await createPassword(password);
            await login({ username: email, password });
            authRouter();
          } catch (e: any) {
            console.log(e.message);
          }
        } else {
          console.log('PASSWORD NOT GOOD');
        }
      }}
      errorTexts={inputErrorTexts}
      actionAllowed={isActionAllowed}
    />
  );
}
