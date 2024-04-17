'use client';

import {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import { authService, meService } from '@/services';
import User from '@/types/user-type';
import storage from '@/utils/storage';

type AuthContextProps = {
  meProfile: User | null;
  login: (
    payload: { token: string } | { username: string; password: string },
  ) => Promise<any>;
  logout: () => Promise<void>;
  isAuthStatusReady: boolean;
  isLoggedIn: boolean;
};

const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [meProfile, setMeProfile] = useState<User | null>(null);
  const isLoggedIn = useMemo(() => !!meProfile, [meProfile]);
  const [isAuthStatusReady, setIsAuthStatusReady] = useState(false);

  const getMeProfile = useCallback(async () => {
    try {
      const profile = await meService.getMe();

      if (profile) setMeProfile(profile);
    } catch (e: any) {
      setMeProfile(null);
      storage.removeItem('token');
      console.log(e.message);
    }
  }, []);

  useEffect(() => {
    if (storage.getItem('token')) {
      (async () => {
        await getMeProfile();
        setIsAuthStatusReady(true);
      })();
      return;
    }
    setIsAuthStatusReady(true);
  }, [getMeProfile]);

  const login = useCallback(
    async (
      payload: { token: string } | { username: string; password: string },
    ) => {
      const response = await authService.login(payload);

      if (response.token) {
        storage.setItem('token', response.token);
        getMeProfile();
      }

      return response;
    },
    [getMeProfile],
  );

  const logout = useCallback(async () => {
    const token = storage.getItem('token') as string;

    if (token)
      try {
        await authService.logout({ token });
      } catch (e: any) {
        console.log(e.response.data.message);
      }

    setMeProfile(null);
    storage.removeItem('token');
  }, []);

  const value = useMemo(() => {
    return {
      meProfile,
      login,
      logout,
      isAuthStatusReady,
      isLoggedIn,
    };
  }, [login, logout, meProfile, isAuthStatusReady, isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
