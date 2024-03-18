import Icon from '@/components/icon';
import { SidebarItem } from '@/types/sidebar-item';

export const sidebarItems: SidebarItem[] = [
  {
    name: 'URLS',
    children: [
      {
        text: 'My URLs',
        iconFile: Icon.LinkDiagIcon,
        imgAlt: 'Link Icon',
        path: '/urls',
      },
      {
        text: 'Analytics Dashboard',
        iconFile: Icon.StatisticIcon,
        imgAlt: 'Statistic Icon',
        path: '/url-analytics',
      },
    ],
  },
  {
    name: 'CAMPAIGNS',
    children: [
      {
        text: 'My Collection',
        iconFile: Icon.MyUrlIcon,
        imgAlt: 'My Url Icon',
        path: '/collection',
      },
      {
        text: 'Analytics Dashboard',
        iconFile: Icon.TimelineIcon,
        imgAlt: 'Timeline Icon',
        path: '/campaign-analytics',
      },
    ],
  },
  {
    name: 'MANAGEMENT',
    children: [
      {
        text: 'Organization',
        iconFile: Icon.OrganizationIcon,
        imgAlt: 'Organization Icon',
        path: '/organization',
      },
      {
        text: 'Custom Domain',
        iconFile: Icon.DomainIcon,
        imgAlt: 'Domain Icon',
        path: '/custom-domain',
      },
    ],
  },
];
