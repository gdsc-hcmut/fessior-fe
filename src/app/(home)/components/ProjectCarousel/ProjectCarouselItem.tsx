import clsx from 'clsx';
import Link from 'next/link';

type ProjectCarouselItemProps = {
  name: string;
  description: string;
  imgSrc: string;
  imgAlt: string;
  url: string;
  className?: string;
};

export default function ProjectCarouselItem({
  name,
  description,
  imgSrc,
  imgAlt,
  url,
  className,
}: ProjectCarouselItemProps) {
  return (
    <Link
      href={url}
      className={clsx(
        className,
        'relative flex h-[500px] flex-col rounded-[20px] border-[1px] shadow-[0px_18.83px_47.08px_-15px_rgba(47,50,125,0.10)] transition-all duration-200 hover:scale-105 md:h-[450px]',
      )}
    >
      <img src={imgSrc} alt={imgAlt} className='w-[100%]' />
      <div className='flex flex-grow flex-col p-[20px]'>
        <div className='flex-grow'>
          <h6 className='mb-[12px] text-[28px] font-[500]'>{name}</h6>
          <p className='overflow-hidden tracking-[0.32px] lg:max-h-[144px]'>{description}</p>
        </div>
      </div>
    </Link>
  );
}
