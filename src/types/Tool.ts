export type Tool = {
  name: string;
  description: string;
  iconFilenames: string[];
  secondaryIconClass: string;
  primaryIconClass?: string;
  decorImgSrc: string;
  imgAlt: string;
  active: boolean;
  url: string;
};
