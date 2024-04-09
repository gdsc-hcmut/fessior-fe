'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useContext, useEffect, useState } from 'react';

import AuthContext from '@/contexts/authContext';
import { AuthFormContextProvider } from '@/contexts/authFormContext';
import { useAuthRouter } from '@/hooks';
import AuthType from '@/types/auth-type-enum';
import { detectOS } from '@/utils/common';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [isAuthAllowed, setIsAuthAllowed] = useState(false);
  const { isLoggedIn, isAuthStatusReady } = useContext(AuthContext);
  const authRouter = useAuthRouter();
  const pathname = usePathname();
  const authType = pathname.split('/')[2] as AuthType;

  useEffect(() => {
    const isMobile = !['windows', 'other'].includes(detectOS());

    if (!isMobile) {
      authRouter(authType, false, '/');
      return;
    }

    if (isAuthStatusReady) {
      if (isLoggedIn && authType !== AuthType.SIGN_UP) {
        authRouter();
        return;
      }
    } else return;

    setIsAuthAllowed(true);
  }, [authRouter, authType, isAuthStatusReady, isLoggedIn]);

  if (!isAuthAllowed) return;
  console.log(isAuthAllowed);
  return <AuthFormContextProvider>{children}</AuthFormContextProvider>;
}
