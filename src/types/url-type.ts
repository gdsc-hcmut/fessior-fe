type Url = {
  _id: string;
  originalUrl: string;
  slug: string;
  domain: string;
  totalClicks: number;
  organizationId: string;
};

export type MyUrl = {
  originalUrl: string;
  slug: string;
  domain: string;
  totalClicks: number;
  enable: boolean;
  createdAt: string;
  category: string[];
};

export default Url;
