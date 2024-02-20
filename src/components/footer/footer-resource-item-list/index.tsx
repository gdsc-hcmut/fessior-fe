import { clsx } from 'clsx';
import Link from 'next/link';

type FooterResourceItemProps = {
  text: string;
  url: string;
  className?: string;
};

export function FooterResourceItem(props: FooterResourceItemProps) {
  const { text, url, className } = props;
  return (
    <li className={clsx('mb-[12px]', className)}>
      <Link className='hover:underline' href={url}>
        {text}
      </Link>
    </li>
  );
}

export default function FooterResourceItemList() {
  const resourceItems = [
    { text: 'About Us', url: '#' },
    { text: 'Privacy Policy', url: '#' },
    { text: 'FAQ', url: '#' },
  ];

  return (
    <ul className='mt-[16px]'>
      {resourceItems.map((item) => (
        <FooterResourceItem key={item.text} {...item} />
      ))}
    </ul>
  );
}
