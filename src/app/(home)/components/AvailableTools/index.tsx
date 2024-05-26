'use client';

import 'swiper/css/bundle';
import './index.css';

import { useCallback, useState } from 'react';
import { Autoplay, Controller } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import ToolInfoTemplate from '@/components/home/tool-info-template';
import { homeAvailableToolComponents } from '@/data/homeAvailableToolComponents';
import { tools } from '@/data/tools';

import CarouselIndicator from '../CarouselIndicator';

import AvailableToolItem from './AvailableToolItem';

export default function AvailableTools() {
  const [focusingToolIndex, setFocusingToolIndex] = useState(0);
  const [toolNameSwiper, setToolNameSwiper] = useState<SwiperClass | null>(null);
  const [toolInfoSwiper, setToolInfoSwiper] = useState<SwiperClass | null>(null);

  const handleToolChange = useCallback(
    (index: number) => {
      setFocusingToolIndex(index);
      toolInfoSwiper?.slideTo(index);
    },
    [setFocusingToolIndex, toolInfoSwiper],
  );

  const toolInfoSwiperProps = {
    onSwiper: setToolInfoSwiper,
    controller: { control: toolNameSwiper },
    modules: [Autoplay, Controller],
    onSlideChange: () => setFocusingToolIndex(toolInfoSwiper?.activeIndex ?? 0),
    className: 'relative w-full',
    autoplay: { delay: 10000 },
  };

  const toolNameSwiperProps = {
    direction: 'horizontal' as 'horizontal' | 'vertical' | undefined,
    breakpoints: {
      960: {
        direction: 'vertical' as 'horizontal' | 'vertical' | undefined,
        slidesPerView: 6,
      },
    },
    modules: [Controller],
    slidesPerView: 1,
    onSwiper: (swiper: SwiperClass) => setToolNameSwiper(swiper),
    className: 'max-h-[520px] w-full flex-grow',
    controller: { control: toolInfoSwiper },
  };

  return (
    <div className='mb-20 flex w-full flex-col self-center overflow-hidden px-5 lg:mt-16 lg:flex-row lg:items-stretch lg:px-[calc(160px-(1920px-100vw)/3)]'>
      <div
        id='home-available-tools-left'
        data-aos='fade-right'
        className='lg:me-5 lg:flex lg:min-w-[336px] lg:flex-col xl:items-stretch'
      >
        <h5 onClick={() => toolNameSwiper?.slideNext()} className='text-3xl font-bold text-primary lg:ms-7'>
          Available Tools
        </h5>
        {/* ----------LEFT SWIPER----------- */}
        <Swiper {...toolNameSwiperProps}>
          {tools.map((tool, index) => (
            <SwiperSlide className='' key={tool.name}>
              <AvailableToolItem
                index={index}
                iconFilenames={tool.iconFilenames[0]}
                name={tool.name}
                isActive={index === focusingToolIndex}
                className='mb-5 w-4/5 max-w-[300px] lg:w-auto lg:max-w-none'
                onClick={(newIndex) => handleToolChange(newIndex)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <CarouselIndicator
          total={tools.length}
          activeIndex={focusingToolIndex}
          className='mb-10 lg:hidden'
          onClick={handleToolChange}
        />
      </div>
      {/* ----------RIGHT SWIPER----------- */}
      <Swiper data-aos='fade-left' {...toolInfoSwiperProps}>
        {tools.map((tool) => (
          <SwiperSlide className='h-auto pb-10' key={tool.name}>
            <ToolInfoTemplate
              {...tool}
              description={homeAvailableToolComponents[tool.name].description()}
              statistics={homeAvailableToolComponents[tool.name].statistics()}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
