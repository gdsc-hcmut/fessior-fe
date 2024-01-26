'use client';

import {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import {
  login as serviceLogin,
  logout as serviceLogout,
} from '@/libs/api/auth';
import meService from '@/libs/api/me';
import storage from '@/libs/local-storage';
import User from '@/types/user-type';

type AuthContextProps = {
  meProfile: User | null;
  login: (
    payload: { token: string } | { username: string; password: string },
  ) => Promise<any>;
  logout: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [meProfile, setMeProfile] = useState<User | null>(null);

  const getMeProfile = useCallback(async () => {
    try {
      const profile = await meService.getMe();

      if (profile) {
        setMeProfile(profile);
        storage.setItem('loggedIn', true);
      } else {
        setMeProfile(null);
        storage.removeItem('token');
        storage.removeItem('loggedIn');
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }, []);

  useEffect(() => {
    if (storage.getItem('loggedIn')) getMeProfile();
  }, [getMeProfile]);

  const login = useCallback(
    async (
      payload: { token: string } | { username: string; password: string },
    ) => {
      const response = await serviceLogin(payload);

      if (response.token) storage.setItem('token', response.token);

      if (response.hasPassword) {
        getMeProfile();
      }
      return response;
    },
    [getMeProfile],
  );

  const logout = useCallback(async () => {
    const token = storage.getItem('token') as string;

    if (!token) return;

    try {
      await serviceLogout({ token });
    } catch (e: any) {
      console.log(e.response.data.message);
    }

    setMeProfile(null);
    storage.removeItem('token');
    storage.removeItem('loggedIn');
  }, []);

  const value = useMemo(() => {
    return {
      meProfile,
      login,
      logout,
    };
  }, [login, logout, meProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;