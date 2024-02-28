import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import useInputErrorText from '@/hooks/useInputErrorText';
import useScreenSize from '@/hooks/useScreenSize';
import { recoverPassword } from '@/libs/api/auth';
import ScreenSize from '@/types/screen-size-enum';
import { isValidUsername } from '@/utils/auth';

import AuthForm from '../auth-form';

type ForgotPasswordCommonProps = {
  nextStep: () => void;
};

export function ForgotPasswordCommon0(props: ForgotPasswordCommonProps) {
  const { nextStep } = props;
  const [username, setUsername] = useState('');
  const { inputErrorTexts, setInputErrorText } = useInputErrorText(1);

  useEffect(() => {
    setInputErrorText(0, '');
  }, [username, setInputErrorText]);

  return (
    <>
      <p className='mb-[20px] text-[14px] lg:mb-[24px] lg:text-[16px]'>
        Enter the email associated with your account and we will send an email
        with instructions to reset your password.
      </p>
      <AuthForm
        actionText='Reset Password'
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
  const { nextStep } = props;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <AuthForm
      actionText='Reset Password'
      initFields={[
        {
          label: 'Password',
          isPassword: true,
          currentValue: password,
          onChange: (input) => setPassword(input),
        },
        {
          label: 'Confirm your new password',
          isPassword: true,
          currentValue: confirmPassword,
          onChange: (input) => setConfirmPassword(input),
        },
      ]}
      onAction={async () => {
        const validation = password === confirmPassword;
        if (validation) {
          try {
            await recoverPassword();
            nextStep();
          } catch (e: any) {
            console.log(e.message);
          }
        } else {
          console.log('PASSWORD NOT GOOD');
        }
      }}
    />
  );
}

export function CheckEmailIcon({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'aspect-square w-[52px] rounded-[8px] border-[0.5px] border-primary p-[6px] shadow-[0px_4px_12px_0px_rgba(11,40,120,0.16)]',
        className,
      )}
    >
      <Image
        src='/icons/auth/check_email.svg'
        alt='check-email'
        width={0}
        height={0}
        className='h-[100%] w-auto'
      />
    </div>
  );
}

type ForgotPasswordCommon2Props = {
  firstStep: () => void;
};

//Cho nay khong co duong ve?
export function ForgotPasswordCommon2(props: ForgotPasswordCommon2Props) {
  const { firstStep } = props;
  const { screenSize } = useScreenSize();

  return (
    <>
      {screenSize === ScreenSize.SM && <CheckEmailIcon className='mb-[12px]' />}
      <p className='mb-[20px] font-[500] text-primary md:text-[14px] lg:text-[16px]'>
        If we find a matching account, we will send you an email with password
        recovery instructions.
      </p>
      <div>
        <p className='text-[14px] font-[500]'>
          Did not receive an email? <br />
          Check your spam folder or{' '}
          <span onClick={firstStep} className='text-primary underline'>
            try another email address
          </span>
        </p>
      </div>
    </>
  );
}
