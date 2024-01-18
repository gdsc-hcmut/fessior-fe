'use client';

import { ReactNode, useEffect, useState } from 'react';

import useAuthRouter from '@/hooks/useAuthRouter';
import storage from '@/libs/local-storage';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [allowAuth, setAllowAuth] = useState(false);
  const authRouter = useAuthRouter();

  useEffect(() => {
    if (storage.getItem('loggedIn')) {
      // authRouter();
    } else setAllowAuth(true);
  }, []);

  if (!allowAuth) return null;

  return children;
}
