import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import { Project } from '@/services/project.service';
import ScreenSize from '@/types/screen-size-enum';

import HomeAvailableToolIndicator from '../home-available-tool-indicator';

type HomeProjectItemProps = {
  name: string;
  description: string;
  imgSrc: string;
  imgAlt: string;
  url: string;
  className?: string;
};

export function HomeProjectItem(props: HomeProjectItemProps) {
  const { name, description, imgSrc, imgAlt, url, className } = props;

  return (
    <Link
      href={url}
      className={clsx(
        className,
        'relative flex h-[500px] flex-col rounded-[20px] shadow-[0px_18.83px_47.08px_0px_rgba(47,50,125,0.10)] transition-all duration-200 hover:scale-105 md:h-[450px]',
      )}
    >
      <img src={imgSrc} alt={imgAlt} className='w-[100%]' />
      <div className='flex flex-grow flex-col p-[20px]'>
        <div className='flex-grow'>
          <h6 className='mb-[12px] text-[28px] font-[500]'>{name}</h6>
          <p className='overflow-hidden tracking-[0.32px] lg:max-h-[144px]'>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

type HomeProjectCarouselProps = {
  projects: Project[];
  screenSize: ScreenSize;
  className?: string;
};

export default function HomeProjectCarousel(props: HomeProjectCarouselProps) {
  const { projects, screenSize, className } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const visibleNumber = (() => {
    if (screenSize === ScreenSize.SM) return 1;
    else if (screenSize === ScreenSize.MD) return 2;
    else return 4;
  })();

  const handleSlideChange = () => {
    setActiveIndex(
      swiper?.activeIndex ? Math.floor(swiper?.activeIndex / visibleNumber) : 0,
    );
  };

  const swiperProps = {
    slidesPerView: 1,
    breakpoints: {
      760: { slidesPerView: 2, slidesPerGroup: 2 },
      960: { slidesPerView: 4, slidesPerGroup: 4 },
    },
    className: 'mb-[32px] flex w-[100%]',
    onSwiper: (swiper: SwiperClass) => {
      setSwiper(swiper);
    },
    onSlideChange: handleSlideChange,
    modules: [Autoplay],
    autoplay: { delay: 3000 },
  };

  return (
    <div
      data-aos='fade-up'
      data-aos-delay='100'
      className={clsx('flex flex-col', className)}
    >
      <Swiper {...swiperProps}>
        {projects.map((project) => (
          <SwiperSlide className='pb-[40px]' key={project.name}>
            <HomeProjectItem {...project} className='mx-[20px] lg:mx-[10px]' />
          </SwiperSlide>
        ))}
      </Swiper>
      <HomeAvailableToolIndicator
        total={projects.length / visibleNumber}
        activeIndex={activeIndex}
        className='mb-[80px] self-center'
        onClick={(page: number) => {
          swiper?.slideTo(page * visibleNumber);
        }}
      />
    </div>
  );
}
