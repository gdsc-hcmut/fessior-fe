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
        path: '/urls',
      },
    ],
  },
  {
    text: 'Tools',
    iconFilename: 'shortener.svg',
    imgAlt: '',
    path: '',
    children: [
      {
        text: 'URL Shortener',
        iconFilename: 'my_url.svg',
        imgAlt: '',
        path: '/shorten',
      },
      {
        text: 'QR Generator',
        iconFilename: 'statistics.svg',
        imgAlt: '',
        path: '/qr',
      },
    ],
  },
  {
    text: 'Resources',
    iconFilename: 'about.svg',
    imgAlt: '',
    path: '',
    children: [
      {
        text: 'About us',
        iconFilename: 'my_url.svg',
        imgAlt: '',
        path: '/about-us',
      },
      {
        text: 'Partnership',
        iconFilename: 'my_url.svg',
        imgAlt: '',
        path: '/partnership',
      },
      {
        text: 'Contact us',
        iconFilename: 'my_url.svg',
        imgAlt: '',
        path: '/contact-us',
      },
    ],
  },
  {
    text: 'Log out',
    iconFilename: 'logout.svg',
    imgAlt: '',
    path: '',
    isLogout: true,
  },
];
