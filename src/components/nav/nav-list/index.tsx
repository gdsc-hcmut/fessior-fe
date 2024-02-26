import { NavItem as NavItemType } from '@/libs/api/types/nav-item';

import NavItem from '../nav-item';

type NavListProps = { items: NavItemType[] };

export default function NavList(props: NavListProps) {
  const { items } = props;

  return (
    <ul className='md:flex md:h-[100%] md:w-[100%] md:flex-col md:flex-wrap md:content-start md:justify-between md:ps-[20px] lg:flex-row lg:justify-around'>
      {items.map((item) => (
        <NavItem key={item.text} {...item} />
      ))}
    </ul>
  );
}
