import Url from '@/types/url-type';

import api from './api';

async function shorten(payload: Url) {
  return (await api.post('v1/api/urls', payload)).data.payload;
}

const urlService = { shorten };

export default urlService;
