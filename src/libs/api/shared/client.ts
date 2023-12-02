import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`;
    return config;
  },
  (error) => {
    console.log('[Axios] Error in axios');
    Promise.reject(error);
  },
);

export default instance;
