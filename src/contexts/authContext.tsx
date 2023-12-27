'use client';

import {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
  useEffect,
  use,
} from 'react';

import authService from '@/libs/api/auth';
import storage from '@/libs/local-storage';
import meService from '@/services/me.service';
import User from '@/types/user-type';

type AuthContextProps = {
  isAuthorized: boolean;
  getMeProfile: () => void;
  meProfile: User | null;
  login: (token: string) => void;
  logout: (token: string) => void;
};

const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [meProfile, setMeProfile] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const getMeProfile = useCallback(async () => {
    const profile = await meService.getMe();

    if (profile) {
      setMeProfile(profile);
      setIsAuthorized(true);
    } else {
      setMeProfile(null);
      setIsAuthorized(false);
      storage.removeItem('token');
    }
  }, []);

  useEffect(() => {
    getMeProfile();
  }, []);

  const login = useCallback(async (token: string) => {
    const response = await authService.login({ token });

    if (response) {
      storage.setItem('token', response);
      await getMeProfile();
    }
  }, []);

  const logout = useCallback(async (token: string) => {
    await authService.logout({ token });

    setMeProfile(null);
    setIsAuthorized(false);
    storage.removeItem('token');
  }, []);

  const onLoggingIn = useCallback(() => {
    if (!isAuthorized) setIsLoggingIn(true);
  }, []);

  const value = useMemo(() => {
    return {
      isAuthorized,
      getMeProfile,
      meProfile,
      login,
      logout,
      isLoggingIn,
      onLoggingIn,
    };
  }, [
    isAuthorized,
    getMeProfile,
    login,
    logout,
    meProfile,
    isLoggingIn,
    onLoggingIn,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
