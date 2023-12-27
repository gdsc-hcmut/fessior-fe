'use client';

import { useState } from 'react';

import { AuthHeader, CustomGoogleLogin, LoginForm } from '@/components/auth';

export default function SignUp() {
  const [step, setStep] = useState(1);
  return (
    <div className='flex h-screen flex-col'>
      <AuthHeader
        title='Create your account'
        subtitle='Already have an account?'
        sublinkHref=''
        background='/images/auth/background_2.svg'
        sublinkText='Log in'
      />
      <div className='mt-[20px] flex flex-grow flex-col items-stretch justify-center'>
        <div className='w-[100%] grow-[2]'></div>
        <div className='grow-[7]'>
          {step === 0 && (
            <div className='px-[20px]'>
              <p className='mb-[8px] font-[600]'>
                Create an account in just a few steps!
              </p>
              <ul className='mb-[40px] list-inside list-disc'>
                <li className='text-[14px] leading-relaxed'>
                  Log in with your Google account
                </li>
                <li className='text-[14px] leading-relaxed'>
                  Once logged in, your account email will be automatically set
                  as your username
                </li>
                <li className='text-[14px] leading-relaxed'>
                  Complete the process by entering the password you want to
                  create
                </li>
              </ul>
              <CustomGoogleLogin />
            </div>
          )}
          {step === 1 && <LoginForm signUp fixedEmail='hello@gmail.com' />}
        </div>
      </div>
    </div>
  );
}
