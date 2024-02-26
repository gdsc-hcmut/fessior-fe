import Organization from './organization-type';

type Url = {
  _id: string;
  originalUrl: string;
  slug: string;
  domain: string;
  totalClicks: number;
  organizationId: Organization['_id'];
};

export default Url;
