import Image from 'next/image';
import Link from 'next/link';

type FooterContactItemProps = {
  text: string;
  link: string;
  iconSrc: string;
  iconWidth: number;
  iconHeight: number;
  iconAlt: string;
  className?: string;
};

export function FooterContactItem(props: FooterContactItemProps) {
  const { text, link, iconSrc, iconWidth, iconHeight, iconAlt, className } =
    props;
  return (
    <Link className={`hover:underline ${className}`} href={link}>
      <p>
        <Image
          className='me-[12px] inline-block'
          src={iconSrc}
          width={iconWidth}
          height={iconHeight}
          alt={iconAlt}
        />
        {text}
      </p>
    </Link>
  );
}

export default function FooterContactItemList() {
  const footerContactItemInfos = [
    {
      text: 'admin@fessior.com',
      link: 'mailto:admin@fessior.com',
      iconSrc: '/icons/footer/email.svg',
      iconAlt: 'email',
      iconWidth: 20,
      iconHeight: 16,
    },
    {
      text: '0937501230',
      link: 'tel:0937501230',
      iconSrc: '/icons/footer/phonelink_ring.svg',
      iconAlt: 'phonelink-ring',
      iconWidth: 24,
      iconHeight: 24,
    },
  ];

  return (
    <ul className='mt-[16px] min-w-[180px]'>
      {footerContactItemInfos.map((info) => (
        <li key={info.iconAlt} className='mb-[12px]'>
          <FooterContactItem {...info} />
        </li>
      ))}
    </ul>
  );
}
