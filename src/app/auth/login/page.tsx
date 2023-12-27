'use client';

// TODO: Input validation

import { AuthHeader, CustomGoogleLogin, LoginForm } from '@/components/auth';

export default function Login() {
  return (
    <div>
      <AuthHeader
        title='Log In'
        subtitle="Don't have an account?"
        background='/images/auth/background_1.svg'
        sublinkHref=''
        sublinkText='Sign up'
      />
      <div className='flex justify-center py-[24px]'>
        <CustomGoogleLogin />
      </div>
      <div className='mb-[20px] flex items-center px-[20px]'>
        <hr className='flex-grow bg-[#B3B3B3]' />
        <p className='px-[8px] text-primary'>OR</p>
        <hr className='flex-grow bg-[#B3B3B3]' />
      </div>
      <LoginForm />
    </div>
  );
}
