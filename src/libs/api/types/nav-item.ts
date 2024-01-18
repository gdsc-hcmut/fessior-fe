type NonEmptyArray<T> = [T, ...T[]];

export type NavItem = {
  text: string;
  imgSrc: string;
  imgAlt: string;
  path: string;
  logout?: boolean;
  children?: NonEmptyArray<
    Pick<NavItem, 'text' | 'imgSrc' | 'imgAlt' | 'path'>
  >;
};
