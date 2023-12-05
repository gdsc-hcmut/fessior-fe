import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

type SocialMediaButtonProps = {
  link: string;
  iconSrc: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
};

export default function SocialMediaButton(props: SocialMediaButtonProps) {
  const { link, iconSrc, iconAlt, iconWidth, iconHeight } = props;
  return (
    <Link href={link}>
      <div className='me-[8px] flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-primary'>
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={iconWidth}
          height={iconHeight}
        />
      </div>
    </Link>
  );
}
