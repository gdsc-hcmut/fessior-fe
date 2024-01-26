import api from './shared/client';

export const login = async (
  payload: { token: string } | { username: string; password: string },
) => {
  return (await api.post('v1/api/auth/login', payload)).data.payload;
};

export const logout = async (payload: { token: string }) => {
  try {
    return (await api.post('v1/api/auth/logout', payload)).data.payload;
  } catch (e: any) {
    console.log(e.response.data.message);
  }
};

export const createPassword = async (newPassword: string) => {
  return (await api.post('v1/api/auth/password', { newPassword })).data.payload;
};

export const recoverPassword = async () => {};
