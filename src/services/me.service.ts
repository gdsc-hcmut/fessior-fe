import api from './api';

const getMe = async () => {
  try {
    return (await api.get('v1/api/me')).data.payload;
  } catch (e: any) {
    console.log(e.response.data.message);
  }
};

const getOrganization = async () => {
  try {
    return (await api.get('v1/api/me/organizations')).data.payload;
  } catch (e: any) {
    console.log(e.response.data.message);
  }
};

const getCategoryByOrganization = async (organizationId: string) => {
  try {
    return (
      await api.get(
        `/v1/api/organizations/${organizationId}/categories?page=1&limit=20`,
      )
    ).data.payload;
  } catch (e: any) {
    console.log(e.response.data.message);
  }
};

const meService = { getMe, getOrganization, getCategoryByOrganization };

export default meService;
