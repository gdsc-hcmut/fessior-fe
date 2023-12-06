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

export default function FooterContactItem(props: FooterContactItemProps) {
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
