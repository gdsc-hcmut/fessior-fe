import { useState } from 'react';

import Button from '@/components/button';
import TextInput from '@/components/text-input';
import useAuthRouter from '@/hooks/useAuthRouter';
import AuthFormField from '@/types/auth-form-field-type';

import PasswordRequirements from '../password-requirements';

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

export default function AuthForm(props: AuthFormProps) {
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
          className='mb-[20px] mt-[-4px] cursor-pointer self-end text-[12px] text-default-text underline lg:mb-[40px] lg:mt-0 lg:text-[16px]'
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
