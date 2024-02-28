'use client';

import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

import LoadingPage from '@/app/loading';
import {
  CheckEmailIcon,
  ForgotPasswordCommon0,
  ForgotPasswordCommon1,
  ForgotPasswordCommon2,
  LoginCommon,
  SignUpCommon0,
  SignUpCommon1,
} from '@/components/auth';
import CloseButton from '@/components/close-button';
import useAuthRouter from '@/hooks/useAuthRouter';
import authHeaderContent from '@/libs/auth-header-content';
import storage from '@/libs/local-storage';
import AuthType from '@/types/auth-type-enum';
import { detectOS } from '@/utils/common';

type AuthModalHeadingProps = {
  title: string;
  subtitle?: string;
  sublinkText?: string;
  sublinkAuthType?: string;
  className?: string;
};

export function AuthModalHeading(props: AuthModalHeadingProps) {
  const { title, subtitle, sublinkAuthType, sublinkText, className } = props;

  const authRouter = useAuthRouter();

  return (
    <div className={clsx('md:mb-[24px] lg:mb-[28px]', className)}>
      {
        <h1 className='font-[700] text-primary md:text-[28px] lg:text-[32px]'>
          {title}
        </h1>
      }
      <p>
        {subtitle}{' '}
        {sublinkAuthType && sublinkText && (
          <span
            className='cursor-pointer text-primary underline'
            onClick={() => authRouter(sublinkAuthType)}
          >
            {sublinkText}
          </span>
        )}
      </p>
    </div>
  );
}

function AuthModalContent({ authType }: { authType: string }) {
  if (authType === AuthType.LOGIN) return <LoginModalContent />;
  if (authType === AuthType.SIGN_UP) return <SignUpModalContent />;
  if (authType === AuthType.FORGOT_PASSWORD)
    return <ForgotPasswordModalContent />;
}

function LoginModalContent() {
  return (
    <>
      <AuthModalHeading {...authHeaderContent[AuthType.LOGIN][0]} />
      <LoginCommon />
    </>
  );
}

function SignUpModalContent() {
  const [step, setStep] = useState(0);
  return (
    <>
      <AuthModalHeading {...authHeaderContent[AuthType.SIGN_UP][step]} />
      {step === 0 && <SignUpCommon0 nextStep={() => setStep(step + 1)} />}
      {step === 1 && <SignUpCommon1 />}
    </>
  );
}

function ForgotPasswordModalContent() {
  const [step, setStep] = useState(0);
  return (
    <>
      {step === 2 ? (
        <div className='flex items-center md:mb-[24px] lg:mb-[28px]'>
          <CheckEmailIcon />
          <AuthModalHeading
            {...authHeaderContent[AuthType.FORGOT_PASSWORD][2]}
            subtitle=''
            className='ms-[8px] inline-flex flex-col justify-center'
          />
        </div>
      ) : (
        <AuthModalHeading
          {...authHeaderContent[AuthType.FORGOT_PASSWORD][step]}
        />
      )}
      {step === 0 && (
        <ForgotPasswordCommon0 nextStep={() => setStep(step + 1)} />
      )}
      {step === 1 && (
        <ForgotPasswordCommon1 nextStep={() => setStep(step + 1)} />
      )}
      {step === 2 && <ForgotPasswordCommon2 />}
    </>
  );
}

type AuthModalProps = {
  authType: string;
};

export default function AuthModal(props: AuthModalProps) {
  const { authType } = props;

  const authRouter = useAuthRouter();
  const [allowAuth, setAllowAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const isMobile = !['windows', 'other'].includes(detectOS());

    if (isMobile) return;

    if (storage.getItem('loggedIn')) {
      authRouter();
    } else {
      setAllowAuth(true);
    }
  }, [authRouter]);
  if (!authType) return null;
  if (allowAuth == null) return <LoadingPage />;

  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-black/[0.3]'>
      <div className='relative flex w-[560px] items-stretch overflow-hidden rounded-[8px] bg-white lg:w-[680px]'>
        <div className='flex w-[65%] flex-col px-[40px] py-[60px] lg:px-[54px]'>
          <AuthModalContent authType={authType} />
        </div>
        <div
          style={{
            backgroundImage: `url("${
              authHeaderContent[authType as AuthType][0].background
            }")`,
          }}
          className='flex-grow bg-cover bg-center'
        ></div>
        <CloseButton
          onClick={() => {
            storage.removeItem('token');
            authRouter();
          }}
          className='absolute right-[16px] top-[16px] w-[32x]'
        />
      </div>
    </div>
  );
}
