import api from './api';

async function login(
  payload: { token: string } | { username: string; password: string },
) {
  return (await api.post('v1/api/auth/login', payload)).data.payload;
}

async function logout(payload: { token: string }) {
  try {
    return (await api.post('v1/api/auth/logout', payload)).data.payload;
  } catch (e: any) {
    console.log(e.response.data.message);
  }
}

async function createPassword(newPassword: string) {
  return (await api.post('v1/api/auth/password', { newPassword })).data.payload;
}

async function recoverPassword() {}

const authService = { login, logout, createPassword, recoverPassword };

export default authService;
