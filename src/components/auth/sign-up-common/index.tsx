import { useContext, useState, useEffect } from 'react';

import ModalAlert from '@/components/modal-alert';
import AuthContext from '@/contexts/authContext';
import { useAuthPasswordForm, useAuthRouter } from '@/hooks';
import { authService } from '@/services';

import AuthForm from '../auth-form';

import { AuthFormFieldEnum } from '@/types';
import AlertLevel from '@/types/alert-level-enum';

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
  const { meProfile, isAuthStatusReady } = useContext(AuthContext);
  const [username, setUsername] = useState<string | null>(null);

  const authRouter = useAuthRouter();

  useEffect(() => {
    if (isAuthStatusReady && meProfile) {
      setUsername(meProfile.email);
    }
  }, [isAuthStatusReady, meProfile]);

  if (!username) return;

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      handleDifferentConfirmPassword();
      return;
    }

    try {
      await authService.createPassword(password);
      authRouter();
    } catch (e: any) {
      setModalErrorText(e.response.data.message);
    }
  };

  return (
    <>
      <AuthForm
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
        isActionAllowed={isActionAllowed}
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
