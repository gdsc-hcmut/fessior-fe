import Category from '@/types/category-type';
import Organization from '@/types/organization-type';
import Url from '@/types/url-type';

import api from './api';

async function getCategoryByOrganizationId(
  organizationId: Organization['_id'],
  page: number = 1,
  limit: number = 10,
) {
  try {
    return (
      await api.get(
        `v1/api/organizations/${organizationId}/categories?page=${page}&limit=${limit}`,
      )
    ).data.payload;
  } catch (e: any) {
    console.log(e.message);
  }
}

async function searchCategoryByOrganizationId(
  organizationId: Organization['_id'],
  query: string = '',
  page: number = 1,
  limit: number = 10,
) {
  try {
    return (
      await api.get(
        `v1/api/organizations/${organizationId}/categories/search?page=${page}&limit=${limit}&q=${query}`,
      )
    ).data.payload;
  } catch (e: any) {
    console.log(e.message);
  }
}

async function addUrlToCategories(
  organizationId: Organization['_id'],
  payload: { url: Url['_id']; categories: Category['_id'][] },
) {
  try {
    return (
      await api.patch(
        `/v1/api/organizations/${organizationId}/categories/add-url`,
        payload,
      )
    ).data.payload;
  } catch (e: any) {
    console.log(e.message);
  }
}

const organizationService = {
  getCategoryByOrganizationId,
  searchCategoryByOrganizationId,
  addUrlToCategories,
};

export default organizationService;
