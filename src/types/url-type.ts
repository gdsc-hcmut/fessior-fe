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
  category?: string[];
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

export default Url;
