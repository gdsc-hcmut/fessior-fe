'use client';

import 'swiper/css/bundle';
import './index.css';

import { ReactNode, useState } from 'react';
import { Autoplay, Controller } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import { tools } from '@/data/tools';

import HomeAvailableToolIndicator from '../home-available-tool-indicator';
import {
  ShortenerDescription,
  ShortenerStatistics,
  CalendarDescription,
  CalendarStatistics,
  CertificateDescription,
  CertificateStatistics,
  CodeWithMeDescription,
  CodeWithMeStatistics,
  QNADescription,
  QNAStatistics,
  QRGeneratorDescription,
  QRGeneratorStatistics,
} from '../home-available-tool-infos';
import HomeAvailableToolItem from '../home-available-tool-item';
import ToolInfoTemplate from '../tool-info-template';

export default function HomeAvailableTools() {
  const [availableToolSelecting, setAvailableToolSelecting] = useState(0);
  const [toolSwiper, setToolSwiper] = useState<SwiperClass | null>(null);
  const [infoSwiper, setInfoSwiper] = useState<SwiperClass | null>(null);

  const toolInfos: {
    [key in string]: { description: ReactNode; statistics: ReactNode };
  } = {
    'URL Shortener': {
      description: <ShortenerDescription />,
      statistics: <ShortenerStatistics />,
    },
    'QR Generator': {
      description: <QRGeneratorDescription />,
      statistics: <QRGeneratorStatistics />,
    },
    'GDSC Certificate': {
      description: <CertificateDescription />,
      statistics: <CertificateStatistics />,
    },
    'GDSC Calendar': {
      description: <CalendarDescription />,
      statistics: <CalendarStatistics />,
    },
    'Code with Me': {
      description: <CodeWithMeDescription />,
      statistics: <CodeWithMeStatistics />,
    },
    'GDSC Q&A': {
      description: <QNADescription />,
      statistics: <QNAStatistics />,
    },
  };

  const handleAvailableToolChange = (index: number) => {
    setAvailableToolSelecting(index);
    infoSwiper?.slideTo(index);
  };

  const getToolInfos = () => {
    return tools.map((tool) => (
      <SwiperSlide className='h-auto pb-[40px]' key={tool.name}>
        <ToolInfoTemplate
          {...tool}
          description={toolInfos[tool.name].description}
          statistics={toolInfos[tool.name].statistics}
        />
      </SwiperSlide>
    ));
  };

  const getToolList = () => {
    return tools.map((tool, index) => (
      <SwiperSlide key={tool.name}>
        <HomeAvailableToolItem
          index={index}
          iconFilenames={tool.iconFilenames[0]}
          name={tool.name}
          active={index === availableToolSelecting}
          className='mb-[20px] w-[80%] max-w-[300px] lg:w-auto lg:max-w-none'
          onClick={(index) => handleAvailableToolChange(index)}
        />
      </SwiperSlide>
    ));
  };

  const infoSwiperProps = {
    onSwiper: setInfoSwiper,
    controller: { control: toolSwiper },
    modules: [Autoplay, Controller],
    onSlideChange: () => setAvailableToolSelecting(infoSwiper?.activeIndex!),
    className: 'relative w-[100%]',
    autoplay: { delay: 10000 },
  };

  const toolSwiperProps = {
    direction: 'horizontal' as 'horizontal' | 'vertical' | undefined,
    breakpoints: {
      960: {
        direction: 'vertical' as 'horizontal' | 'vertical' | undefined,
        slidesPerView: 6,
      },
    },
    modules: [Controller],
    slidesPerView: 1,
    onSwiper: (swiper: SwiperClass) => setToolSwiper(swiper),
    className: 'max-h-[520px] w-[100%] flex-grow',
    controller: { control: infoSwiper },
  };

  return (
    <div className='mb-[80px] flex w-[100%] flex-col self-center overflow-hidden px-[20px] lg:mt-[60px] lg:flex-row lg:items-stretch lg:px-[calc(160px-(1920px-100vw)/3)]'>
      {/* ----------LEFT----------- */}
      <div
        id='home-available-tools-left'
        data-aos='fade-right'
        className='lg:me-[20px] lg:flex lg:min-w-[336px] lg:flex-col xl:items-stretch'
      >
        <h5
          onClick={() => toolSwiper?.slideNext()}
          className='text-[32px] font-[700] text-primary lg:ms-[28px] lg:text-[28px]'
        >
          Available Tools
        </h5>
        <Swiper {...toolSwiperProps}>{getToolList()}</Swiper>
        <HomeAvailableToolIndicator
          total={tools.length}
          activeIndex={availableToolSelecting}
          className='mb-[40px] lg:hidden'
          onClick={handleAvailableToolChange}
        />
      </div>
      {/* ----------RIGHT----------- */}
      <Swiper data-aos='fade-left' {...infoSwiperProps}>
        {getToolInfos()}
      </Swiper>
    </div>
  );
}
