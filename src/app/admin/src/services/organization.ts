import User from '@/types/user-type';

import SAMPLE_ORGANIZATIONS from '../data/organizations';
import SAMPLE_USERS from '../data/users';
import Organization, { BaseOrganization } from '../types/organization';

function getAllOrganizations(): Promise<Organization[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(SAMPLE_ORGANIZATIONS), 500);
  });
}

function deleteOrganization(organizationId: string): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`DELETED ${organizationId}`);
      resolve({ message: 'Delete successfully' });
    }, 500);
  });
}

function updateOrganization(organization: Organization): Promise<Organization> {
  return new Promise((resolve) => {
    console.log(`UPDATED ${organization._id}`);
    setTimeout(() => resolve(organization), 500);
  });
}

function createOrganization(
  organization: BaseOrganization,
): Promise<Organization> {
  return new Promise((resolve) => {
    console.log(`CREATED ${organization.longName}`);
    setTimeout(() => resolve({ ...organization, _id: '4' }), 500);
  });
}

const organizationService = {
  getAllOrganizations,
  deleteOrganization,
  updateOrganization,
  createOrganization,
};

export default organizationService;
