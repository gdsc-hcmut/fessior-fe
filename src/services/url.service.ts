import Url, { MyUrl } from '@/types/url-type';

import api from './api';

const shorten = async (payload: Url) => {
  try {
    return (await api.post('v1/api/urls', payload)).data.payload;
  } catch (e: any) {
    console.log(e.response.data.message);
  }
};

const urlService = { shorten };

export default urlService;

export const myUrlListData: MyUrl[] = [
  {
    originalUrl: 'https://www.messenger.com/t/1000000',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 12,
    enable: true,
    createdAt: '22/12/2023',
    category: ['Favorite', 'Recruit22-23', 'Testting123'],
  },
  {
    originalUrl: 'https://www.messenger.com/longlinksccccccc',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 122,
    enable: true,
    createdAt: '22/02/2023',
    category: ['Events', 'Favorite'],
  },
  {
    originalUrl: 'https://www.messenger.com/longlinksccccccc',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 23,
    enable: false,
    createdAt: '03/04/2023',
    category: ['Favorite', 'Recruit22-23', 'Testting123'],
  },
  {
    originalUrl: 'https://hahaha/t/1000000',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 3,
    enable: true,
    createdAt: '03/04/2022',
    category: ['Events'],
  },
  {
    originalUrl: 'https://gdscgdscgdsc/myurl',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 35,
    enable: true,
    createdAt: '23/11/2023',
    category: ['Favorite', 'Recruitment22-23'],
  },
  {
    originalUrl: 'https://www.messenger.com/longlinksccccccc',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 103,
    enable: false,
    createdAt: '30/11/2023',
    category: ['Favorite'],
  },
  {
    originalUrl: 'https://www.messenger.com/t/1000000',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 87,
    enable: false,
    createdAt: '30/11/2023',
    category: ['Favorite', 'Recruit22-23', 'Testting123'],
  },
  {
    originalUrl: 'https://www.messenger.com/t/1000000',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 12,
    enable: true,
    createdAt: '22/12/2023',
    category: ['Favorite', 'Recruit22-23', 'Testting123'],
  },
  {
    originalUrl: 'https://www.messenger.com/longlinksccccccc',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 122,
    enable: true,
    createdAt: '22/02/2023',
    category: ['Events', 'Favorite'],
  },
  {
    originalUrl: 'https://www.messenger.com/longlinksccccccc',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 23,
    enable: false,
    createdAt: '03/04/2023',
    category: ['Favorite', 'Recruit22-23', 'Testting123'],
  },
  {
    originalUrl: 'https://hahaha/t/1000000',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 3,
    enable: true,
    createdAt: '03/04/2022',
    category: ['Events'],
  },
  {
    originalUrl: 'https://gdscgdscgdsc/myurl',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 35,
    enable: true,
    createdAt: '23/11/2023',
    category: ['Favorite', 'Recruitment22-23'],
  },
  {
    originalUrl: 'https://www.messenger.com/longlinksccccccc',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 103,
    enable: false,
    createdAt: '30/11/2023',
    category: ['Favorite'],
  },
  {
    originalUrl: 'https://www.messenger.com/t/1000000',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 87,
    enable: false,
    createdAt: '30/11/2023',
    category: ['Favorite', 'Recruit22-23', 'Testting123'],
  },
  {
    originalUrl: 'https://www.messenger.com/longlinksccccccc',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 103,
    enable: false,
    createdAt: '30/11/2023',
    category: ['Favorite'],
  },
  {
    originalUrl: 'https://www.messenger.com/t/1000000',
    slug: 'myLink',
    domain: 'furl.one',
    totalClicks: 87,
    enable: false,
    createdAt: '30/11/2023',
    category: ['Favorite', 'Recruit22-23', 'Testting123'],
  },
];
