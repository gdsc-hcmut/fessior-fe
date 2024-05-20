import './index.css';

import { clsx } from 'clsx';
import { useMemo, useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import HomeAvailableToolIndicator from '@/components/home/home-available-tool-indicator';
import { projects } from '@/data/projects';
import { useScreenSize } from '@/hooks';

import ProjectCarouselItem from './ProjectCarouselItem';

import ScreenSize from '@/types/screen-size-enum';

type ProjectCarouselProps = {
  className?: string;
};

export default function ProjectCarousel({ className }: ProjectCarouselProps) {
  const { screenSize } = useScreenSize();

  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const projectNumberPerPage = useMemo(() => {
    if (screenSize === ScreenSize.SM) return 1;
    else if (screenSize === ScreenSize.MD) return 2;
    else return 4;
  }, [screenSize]);

  const swiperProps = useMemo(() => {
    return {
      slidesPerView: 1,
      breakpoints: {
        760: { slidesPerView: 2, slidesPerGroup: 2 },
        960: { slidesPerView: 4, slidesPerGroup: 4 },
      },
      className: 'flex w-full',
      onSwiper: (swiperRef: SwiperClass) => {
        setSwiper(swiperRef);
      },
      onSlideChange: () => {
        setActiveIndex(swiper?.activeIndex ? Math.floor(swiper?.activeIndex / projectNumberPerPage) : 0);
      },
      modules: [Autoplay],
      autoplay: { delay: 3000 },
    };
  }, [projectNumberPerPage, swiper?.activeIndex]);

  return (
    <div
      data-aos='fade-up'
      data-aos-delay='100'
      className={clsx('flex flex-col', className)}
      id='home-project-carousel'
    >
      <Swiper {...swiperProps}>
        {projects.map((project) => (
          <SwiperSlide className='pb-10' key={project.name}>
            <ProjectCarouselItem {...project} className='mx-5 lg:mx-2.5' />
          </SwiperSlide>
        ))}
      </Swiper>
      <HomeAvailableToolIndicator
        total={projects.length / projectNumberPerPage}
        activeIndex={activeIndex}
        className='mb-20 self-center'
        onClick={(page: number) => {
          swiper?.slideTo(page * projectNumberPerPage);
        }}
      />
    </div>
  );
}
