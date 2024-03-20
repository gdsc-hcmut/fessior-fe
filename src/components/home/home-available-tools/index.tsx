'use client';

import { ReactNode, useState } from 'react';
import { Autoplay, Controller } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import { tools } from '@/services/tool.service';

import 'swiper/css/bundle';
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
          className='mb-[20px] w-[80%] max-w-[300px] xl:w-auto xl:max-w-none'
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
    autoplay: { delay: 3000 },
  };

  const toolSwiperProps = {
    direction: 'horizontal' as 'horizontal' | 'vertical' | undefined,
    breakpoints: {
      1300: {
        direction: 'vertical' as 'horizontal' | 'vertical' | undefined,
        slidesPerView: 6,
      },
    },
    modules: [Controller],
    slidesPerView: 1,
    onSwiper: (swiper: SwiperClass) => setToolSwiper(swiper),
    className: 'max-h-[480px] w-[100%] flex-grow',
    controller: { control: infoSwiper },
  };

  return (
    <div className='mb-[80px] flex w-[100%] flex-col self-center overflow-hidden xl:mt-[60px] xl:flex-row xl:items-stretch xl:px-[calc(160px-(1920px-100vw)/3)]'>
      {/* ----------LEFT----------- */}
      <div
        data-aos='fade-right'
        className='px-[20px] xl:mx-[20px] xl:me-[60px] xl:flex xl:min-w-[287px] xl:flex-col xl:items-stretch xl:px-0'
      >
        <h5
          onClick={() => toolSwiper?.slideNext()}
          className='text-[32px] font-[700] leading-[65px] text-primary xl:ms-[16px] xl:text-[28px]'
        >
          Available Tools
        </h5>
        <Swiper {...toolSwiperProps}>{getToolList()}</Swiper>
        <HomeAvailableToolIndicator
          total={tools.length}
          activeIndex={availableToolSelecting}
          className='mb-[40px] xl:hidden'
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
