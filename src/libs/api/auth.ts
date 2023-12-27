import api from './shared/client';

const login = async (payload: { token: string }) => {
  try {
    return (await api.post('v1/api/auth/login', payload)).data.payload;
  } catch (e: any) {
    console.log(e.response.data.message);
  }
};

const logout = async (payload: { token: string }) => {
  try {
    return (await api.post('v1/api/auth/logout', payload)).data.payload;
  } catch (e: any) {
    console.log(e.response.data.message);
  }
};

export default { login, logout };
