import api from './shared/client';

const getMe = async () => {
  return (await api.get('v1/api/me')).data.payload;
};

const getOrganization = async () => {
  return (await api.get('v1/api/me/organizations')).data.payload;
};

const createPassword = async (newPassword: string) => {
  return (await api.post('v1/api/auth/password', { newPassword })).data.payload;
};

const recoverPassword = async () => {};

const meService = { getMe, getOrganization, createPassword, recoverPassword };

export default meService;
