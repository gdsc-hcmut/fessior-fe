import SAMPLE_ORGANIZATIONS from '../data/organizations';
import Organization, { BaseOrganization } from '../types/organization';

function getAllOrganizations(): Promise<Organization[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(SAMPLE_ORGANIZATIONS), 500);
  });
}

function deleteOrganization(_organizationId: string): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: 'Delete successfully' });
    }, 500);
  });
}

function updateOrganization(organization: Organization): Promise<Organization> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(organization), 500);
  });
}

function createOrganization(
  organization: BaseOrganization,
): Promise<Organization> {
  return new Promise((resolve) => {
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
