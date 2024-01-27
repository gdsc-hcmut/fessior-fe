import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

type SocialMediaButtonProps = {
  link: string;
  iconSrc: string;
  iconAlt: string;
};

export default function SocialMediaButton(props: SocialMediaButtonProps) {
  const { link, iconSrc, iconAlt } = props;
  return (
    <Link href={link}>
      <div className='me-[8px] flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-primary p-[6px]'>
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={0}
          height={0}
          className='h-[100%] w-auto'
        />
      </div>
    </Link>
  );
}
