import { useContext, useState, useEffect } from 'react';

import ModalAlert from '@/components/modal-alert';
import AuthContext from '@/contexts/authContext';
import AuthFormContext from '@/contexts/authFormContext';
import useAuthRouter from '@/hooks/useAuthRouter';
import useInputErrorText from '@/hooks/useInputErrorText';
import { createPassword } from '@/libs/api/auth';
import meService from '@/services/me.service';
import AlertLevel from '@/types/alert-level-enum';
import AuthType from '@/types/auth-type-enum';
import { validatePassword } from '@/utils/auth';

import AuthForm from '../auth-form';

export default function SignUpCommon() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUpAllowed, setIsSignUpAllowed] = useState(false);
  const [signUpErrorText, setSignUpErrorText] = useState<string | null>(null);
  const { setIsAuthErrorModalVisible } = useContext(AuthFormContext);

  const { login, meProfile } = useContext(AuthContext);
  const [email, setEmail] = useState(meProfile ? meProfile.email : null);

  const { inputErrorTexts, setInputErrorText } = useInputErrorText(3);

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
    if (!validatePassword(3, password).includes(false))
      setIsSignUpAllowed(true);
    else setIsSignUpAllowed(false);
  }, [password, confirmPassword, setInputErrorText]);

  useEffect(() => {
    setInputErrorText(2, '');
  }, [confirmPassword, setInputErrorText]);

  useEffect(() => {
    setIsAuthErrorModalVisible(!!signUpErrorText);
  }, [signUpErrorText]);

  if (!email) return;

  const handleSignUp = async () => {
    if (!isSignUpAllowed) return;

    if (password !== confirmPassword) {
      setInputErrorText(2, 'Password does not match');
      setIsSignUpAllowed(false);
      return;
    }

    try {
      await createPassword(password);
      await login({ username: email, password });
      authRouter();
    } catch (e: any) {
      setSignUpErrorText(e.message);
    }
  };

  return (
    <>
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
        onAction={handleSignUp}
        errorTexts={inputErrorTexts}
        actionAllowed={isSignUpAllowed}
      />
      {/* ALERT MODAL */}
      {signUpErrorText && (
        <ModalAlert
          title='Log In'
          description={`${signUpErrorText}. Please try again.`}
          onDismiss={() => setSignUpErrorText(null)}
          secondaryActionButtonText='Dismiss'
          onSecondaryAction={() => {
            setSignUpErrorText(null);
          }}
          type={AlertLevel.ERROR}
        />
      )}
    </>
  );
}
