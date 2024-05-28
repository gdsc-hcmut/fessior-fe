import { SidebarItem } from '@/types';

export const sidebarItems: SidebarItem[] = [
  {
    name: 'URLS',
    children: [
      {
        text: 'My URLs',
        iconFilename: 'link_diag.svg',
        imgAlt: '',
        path: '/urls',
      },
      {
        text: 'Analytics Dashboard',
        iconFilename: 'statistics.svg',
        imgAlt: '',
        path: '/url-analytics',
      },
    ],
  },
  {
    name: 'CAMPAIGNS',
    children: [
      {
        text: 'My Collection',
        iconFilename: 'my_url.svg',
        imgAlt: '',
        path: '/collection',
      },
      {
        text: 'Analytics Dashboard',
        iconFilename: 'timeline.svg',
        imgAlt: '',
        path: '/campaign-analytics',
      },
    ],
  },
  {
    name: 'MANAGEMENT',
    children: [
      {
        text: 'Organization',
        iconFilename: 'organization.svg',
        imgAlt: '',
        path: '/organization',
      },
      {
        text: 'Custom Domain',
        iconFilename: 'domain.svg',
        imgAlt: '',
        path: '/custom-domain',
      },
    ],
  },
];
