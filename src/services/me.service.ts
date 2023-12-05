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

const meService = { getMe, getOrganization };

export default meService;
