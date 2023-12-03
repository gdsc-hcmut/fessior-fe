import api from './api';

const getMe = async () => {
  return (await api.get('v1/api/me')).data.payload;
};

const getOrganization = async () => {
  return (await api.get('v1/api/me/organizations')).data.payload;
};

const meService = { getMe, getOrganization };

export default meService;
