'use client';

import { LoginCommon } from '@/components/auth';
import { AuthHeader } from '@/components/auth-sm';
import authHeaderContent from '@/libs/auth-header-content';
import AuthType from '@/types/auth-type-enum';

export default function Login() {
  return (
    <div className='flex h-screen flex-col'>
      <AuthHeader {...authHeaderContent[AuthType.LOGIN][0]} />
      <div className='mt-[28px] flex flex-col px-[20px] pb-[30%]'>
        <LoginCommon />
      </div>
    </div>
  );
}
