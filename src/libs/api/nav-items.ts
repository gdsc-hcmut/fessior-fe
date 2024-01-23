import { NavItem } from './types/nav-item';

export const navItems: NavItem[] = [
  {
    text: 'Home',
    imgSrc: '/icons/home.svg',
    imgAlt: '',
    path: '/',
  },
  {
    text: 'URL Shortener',
    imgSrc: '/icons/shortener.svg',
    imgAlt: '',
    path: '',
    children: [
      {
        text: 'Shorten Now',
        imgSrc: '/icons/my_url.svg',
        imgAlt: '',
        path: '/shorten',
      },
      {
        text: 'My URLs',
        imgSrc: '/icons/statistics.svg',
        imgAlt: '',
        path: '/statistics',
      },
    ],
  },
  {
    text: 'Organization',
    imgSrc: '/icons/organization.svg',
    imgAlt: '',
    path: '/organization',
  },
  {
    text: 'About Us',
    imgSrc: '/icons/about.svg',
    imgAlt: '',
    path: '',
    children: [
      {
        text: 'Fessior Community',
        imgSrc: '/icons/my_url.svg',
        imgAlt: '',
        path: '',
      },
      {
        text: 'GDSC HCMUT',
        imgSrc: '/icons/my_url.svg',
        imgAlt: '',
        path: '',
      },
    ],
  },
  {
    text: 'Log out',
    imgSrc: '/icons/logout.svg',
    imgAlt: '',
    path: '',
    logout: true,
  },
];
