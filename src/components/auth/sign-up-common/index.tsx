import { useContext, useState, useEffect } from 'react';

import AuthContext from '@/contexts/authContext';
import useAuthRouter from '@/hooks/useAuthRouter';
import useInputErrorText from '@/hooks/useInputErrorText';
import { createPassword } from '@/libs/api/auth';
import meService from '@/services/me.service';
import AuthType from '@/types/auth-type-enum';
import { validatePassword } from '@/utils/auth';

import AuthForm from '../auth-form';

export default function SignUpCommon() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { login, meProfile } = useContext(AuthContext);
  const [email, setEmail] = useState(meProfile ? meProfile.email : null);
  const { inputErrorTexts, setInputErrorText } = useInputErrorText(3);
  const [isActionAllowed, setIsActionAllowed] = useState(false);

  const authRouter = useAuthRouter();

  useEffect(() => {
    (async () => {
      if (!email) {
        try {
          setEmail((await meService.getMe()).email);
        } catch (e: any) {
          console.log(e.message);
          authRouter(AuthType.SIGN_UP_INFO);
        }
      }
    })();
  }, [authRouter, email]);

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
      subActionAuthType={AuthType.BACK}
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
