import User from '@/types/user-type';

type Organization = {
  _id: string;
  longName: string;
  shortName: string;
  managers: User[];
  members: User[];
  domains: string[];
};

export type BaseOrganization = Omit<Organization, '_id'>;

export default Organization;
