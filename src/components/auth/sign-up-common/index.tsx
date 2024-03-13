import { useContext, useState, useEffect } from 'react';

import ModalAlert from '@/components/modal-alert';
import AuthContext from '@/contexts/authContext';
import useAuthPasswordForm from '@/hooks/useAuthPasswordForm';
import useAuthRouter from '@/hooks/useAuthRouter';
import { createPassword } from '@/libs/api/auth';
import meService from '@/services/me.service';
import AlertLevel from '@/types/alert-level-enum';
import AuthFormFieldEnum from '@/types/auth-form-field-enum';
import AuthType from '@/types/auth-type-enum';

import AuthForm from '../auth-form';

export default function SignUpCommon() {
  const {
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    isActionAllowed,
    modalErrorText,
    setModalErrorText,
    inputErrorTexts,
    handleDifferentConfirmPassword,
  } = useAuthPasswordForm();
  const { login, meProfile } = useContext(AuthContext);
  const [username, setUsername] = useState(meProfile ? meProfile.email : null);

  const authRouter = useAuthRouter();

  useEffect(() => {
    (async () => {
      if (!username) {
        try {
          setUsername((await meService.getMe()).email);
        } catch (e: any) {
          console.log(e.message);
          authRouter(AuthType.SIGN_UP_INFO);
        }
      }
    })();
  }, [authRouter, username]);

  if (!username) return;

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      handleDifferentConfirmPassword();
      return;
    }

    try {
      await createPassword(password);
      await login({ username: username, password });
      authRouter();
    } catch (e: any) {
      setModalErrorText(e.message);
    }
  };

  return (
    <>
      <AuthForm
        subActionAuthType={AuthType.BACK}
        subActionText='Change Google account'
        actionText='Sign Up'
        initFields={[
          { label: 'Email', fixedValue: true, currentValue: username },
          {
            label: 'Password',
            type: AuthFormFieldEnum.PASSWORD,
            currentValue: password,
            onChange: (input) => setPassword(input),
          },
          {
            label: 'Confirm your password',
            type: AuthFormFieldEnum.PASSWORD,
            currentValue: confirmPassword,
            onChange: (input) => setConfirmPassword(input),
          },
        ]}
        onAction={handleSignUp}
        errorTexts={inputErrorTexts}
        actionAllowed={isActionAllowed}
      />
      {/* ALERT MODAL */}
      {modalErrorText && (
        <ModalAlert
          title='Sign Up'
          description={`${modalErrorText}. Please try again.`}
          onDismiss={() => setModalErrorText(null)}
          secondaryActionButtonText='Dismiss'
          onSecondaryAction={() => {
            setModalErrorText(null);
          }}
          type={AlertLevel.ERROR}
        />
      )}
    </>
  );
}
