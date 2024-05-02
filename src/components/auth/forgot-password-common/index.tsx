import { useState, useEffect } from 'react';

import ModalAlert from '@/components/modal-alert';
import { useAuthPasswordForm, useAuthRouter, useInputErrorText } from '@/hooks';
import { authService } from '@/services';
import AlertLevel from '@/types/alert-level-enum';
import AuthFormFieldEnum from '@/types/auth-form-field-enum';
import AuthType from '@/types/auth-type-enum';
import { VERIFICATION_CODE_LENGTH, isValidUsername } from '@/utils/auth';

import AuthForm from '../auth-form';

type ForgotPasswordCommonProps = {
  firstStep?: () => void;
  nextStep: () => void;
  username: string;
  setUsername: (username: string) => void;
};

export function ForgotPasswordCommon0(props: ForgotPasswordCommonProps) {
  const { nextStep, username, setUsername } = props;
  const [isNextStepAllowed, setIsNextStepAllowed] = useState(false);
  const { inputErrorTexts, setInputErrorText } = useInputErrorText(1);

  useEffect(() => {
    setInputErrorText(0, '');
    if (username !== '') setIsNextStepAllowed(true);
  }, [username, setInputErrorText]);

  return (
    <>
      <p className='mb-[20px] text-[14px] lg:mb-[24px] lg:text-[16px]'>
        Enter the email associated with your account and we will send an email
        with instructions to reset your password.
      </p>
      <AuthForm
        actionAllowed={isNextStepAllowed}
        actionText='Continue'
        initFields={[
          {
            label: 'Email',
            currentValue: username,
            onChange: (input) => setUsername(input),
          },
        ]}
        onAction={async () => {
          if (!isValidUsername(username)) {
            setInputErrorText(0, 'Please enter a valid email');
            setIsNextStepAllowed(false);
            return;
          }
          nextStep();
        }}
        errorTexts={inputErrorTexts}
      />
    </>
  );
}

export function ForgotPasswordCommon1(props: ForgotPasswordCommonProps) {
  const { username, nextStep, firstStep } = props;
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState<
    string | null
  >(null);

  const handleVerifyCode = () => {
    const isError = false; //TODO: apply api later

    if (isError) {
      setVerificationCodeError('Invalid verification code');
      return;
    }

    nextStep();
  };

  const clearForm = () => {
    setVerificationCode('');
  };

  return (
    <>
      <AuthForm
        actionText='Reset Your Password'
        initFields={[
          {
            label: 'Email',
            currentValue: username,
            fixedValue: true,
          },
          {
            label: 'Verification code',
            type: AuthFormFieldEnum.VERIFICATION_CODE,
            currentValue: verificationCode,
            onChange: (input) => setVerificationCode(input),
          },
        ]}
        subActionText='Change your email'
        onSubAction={firstStep}
        onAction={handleVerifyCode}
        actionAllowed={verificationCode.length === VERIFICATION_CODE_LENGTH}
      />
      {/* ALERT MODAL */}
      {verificationCodeError && (
        <ModalAlert
          title='Verification'
          description={`${verificationCodeError}. Please try again.`}
          onDismiss={() => setVerificationCodeError(null)}
          primaryActionButtonText='Try Again'
          onPrimaryAction={() => {
            clearForm();
            setVerificationCodeError(null);
          }}
          type={AlertLevel.ERROR}
        />
      )}
    </>
  );
}

export function ForgotPasswordCommon2(props: ForgotPasswordCommonProps) {
  const { username } = props;
  const [modalSuccessText, setModalSuccessText] = useState<string | null>(null);
  const authRouter = useAuthRouter();
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

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      handleDifferentConfirmPassword();
      return;
    }

    try {
      await authService.recoverPassword();
      setModalSuccessText('Your password has been successfully reset.');
    } catch (e: any) {
      setModalErrorText(e.message);
    }
  };

  return (
    <>
      <AuthForm
        actionText='Reset Password'
        initFields={[
          {
            label: 'Email',
            currentValue: username,
            fixedValue: true,
          },
          {
            label: 'Password',
            type: AuthFormFieldEnum.PASSWORD,
            currentValue: password,
            onChange: (input) => setPassword(input),
          },
          {
            label: 'Confirm your new password',
            type: AuthFormFieldEnum.PASSWORD,
            currentValue: confirmPassword,
            onChange: (input) => setConfirmPassword(input),
          },
        ]}
        errorTexts={inputErrorTexts}
        onAction={handleResetPassword}
        actionAllowed={isActionAllowed}
      />
      {/* ALERT MODAL */}
      {modalErrorText && (
        <ModalAlert
          title='Reset Password'
          description={`${modalErrorText}. Please try again.`}
          onDismiss={() => setModalErrorText(null)}
          secondaryActionButtonText='Dismiss'
          onSecondaryAction={() => {
            setModalErrorText(null);
          }}
          type={AlertLevel.ERROR}
        />
      )}
      {modalSuccessText && (
        <ModalAlert
          title='Reset Password'
          description={modalSuccessText}
          onDismiss={() => authRouter(AuthType.LOGIN)}
          primaryActionButtonText='Back to Log In'
          onPrimaryAction={() => {
            authRouter(AuthType.LOGIN);
          }}
          type={AlertLevel.SUCCESS}
        />
      )}
    </>
  );
}
