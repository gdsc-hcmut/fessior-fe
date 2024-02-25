import { SidebarItem } from '@/types/sidebar-item';

import DomainActive from '../../../public/icons/sidebar/active/domain.svg';
import MyUrlActive from '../../../public/icons/sidebar/active/link_diag.svg';
import MyCollectionActive from '../../../public/icons/sidebar/active/my_url.svg';
import OrganizationActive from '../../../public/icons/sidebar/active/organization.svg';
import StatisticActive from '../../../public/icons/sidebar/active/statistics.svg';
import AnalyticActive from '../../../public/icons/sidebar/active/timeline.svg';
import DomainInactive from '../../../public/icons/sidebar/inactive/domain.svg';
import MyUrlInactive from '../../../public/icons/sidebar/inactive/link_diag.svg';
import MyCollectionInactive from '../../../public/icons/sidebar/inactive/my_url.svg';
import OrganizationInactive from '../../../public/icons/sidebar/inactive/organization.svg';
import StatisticInactive from '../../../public/icons/sidebar/inactive/statistics.svg';
import AnalyticInactive from '../../../public/icons/sidebar/inactive/timeline.svg';

export const sidebarItems: SidebarItem[] = [
  {
    name: 'URLS',
    children: [
      {
        text: 'My URLs',
        iconFilename: 'link_diag.svg',
        imgAlt: '',
        path: '/urls',
        iconActive: MyUrlActive,
        iconInactive: MyUrlInactive,
      },
      {
        text: 'Analytics Dashboard',
        iconFilename: 'statistics.svg',
        imgAlt: '',
        path: '/url-analytics',
        iconActive: StatisticActive,
        iconInactive: StatisticInactive,
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
        iconActive: MyCollectionActive,
        iconInactive: MyCollectionInactive,
      },
      {
        text: 'Analytics Dashboard',
        iconFilename: 'timeline.svg',
        imgAlt: '',
        path: '/campaign-analytics',
        iconActive: AnalyticActive,
        iconInactive: AnalyticInactive,
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
        iconActive: OrganizationActive,
        iconInactive: OrganizationInactive,
      },
      {
        text: 'Custom Domain',
        iconFilename: 'domain.svg',
        imgAlt: '',
        path: '/custom-domain',
        iconActive: DomainActive,
        iconInactive: DomainInactive,
      },
    ],
  },
];
