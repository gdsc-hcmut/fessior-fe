type NonEmptyArray<T> = [T, ...T[]];

export type NavItem = {
  text: string;
  iconFilename: string;
  imgAlt: string;
  path: string;
  logout?: boolean;
  children?: NonEmptyArray<
    Pick<NavItem, 'text' | 'iconFilename' | 'imgAlt' | 'path'>
  >;
};
