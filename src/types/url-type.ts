import Organization from './organization-type';

type Url = {
  _id: string;
  originalUrl: string;
  slug: string;
  domain: string;
  totalClicks: number;
  organizationId: Organization['_id'];
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

type ClickInfo = {
  clickedAt: string;
  original: string;
  ip: string;
};

export type MyUrlv1 = {
  _id: string;
  originalUrl: string;
  slug: string;
  domain: string;
  organizationId: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  clickCount?: number;
  totalClicks?: ClickInfo[];
  categories: string[];
};

export type getUrlListOption = {
  organizationId: string;
  page: number;
  sortBy: string;
  order: string;
  searchText?: string;
};

export type deletUrlOption = {
  urlId: string;
  editPayload: {
    slug: string;
  };
};

export type ChartData = {
  dateString: string;
  clicks: number;
  count: number;
};

export type PieChartData = {
  name: string;
  value: number;
};

export default Url;
