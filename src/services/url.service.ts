import Url from '@/types/url-type';

import api from './api';

const shorten = async (payload: Url) => {
  try {
    return (await api.post('v1/api/urls', payload)).data.payload;
  } catch (e: any) {
    console.log(e.response.data.message);
  }
};

const urlService = { shorten };

export default urlService;
