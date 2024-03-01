import Url, { MyUrl, getUrlListOption } from '@/types/url-type';

import api from './api';

const shorten = async (payload: Url) => {
  try {
    return (await api.post('v1/api/urls', payload)).data.payload;
  } catch (e: any) {
    console.log(e.response.data.message);
  }
};

const getUrlListByOrganization = async (payload: getUrlListOption) => {
  try {
    return (
      await api.get(
        `/v1/api/organizations/${payload.organizationId}/urls?page=${payload.page}&limit=7&sort=time&order=desc`,
      )
    ).data.payload;
  } catch (e: any) {
    console.log(e.response.data.message);
  }
};

const urlService = { shorten, getUrlListByOrganization };

export default urlService;

export const myUrlListData: MyUrl[] = [
  {
    originalUrl: 'https://www.messenger.com/t/1000000',
    slug: 'myLink1',
    domain: 'furl.one',
    totalClicks: 12,
    enable: true,
    createdAt: '22/12/2023',
    category: ['testing', 'marketing', 'gic2023'],
  },
  {
    originalUrl: 'https://www.messenger.com/longlinksccccccc',
    slug: 'myLin',
    domain: 'furl.one',
    totalClicks: 122,
    enable: true,
    createdAt: '22/02/2023',
    category: ['event', 'favorite'],
  },
  {
    originalUrl: 'https://www.messenger.com/longlinksccccccc',
    slug: 'myLink2',
    domain: 'furl.one',
    totalClicks: 23,
    enable: false,
    createdAt: '03/04/2023',
    category: ['favorite', 'marketing', 'gic2023'],
  },
  {
    originalUrl: 'https://hahaha/t/1000000',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 3,
    enable: true,
    createdAt: '03/04/2022',
    category: ['event'],
  },
  {
    originalUrl: 'https://gdscgdscgdsc/myurl',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 35,
    enable: true,
    createdAt: '23/11/2023',
    category: ['favorite', 'go for git'],
  },
  {
    originalUrl: 'https://www.messenger.com/longlinksccccccc',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 103,
    enable: false,
    createdAt: '30/11/2023',
    category: ['favorite'],
  },
  {
    originalUrl: 'https://www.messenger.com/t/1000000',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 87,
    enable: false,
    createdAt: '30/11/2023',
    category: ['favorite', 'go for git', 'development'],
  },
  {
    originalUrl: 'https://www.messenger.com/t/1000000',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 12,
    enable: true,
    createdAt: '22/12/2023',
    category: ['favorite', 'marketing', 'development'],
  },
  {
    originalUrl: 'https://www.messenger.com/longlinksccccccc',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 122,
    enable: true,
    createdAt: '22/02/2023',
    category: ['event', 'favorite'],
  },
  {
    originalUrl: 'https://www.messenger.com/longlinksccccccc',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 23,
    enable: false,
    createdAt: '03/04/2023',
    category: ['favorite', 'marketing', 'gic2023'],
  },
  {
    originalUrl: 'https://hahaha/t/1000000',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 3,
    enable: true,
    createdAt: '03/04/2022',
    category: ['event'],
  },
  {
    originalUrl: 'https://gdscgdscgdsc/myurl',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 35,
    enable: true,
    createdAt: '23/11/2023',
    category: ['favorite', 'external relations'],
  },
  {
    originalUrl: 'https://www.messenger.com/longlinksccccccc',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 103,
    enable: false,
    createdAt: '30/11/2023',
    category: ['favorite'],
  },
  {
    originalUrl: 'https://www.messenger.com/t/1000000',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 87,
    enable: false,
    createdAt: '30/11/2023',
    category: ['favorite', 'development', 'recruitment'],
  },
  {
    originalUrl: 'https://www.messenger.com/longlinksccccccc',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 103,
    enable: false,
    createdAt: '30/11/2023',
    category: ['favorite'],
  },
  {
    originalUrl: 'https://www.messenger.com/t/1000000',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 87,
    enable: false,
    createdAt: '30/11/2023',
    category: ['favorite', 'recruitment', 'misc'],
  },
];

export const domainListData: string[] = [
  'gdsc.app',
  'bk.oisp.info',
  'furl.one',
  'gic.gdsc.app',
  'elog.bkoisp.info',
  'uit.gdsc.app',
  'gdsc.link',
  'gdsc.one',
  'gdsc.tech',
  'gdsc.page',
];

export const categoryListData: string[] = [
  'event',
  'spring recruitment 2024',
  'gic2023',
  'misc',
  'go for git',
  'marketing',
  'development',
  'external relations',
  'email',
  'testing',
  'recruitment',
  'favorite',
];
