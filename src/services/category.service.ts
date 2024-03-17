import CategoryColor from '@/types/category-color-enum';
import Organization from '@/types/organization-type';
import Url from '@/types/url-type';

import api from './api';

const createCategory = async (payload: {
  name: string;
  color: CategoryColor;
  organization: Organization['_id'];
  urls: Url['_id'][];
}) => {
  try {
    return (await api.post('/v1/api/categories', payload)).data.payload;
  } catch (e: any) {
    console.log(e.message);
  }
};

const categoryService = {
  createCategory,
};

export default categoryService;
