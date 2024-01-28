'use client';

import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect, useContext, useCallback } from 'react';

import Button from '@/components/button';
import TextInput from '@/components/text-input';
import AuthContext from '@/contexts/authContext';
import useAuthRouter from '@/hooks/useAuthRouter';
import useScreenSize from '@/hooks/useScreenSize';
import { createPassword, recoverPassword } from '@/libs/api/auth';
import meService from '@/libs/api/me';
import AuthType from '@/types/auth-type-enum';
import ScreenSize from '@/types/screen-size-enum';

type AuthFormField = {
  label: string;
  isPassword?: boolean;
  fixedValue?: boolean;
  currentValue: string;
  onChange?: (input: string) => void;
};

type AuthFormProps = {
  initFields: AuthFormField[];
  actionText: string;
  subActionText?: string;
  subActionAuthType?: string;
  onAction: () => void;
  errorTexts?: string[];
  actionAllowed?: boolean;
  isLogin?: boolean;
};

const useAuthErrorText = (fieldNumber: number) => {
  const [errorTexts, setErrorTexts] = useState(Array(fieldNumber).fill(''));

  const setAuthErrorText = useCallback((index: number, newText: string) => {
    setErrorTexts((errorTexts) =>
      errorTexts.map((text, currentIndex) =>
        currentIndex === index ? newText : text,
      ),
    );
  }, []);

  return { errorTexts, setAuthErrorText };
};

type PasswordRequirementsProps = {
  currentPassword: string;
  className?: string;
};

const validatePassword = (requirementQuantity: number, password: string) => {
  const validations = Array(requirementQuantity).fill(true);

  if (password.length < 6 || password.length >= 16) {
    validations[0] = false;
  }
  if (!(password.match(/[A-Z]/g) && password.match(/[a-z]/g))) {
    validations[1] = false;
  }
  if (
    !(password.match(/[0-9]/g) && password.match(/[!@#$%^&*(),.?"":{}|<>]/g))
  ) {
    validations[2] = false;
  }

  return validations;
};

function PasswordRequirements(props: PasswordRequirementsProps) {
  const { currentPassword, className } = props;
  const requirements = [
    'Be between 6 and 16 characters',
    'Contain at least one lowercase and one uppercase character',
    'Contain at least one number and one special character',
  ];
  const [validation, setValidation] = useState(
    Array(requirements.length).fill(true),
  );

  const validationSetter = () => {
    setValidation(validatePassword(3, currentPassword));
  };

  useEffect(validationSetter, [currentPassword]);

  const itemClass = (index: number) =>
    clsx(
      'relative left-[-8px]',
      currentPassword !== '' && (validation[index] ? 'text-green' : 'text-red'),
    );

  const containerClass = clsx(
    'mt-[8px] lg:text-[12px] text-[12px] font-[500] md:text-[10px]',
    className,
  );

  return (
    <div className={containerClass}>
      <p className='mb-[4px]'>Password must:</p>
      <ul className='list-inside list-disc'>
        {requirements.map((requirement, index) => (
          <li key={requirement}>
            <span className={itemClass(index)}>{requirement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AuthForm(props: AuthFormProps) {
  const {
    initFields,
    actionText,
    subActionAuthType,
    subActionText,
    onAction,
    errorTexts,
    actionAllowed,
    isLogin,
  } = props;
  const [passwordVisible, setPasswordVisible] = useState(
    Array(initFields.length).fill(false),
  );
  const authRouter = useAuthRouter();

  return (
    <div className='flex flex-col'>
      {initFields.map((field, index) => (
        <div key={field.label} className='mt-[4px]'>
          <h6 className='mb-[12px] font-[600] text-primary'>{field.label}</h6>
          <TextInput
            className='mb-[4px] border-[1px] border-primary font-[500]'
            type={
              field.isPassword && !passwordVisible[index] ? 'password' : 'text'
            }
            placeholder=''
            value={field.currentValue}
            onInput={(input) => {
              field.onChange?.(input);
            }}
            iconSrc={
              field.isPassword && field.currentValue.length > 0
                ? passwordVisible[index]
                  ? '/icons/auth/visibility.svg'
                  : '/icons/auth/visibility_off.svg'
                : undefined
            }
            iconPosition={field.isPassword ? 'right' : undefined}
            onIconClick={() => {
              setPasswordVisible(
                passwordVisible.map((pV, pVIndex) => {
                  return index === pVIndex ? !pV : pV;
                }),
              );
            }}
            disabled={field.fixedValue}
          />
          <div className='min-h-[26px] md:min-h-[24px]'>
            {errorTexts && (
              <p className='text-[12px] font-[500] text-red'>
                {errorTexts[index]}
              </p>
            )}
            {field.isPassword && field.label === 'Password' && !isLogin && (
              <PasswordRequirements
                className='mb-[20px] md:mb-[8px]'
                currentPassword={field.currentValue}
              />
            )}
          </div>
        </div>
      ))}
      {subActionText && (
        <p
          onClick={() => {
            authRouter(subActionAuthType);
          }}
          className='mb-[20px] mt-[-4px] cursor-pointer self-end text-[12px] text-[#252641] underline lg:mb-[40px] lg:mt-0 lg:text-[16px]'
        >
          {subActionText}
        </p>
      )}
      <Button
        disabled={actionAllowed === false}
        onClick={onAction}
        className='mt-[4px] lg:mt-0 lg:text-[20px]'
      >
        {actionText}
      </Button>
    </div>
  );
}

export function CustomGoogleLogin({
  onSuccess,
}: {
  onSuccess: (credential: CredentialResponse) => void;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  useEffect(() => {
    setButtonWidth(ref.current ? ref.current.offsetWidth : 0);
  }, []);

  return (
    <div className='w-[100%]' ref={ref}>
      <GoogleLogin
        size='large'
        onSuccess={onSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
        width={buttonWidth}
      />
    </div>
  );
}

export function LoginCommon() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { errorTexts, setAuthErrorText } = useAuthErrorText(2);

  const authRouter = useAuthRouter();

  const { login } = useContext(AuthContext);

  const handleLoginWithUsername = async () => {
    let isProblem = false;

    if (username === '') {
      setAuthErrorText(0, 'Please enter your email');
      isProblem = true;
    } else if (
      !username.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      setAuthErrorText(0, 'Please enter a valid email');
      isProblem = true;
    }

    if (password === '') {
      setAuthErrorText(1, 'Please enter your password');
      isProblem = true;
    }

    if (isProblem) return;

    try {
      await login({ username, password });
      authRouter();
    } catch (e: any) {
      setAuthErrorText(1, e.response.data.message);
    }
  };

  useEffect(() => {
    if (username !== '') setAuthErrorText(0, '');
  }, [username, setAuthErrorText]);

  useEffect(() => {
    if (password !== '') setAuthErrorText(1, '');
  }, [password, setAuthErrorText]);

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
          authRouter(AuthType.SIGN_UP);
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
        errorTexts={errorTexts}
      />
    </>
  );
}

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
  const { errorTexts, setAuthErrorText } = useAuthErrorText(3);
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
      setAuthErrorText(2, 'Password does not match');
    } else {
      setAuthErrorText(2, '');
    }

    if (
      password === confirmPassword &&
      !validatePassword(3, password).includes(false)
    ) {
      setIsActionAllowed(true);
    } else {
      setIsActionAllowed(false);
    }
  }, [password, confirmPassword, setAuthErrorText]);

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
      errorTexts={errorTexts}
      actionAllowed={isActionAllowed}
    />
  );
}

export function ForgotPasswordCommon0({ nextStep }: { nextStep: () => void }) {
  const [username, setUsername] = useState('');
  const { errorTexts, setAuthErrorText } = useAuthErrorText(1);

  useEffect(() => {
    setAuthErrorText(0, '');
  }, [username, setAuthErrorText]);

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
          if (
            !username.match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            )
          ) {
            setAuthErrorText(0, 'Please enter a valid email');
            return;
          }
          nextStep();
        }}
        errorTexts={errorTexts}
      />
    </>
  );
}

export function ForgotPasswordCommon1({ nextStep }: { nextStep: () => void }) {
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

//Cho nay khong co duong ve?
export function ForgotPasswordCommon2() {
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
          <Link href='#' className='text-primary underline'>
            try another email address
          </Link>
        </p>
      </div>
    </>
  );
}
