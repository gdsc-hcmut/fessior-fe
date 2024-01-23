import { NavItem } from './types/nav-item';

export const navItems: NavItem[] = [
  {
    text: 'Home',
    iconFilename: 'home.svg',
    imgAlt: '',
    path: '/',
  },
  {
    text: 'URL Shortener',
    iconFilename: 'shortener.svg',
    imgAlt: '',
    path: '',
    children: [
      {
        text: 'Shorten Now',
        iconFilename: 'my_url.svg',
        imgAlt: '',
        path: '/shorten',
      },
      {
        text: 'My URLs',
        iconFilename: 'statistics.svg',
        imgAlt: '',
        path: '/statistics',
      },
    ],
  },
  {
    text: 'Organization',
    iconFilename: 'organization.svg',
    imgAlt: '',
    path: '/organization',
  },
  {
    text: 'About Us',
    iconFilename: 'about.svg',
    imgAlt: '',
    path: '',
    children: [
      {
        text: 'Fessior Community',
        iconFilename: 'my_url.svg',
        imgAlt: '',
        path: '',
      },
      {
        text: 'GDSC HCMUT',
        iconFilename: 'my_url.svg',
        imgAlt: '',
        path: '',
      },
    ],
  },
  {
    text: 'Log out',
    iconFilename: 'logout.svg',
    imgAlt: '',
    path: '',
    logout: true,
  },
];
