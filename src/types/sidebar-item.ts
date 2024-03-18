import { SVGProps } from 'react';

export type SidebarItem = {
  name: string;
  children: {
    text: string;
    iconFile: React.FC<SVGProps<SVGSVGElement>>;
    imgAlt: string;
    path: string;
  }[];
};
