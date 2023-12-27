import axios from 'axios';

import storage from '@/libs/local-storage';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${storage.getItem('token')}`;
    return config;
  },
  (error) => {
    console.log('[Axios] Error in axios');
    Promise.reject(error);
  },
);

export default instance;
