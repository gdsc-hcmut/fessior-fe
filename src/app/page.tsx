'use client';

import AOS from 'aos';
import Link from 'next/link';
import { useEffect } from 'react';
import CountUp from 'react-countup';

import Footer from '@/components/footer';
import Header from '@/components/header';
import HomeAvailableTools from '@/components/home/home-available-tools';
import HomeProjectCarousel from '@/components/home/home-project-carousel';
import HomeTools from '@/components/home/home-tools';
import useScreenSize from '@/hooks/useScreenSize';
import { projects } from '@/services/project.service';
import 'aos/dist/aos.css';
import './css/index.css';

export default function HomePage() {
  const { screenSize, loaded } = useScreenSize();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Header />
      <div className='flex flex-col'>
        {/* ------------PART 1-------------- */}
        <div className="xl:min-h-none mb-[80px] h-screen min-h-[800px] bg-[url('/images/home/background_1.png')] bg-cover bg-fixed xl:mb-0">
          <div className='relative h-[100%] bg-primary/[0.7] px-[20px] pt-[160px] xl:flex xl:flex-row xl:items-center xl:justify-between xl:px-[calc(160px-(1920px-100vw)/3)] xl:pt-0'>
            <div className='mb-[60px] text-white xl:mx-[20px] xl:mb-0 xl:max-w-[560px]'>
              <div data-aos='fade-down' data-aos-duration='1000'>
                <h2 className='text-[32px] leading-[1.2] md:text-[28px] xl:text-[40px]'>
                  Welcome to
                </h2>
                <h1 className='mb-[20px] text-[52px] font-[700] leading-[1.2] md:mb-[20px] md:text-[48px] xl:text-[64px]'>
                  Fessior Tools
                </h1>
              </div>
              <p
                data-aos='fade-up'
                data-aos-duration='1000'
                className='leading-[24px] md:max-w-[60%] xl:mt-[20px] xl:max-w-none xl:text-[20px]'
              >
                Discover a world of community-driven tools that simplify your
                daily tasks. Fessior Tools is your one-stop destination for
                essential utilities. Join our community and enhance your
                everyday life with the power of innovation.
              </p>
            </div>
            <HomeTools />
            <div className='absolute bottom-[0] left-[0] z-[1] w-[100%]'>
              {/* <Image
                src='/icons/home/decor.svg'
                alt='decor'
                width={0}
                height={0}
                className='w-[100%]'
              /> */}
              {/* <!--Waves Container--> */}
              <div>
                <svg
                  className='waves'
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  viewBox='0 24 150 28'
                  preserveAspectRatio='none'
                  shapeRendering='auto'
                >
                  <defs>
                    <path
                      id='gentle-wave'
                      d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'
                    />
                  </defs>
                  <g className='parallax'>
                    <use
                      xlinkHref='#gentle-wave'
                      x='48'
                      y='0'
                      fill='rgba(255,255,255,0.7)'
                    />
                    <use
                      xlinkHref='#gentle-wave'
                      x='48'
                      y='3'
                      fill='rgba(255,255,255,0.5)'
                    />
                    <use
                      xlinkHref='#gentle-wave'
                      x='48'
                      y='5'
                      fill='rgba(255,255,255,0.3)'
                    />
                    <use xlinkHref='#gentle-wave' x='48' y='7' fill='#fff' />
                  </g>
                </svg>
              </div>
              {/* <!--Waves end--> */}
            </div>
          </div>
        </div>

        {/* -------------PART 2------------- */}
        <HomeAvailableTools />
        {/* ----------PART 3------------ */}
        <div className="flex flex-col items-center justify-center bg-[url('/images/home/background_2.png')] bg-cover bg-fixed px-[20px] pb-[60px] pt-[36px] md:flex-row md:justify-between md:pb-[36px] xl:h-[720px] xl:flex-row xl:justify-between xl:px-[calc(160px-(1920px-100vw)/3)]">
          <div
            data-aos='fade-down'
            data-aos-delay='200'
            className='mb-[60px] md:mb-0 md:w-[45%] xl:mx-[20px] xl:w-auto xl:max-w-[600px]'
          >
            <h4 className='mb-[16px] text-[28px] leading-[1.2] text-white md:text-[24px] xl:mb-[20px] xl:text-[40px]'>
              Developed By <br />
              <span className='text-[9vw] font-[700] text-white md:text-[36px] xl:text-[64px]'>
                Fessior Community
              </span>
            </h4>
            <p className='mb-[28px] leading-[24px] text-white xl:mb-[40px]'>
              Fessior Community focuses on developing community projects in
              collaboration with partners and organizations. Our activities
              involve the development of technology products to meet the needs
              of students within and beyond the club, as well as enhancing
              access to real-world projects for university students.
            </p>
            <Link
              className='text-[20px] font-[500] text-white underline'
              href='#'
            >
              Details
            </Link>
          </div>
          <div className='flex max-w-[428px] flex-wrap items-center justify-between md:w-[45%] xl:mx-[20px]'>
            <div className='relative bottom-[20px] mb-[16px] flex aspect-square w-[calc((100%-16px)/2)] flex-col items-center justify-center rounded-[20px] bg-white'>
              <p className='mb-[8px] text-[40px] font-[700] text-primary'>
                <CountUp
                  start={2001}
                  end={2021}
                  useGrouping={false}
                  duration={1}
                  enableScrollSpy
                  useEasing={false}
                />
              </p>
              <p className='font-[500]'>Establishment</p>
            </div>
            <div className='relative top-[20px] mb-[16px] flex aspect-square w-[calc((100%-16px)/2)] flex-col items-center justify-center rounded-[20px] bg-white'>
              <p className='mb-[8px] text-[40px] font-[700] text-primary'>
                <CountUp
                  start={2990}
                  end={3000}
                  duration={1}
                  enableScrollSpy
                  useEasing={false}
                />
                +
              </p>
              <p className='font-[500]'>Users</p>
            </div>
            <div className='relative bottom-[20px] flex aspect-square w-[calc((100%-16px)/2)] flex-col items-center justify-center rounded-[20px] bg-white'>
              <p className='mb-[8px] text-[40px] font-[700] text-primary'>
                <CountUp
                  start={5}
                  end={15}
                  duration={1}
                  enableScrollSpy
                  useEasing={false}
                />
                +
              </p>
              <p className='font-[500]'>Projects Developed</p>
            </div>
            <div className='relative top-[20px] flex aspect-square w-[calc((100%-16px)/2)] flex-col items-center justify-center rounded-[20px] bg-white'>
              <p className='mb-[8px] text-[40px] font-[700] text-primary'>
                <CountUp
                  end={10}
                  duration={1}
                  enableScrollSpy
                  useEasing={false}
                />
                +
              </p>
              <p className='font-[500]'>External Partners</p>
            </div>
          </div>
        </div>
        {/* ----------PART 4------------- */}
        <div className='flex flex-col lg:px-[20px] xl:px-[calc(160px-(1920px-100vw)/3)]'>
          <h3
            data-aos='fade-down'
            data-aos-delay='100'
            className='mb-[40px] mt-[80px] px-[20px] text-[40px] font-[700] text-primary lg:px-0 xl:mx-[20px]'
          >
            Our Projects
          </h3>
          {loaded && (
            <HomeProjectCarousel
              projects={projects}
              screenSize={screenSize!}
              className='xl:mx-[10px]'
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
