import Link from 'next/link';

type FooterResourceItemProps = {
  text: string;
  link: string;
  className?: string;
};

export default function FooterResourceItem(props: FooterResourceItemProps) {
  const { text, link, className } = props;
  return (
    <li className={className}>
      <Link className='hover:underline' href={link}>
        {text}
      </Link>
    </li>
  );
}
