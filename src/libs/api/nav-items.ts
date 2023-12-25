import { NavItem } from './types/nav-item';

export const navItems: NavItem[] = [
  {
    text: 'Home',
    imgSrc: '/icons/home.svg',
    imgAlt: '',
    href: '/',
  },
  {
    text: 'URL Shortener',
    imgSrc: '/icons/shortener.svg',
    imgAlt: '',
    href: '',
    children: [
      {
        text: 'Shorten Now',
        imgSrc: '/icons/my_url.svg',
        imgAlt: '',
        href: '/shorten',
      },
      {
        text: 'My URLs',
        imgSrc: '/icons/statistics.svg',
        imgAlt: '',
        href: '/statistics',
      },
    ],
  },
  {
    text: 'Organization',
    imgSrc: '/icons/organization.svg',
    imgAlt: '',
    href: '/organization',
  },
  {
    text: 'About Us',
    imgSrc: '/icons/about.svg',
    imgAlt: '',
    href: '',
    children: [
      {
        text: 'Fessior Community',
        imgSrc: '/icons/my_url.svg',
        imgAlt: '',
        href: '',
      },
      {
        text: 'GDSC HCMUT',
        imgSrc: '/icons/my_url.svg',
        imgAlt: '',
        href: '',
      },
    ],
  },
  {
    text: 'Log out',
    imgSrc: '/icons/logout.svg',
    imgAlt: '',
    href: '',
    logout: true,
  },
];
