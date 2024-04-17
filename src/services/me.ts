import api from './api';

async function getMe() {
  try {
    return (await api.get('v1/api/me')).data.payload;
  } catch (e: any) {
    console.log(e?.response?.data?.message ?? e);
  }
}

async function getOrganization() {
  try {
    return (await api.get('v1/api/me/organizations')).data.payload;
  } catch (e: any) {
    console.log(e?.response?.data?.message ?? e);
  }
}

const meService = { getMe, getOrganization };

export default meService;
