import { clsx } from 'clsx';
import Link from 'next/link';

type FooterResourceItemProps = {
  text: string;
  link: string;
  className?: string;
};

export function FooterResourceItem(props: FooterResourceItemProps) {
  const { text, link, className } = props;
  return (
    <li className={clsx('mb-[12px]', className)}>
      <Link className='hover:underline' href={link}>
        {text}
      </Link>
    </li>
  );
}

export default function FooterResourceItemList() {
  return (
    <ul className='mt-[16px]'>
      <FooterResourceItem text='About Us' link='#' />
      <FooterResourceItem text='Privacy Policy' link='#' />
      <FooterResourceItem text='FAQ' link='#' />
    </ul>
  );
}
