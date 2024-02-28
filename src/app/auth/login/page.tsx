'use client';

import AuthHeader from '@/components/auth/auth-header';
import LoginCommon from '@/components/auth/login-common';
import authHeaderContent from '@/libs/auth-header-content';
import AuthType from '@/types/auth-type-enum';

export default function Login() {
  return (
    <div className='flex h-screen flex-col'>
      <AuthHeader {...authHeaderContent[AuthType.LOGIN][0]} />
      <div className='flex flex-col px-[20px] pb-[40px] pt-[28px]'>
        <LoginCommon />
      </div>
    </div>
  );
}
