import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNjU1YTQyYzFmY2RkNmM3MTZlYmM4NjJlIiwiaWF0IjoxNzAwNDE0MTQ1LCJleHAiOjE3MzE5NTAxNDV9.E_ZNREzb8XFJ17rqG_Mteu6GmxMEYzTPTVcVu7DdOYc';
    return config;
  },
  (error) => {
    console.log('Error in axios');
    Promise.reject(error);
  },
);

export default instance;
