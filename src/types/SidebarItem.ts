export type SidebarItem = {
  name: string;
  children: {
    text: string;
    iconFilename: string;
    imgAlt: string;
    path: string;
  }[];
};
