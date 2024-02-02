import { SidebarItem } from '@/types/sidebar-item';

export const sidebarItems: SidebarItem[] = [
  {
    name: 'URLs',
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
    name: 'Campaigns',
    children: [
      {
        text: 'My Collection',
        iconFilename: 'my_url.svg',
        imgAlt: '',
        path: '/collection',
      },
      {
        text: 'Analytics Dashboard',
        iconFilename: 'home.svg',
        imgAlt: '',
        path: '/campaign-analytics',
      },
    ],
  },
  {
    name: 'Management',
    children: [
      {
        text: 'Organiazation',
        iconFilename: 'organization.svg',
        imgAlt: '',
        path: '/organization',
      },
      {
        text: 'Custom Domain',
        iconFilename: 'home.svg',
        imgAlt: '',
        path: '/custom-domain',
      },
    ],
  },
];
