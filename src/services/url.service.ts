import Url from '@/types/url-type';

import api from './api';

const shorten = async (payload: Url) => {
  return (await api.post('v1/api/urls', payload)).data.payload;
};

const urlService = { shorten };

export default urlService;
