'use client';

import { GoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Brand from '@/components/brand';
import Button from '@/components/button';
import TextInput from '@/components/text-input';

type AuthHeaderProps = {
  title: string;
  subtitle: string;
  background: string;
  sublinkText?: string;
  sublinkHref?: string;
};

export function AuthHeader(props: AuthHeaderProps) {
  const { title, subtitle, sublinkHref, sublinkText, background } = props;

  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className='relative h-[285px] bg-cover p-[20px]'
    >
      <Brand theme='white' />
      <div className='mt-[60px]'>
        <h1 className='text-[28px] font-[700] text-white'>{title}</h1>
        <p className='text-white'>
          {subtitle}{' '}
          {sublinkHref && sublinkText && (
            <Link className='underline' href={sublinkHref}>
              {sublinkText}
            </Link>
          )}
        </p>
      </div>
      <Image
        src='/images/auth/decor.svg'
        alt=''
        width={0}
        height={0}
        className='absolute bottom-0 left-0 right-0 h-auto w-[100%]'
      />
    </div>
  );
}

type LoginFormProps = {
  fixedEmail?: string;
  signUp?: boolean;
};

export function LoginForm({ fixedEmail, signUp }: LoginFormProps) {
  const [email, setEmail] = useState(fixedEmail ? fixedEmail : '');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className='flex flex-col px-[20px]'>
      <div className='mb-[20px]'>
        <h6 className='mb-[12px] font-[600] text-primary'>Email</h6>
        <TextInput
          placeholder=''
          value={email}
          onInput={(input) => setEmail(input)}
          disabled={!!fixedEmail}
        />
      </div>
      <div>
        <h6 className='mb-[12px] font-[600] text-primary'>Password</h6>
        <TextInput
          type={passwordVisible ? 'text' : 'password'}
          placeholder=''
          value={password}
          onInput={(input) => setPassword(input)}
          iconSrc={
            password.length > 0
              ? passwordVisible
                ? '/icons/visibility.svg'
                : '/icons/visibility_off.svg'
              : undefined
          }
          iconPosition='right'
          onIconClick={() => {
            setPasswordVisible(!passwordVisible);
          }}
        />
      </div>
      <Link
        href=''
        className='mb-[24px] mt-[16px] self-end text-[12px] text-[#252641] underline'
      >
        Forgot your password?
      </Link>
      <Button>{signUp ? 'Sign Up' : 'Log In'}</Button>
    </div>
  );
}

export function CustomGoogleLogin() {
  return (
    <GoogleLogin
      size='large'
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
      width={typeof window !== 'undefined' ? window.innerWidth - 48 : undefined}
    />
  );
}
