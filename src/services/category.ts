import api from './api';

import { CategoryColor, Organization } from '@/types';
import Url from '@/types/url-type';

async function createCategory(payload: {
  name: string;
  color: CategoryColor;
  organization: Organization['_id'];
  urls: Url['_id'][];
}) {
  try {
    return (await api.post('/v1/api/categories', payload)).data.payload;
  } catch (e: any) {
    console.error(e.message);
  }
}

const categoryService = {
  createCategory,
};

export default categoryService;
