import { useState } from 'react';

import Button from '@/components/button';
import Input from '@/components/input';
import InputCode from '@/components/input-code';
import useAuthRouter from '@/hooks/useAuthRouter';
import useEventListener from '@/hooks/useEventListener';
import AuthFormFieldEnum from '@/types/auth-form-field-enum';
import AuthFormFieldType from '@/types/auth-form-field-type';
import AuthType from '@/types/auth-type-enum';
import { VERIFICATION_CODE_LENGTH } from '@/utils/auth';

import PasswordRequirements from '../password-requirements';

type AuthFormProps = {
  initFields: AuthFormFieldType[];
  actionText: string;
  subActionText?: string;
  onSubAction?: () => void;
  subActionAuthType?: AuthType;
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
    onSubAction,
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

  useEventListener('keydown', (e: any) => {
    if (e.key === 'Enter' && (actionAllowed ?? true)) onAction();
  });

  const renderInput = (field: AuthFormFieldType, index: number) => {
    if (field.type !== AuthFormFieldEnum.VERIFICATION_CODE) {
      return (
        <Input
          autoFocus={index === 0}
          className='mb-[4px] font-[500]'
          type={
            field.type === AuthFormFieldEnum.PASSWORD && !passwordVisible[index]
              ? 'password'
              : 'text'
          }
          placeholder=''
          textValue={field.currentValue}
          onInput={(input) => {
            field.onChange?.(input);
          }}
          iconSrc={
            field.type === AuthFormFieldEnum.PASSWORD &&
            field.currentValue.length > 0
              ? passwordVisible[index]
                ? '/icons/auth/visibility.svg'
                : '/icons/auth/visibility_off.svg'
              : undefined
          }
          iconPosition={
            field.type === AuthFormFieldEnum.PASSWORD ? 'right' : undefined
          }
          onIconClick={() => {
            setPasswordVisible(
              passwordVisible.map((pV, pVIndex) => {
                return index === pVIndex ? !pV : pV;
              }),
            );
          }}
          disabled={field.fixedValue}
        />
      );
    }

    return (
      <InputCode
        value={field.currentValue}
        length={VERIFICATION_CODE_LENGTH}
        onChange={field.onChange!}
      />
    );
  };

  return (
    <div className='flex flex-col'>
      {initFields.map((field, index) => (
        <div key={field.label} className='mt-[4px]'>
          <h6 className='mb-[12px] font-[600] text-primary'>{field.label}</h6>
          {renderInput(field, index)}
          <div className='min-h-[26px] md:min-h-[24px]'>
            {errorTexts && (
              <p className='text-[12px] font-[500] text-red'>
                {errorTexts[index]}
              </p>
            )}
            {field.type === AuthFormFieldEnum.PASSWORD &&
              field.label === 'Password' &&
              !isLogin && (
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
          onClick={
            onSubAction ??
            (() => {
              authRouter(subActionAuthType);
            })
          }
          className='mb-[20px] mt-[-4px] cursor-pointer self-end text-[12px] text-default-text underline lg:mb-[40px] lg:mt-0 lg:text-[16px]'
        >
          {subActionText}
        </p>
      )}
      <Button
        disabled={!(actionAllowed ?? true)}
        onClick={onAction}
        className='mt-[4px] lg:mt-0 lg:text-[20px]'
      >
        {actionText}
      </Button>
    </div>
  );
}
