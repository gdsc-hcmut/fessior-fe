import Image from 'next/image';
import Link from 'next/link';

type SocialMediaButtonProps = {
  link: string;
  iconSrc: string;
  iconAlt: string;
};

export function SocialMediaButton(props: SocialMediaButtonProps) {
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

export default function SocialMediaButtonList() {
  const socialMediaButtonInfos = [
    {
      link: 'https://facebook.com/dscxhcmut',
      iconSrc: '/icons/footer/facebook.svg',
      iconAlt: 'facebook',
    },
    {
      link: 'https://furl.one/discord',
      iconSrc: '/icons/footer/discord.svg',
      iconAlt: 'discord',
    },
    {
      link: 'https://www.linkedin.com/company/gdschcmut/mycompany/',
      iconSrc: '/icons/footer/linkedin.svg',
      iconAlt: 'linkedin',
    },
  ];

  return (
    <div className='flex'>
      {socialMediaButtonInfos.map((info) => (
        <SocialMediaButton key={info.iconAlt} {...info} />
      ))}
    </div>
  );
}
