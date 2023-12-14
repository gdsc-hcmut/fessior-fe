'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import HomeAvailableToolIndicator from '@/components/home-available-tool-indicator';
import HomeAvailableToolItem from '@/components/home-available-tool-item';
import HomeProjects from '@/components/home-project';
import HomeToolItem from '@/components/home-tool-item';
import useScreenSize from '@/hooks/useScreenSize';
import { projects } from '@/services/project.service';
import { tools } from '@/services/tool.service';

export default function HomePage() {
  const [availableToolSelecting, setAvailableToolSelecting] = useState(0);
  const screenSize = useScreenSize();

  const handleAvailableToolChange = (index: number) => {
    setAvailableToolSelecting(index);
  };

  return (
    <div>
      {/* ------------PART 1-------------- */}
      <div className="lg:min-h-none mb-[80px] h-screen min-h-[800px] bg-[url('/images/home/background_1.svg')] bg-cover lg:mb-0">
        <div className='relative h-[100%] bg-primary/[0.7] px-[20px] pt-[160px] lg:flex lg:flex-row lg:items-center lg:justify-between lg:px-[calc(160px-(1920px-100vw)/3)] lg:pt-0'>
          <div className='mb-[60px] text-white lg:mx-[20px] lg:mb-0 lg:max-w-[560px]'>
            <h2 className='text-[32px] leading-[1.2] md:text-[28px] lg:text-[40px]'>
              Welcome to
            </h2>
            <h1 className='mb-[20px] text-[52px] font-[700] leading-[1.2] md:mb-[20px] md:text-[48px] lg:text-[64px]'>
              Fessior Tools
            </h1>
            <p className='leading-[24px] md:max-w-[60%] lg:mt-[20px] lg:max-w-none lg:text-[20px]'>
              Discover a world of community-driven tools that simplify your
              daily tasks. Fessior Tools is your one-stop destination for
              essential utilities. Join our community and enhance your everyday
              life with the power of innovation.
            </p>
          </div>
          <div className='relative z-[2] flex flex-wrap items-center justify-between lg:mx-[20px] lg:w-[840px]'>
            {tools.map((tool) => (
              <HomeToolItem key={tool.name} tool={tool} />
            ))}
          </div>
          <div className='absolute bottom-[0] left-[0] z-[1] w-[100%]'>
            <Image
              src='/images/home/decor.svg'
              alt='decor'
              width={0}
              height={0}
              className='w-[100%]'
            />
          </div>
        </div>
      </div>
      {/* -------------PART 2------------- */}
      <div className='mb-[80px] flex flex-col px-[20px] lg:mb-[200px] lg:flex-row lg:px-[calc(160px-(1920px-100vw)/3)]'>
        {/* ----------LEFT----------- */}
        <div className='lg:mx-[20px] lg:me-[60px] lg:min-w-[287px]'>
          <h5 className='text-[32px] font-[700] leading-[65px] text-primary lg:ms-[16px] lg:text-[28px]'>
            Available Tools
          </h5>
          {tools.map((tool, index) => (
            <HomeAvailableToolItem
              index={index}
              key={tool.name}
              imgSrc={tool.imgSrc[0]}
              name={tool.name}
              active={index === availableToolSelecting}
              className='mb-[20px] w-[80%] max-w-[300px] lg:w-auto lg:max-w-none'
              onClick={handleAvailableToolChange}
            />
          ))}
          <HomeAvailableToolIndicator
            // keys={tools.map((tool) => tool.name)}
            total={6}
            activeIndex={availableToolSelecting}
            className='mb-[40px] lg:hidden'
            onClick={handleAvailableToolChange}
          />
        </div>
        {/* ----------RIGHT----------- */}
        <div className='flex flex-col overflow-hidden rounded-[8px] border-t-[0.5px] shadow-[0px_4px_47.08px_0px_rgba(11,40,120,0.10)] md:flex-row lg:mx-[20px] lg:flex-row'>
          <div className='px-[24px] py-[28px] text-[#656C73] lg:p-[40px]'>
            <h4 className='mb-[12px] text-[32px] leading-[1.2] text-primary md:mb-[8px] lg:mb-0 lg:text-[40px]'>
              Introducing <br />
              <span className='text-[10vw] font-[700] md:text-[48px] lg:text-[60px]'>
                URL Shortener
              </span>
            </h4>
            <Link href='/shorten'>
              <button className='mb-[20px] h-[32px] w-[123px] rounded-[20px] bg-primary text-[16px] font-[700] text-white lg:h-[40px] lg:w-[145px] lg:text-[20px]'>
                Access Tool
              </button>
            </Link>
            <p className='mb-[8px] leading-[28px]'>
              <b>URL Shortener</b> is one of the first community projects
              developed by <b>Fessior Community</b> that serves the purpose of
              simplifying complex URLs (links to web pages) into short or
              branded links to enhance the brand identity of GDSC or partner
              organizations.
            </p>
            <p className='leading-[28px]'>
              In addition to the basic feature of URL shortening, users only
              need to log in with their Google accounts to access{' '}
              <b>advanced management features</b> completely free of charge.
              These features include:
            </p>
            <ul className='list-inside list-disc'>
              <li>
                Shorten URLs with a <b>custom slug</b>.
              </li>
              <li>
                <b>Branded links</b> for partner organizations.
              </li>
              <li>
                Shorten links’ <b>statistics</b>: total clicks, clicks per day,
                time of creation...
              </li>
              <li>
                <b>Manage</b> your list of shortened URLs; filter, edit, delete,
                and tag.
              </li>
            </ul>
          </div>
          <div className="flex aspect-square w-[100%] flex-col items-center justify-center bg-[url('/images/home/side_shortener.svg')] bg-cover md:justify-end md:pb-[36px] lg:aspect-auto lg:h-[100%] lg:w-auto lg:min-w-[400px]">
            <div className='md:mx-[20px] md:min-w-[245px]'>
              <p className='text-[28px] text-white md:text-[24px] lg:text-[32px]'>
                More than <b>700</b> users
              </p>
              <p className='text-[28px] text-white md:text-[24px] lg:text-[32px]'>
                <b>160.000</b> clicks
              </p>
              <p className='text-[28px] text-white md:text-[24px] lg:text-[32px]'>
                <b>3500</b> URLs generated
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ----------PART 3------------ */}
      <div className="flex flex-col items-center justify-center bg-[url('/images/home/background_2.svg')] bg-cover px-[20px] pb-[60px] pt-[36px] md:flex-row md:justify-between md:pb-[36px] lg:h-[720px] lg:flex-row lg:justify-between lg:px-[calc(160px-(1920px-100vw)/3)]">
        <div className='mb-[60px] md:mb-0 md:w-[45%] lg:mx-[20px] lg:w-auto lg:max-w-[600px]'>
          <h4 className='mb-[16px] text-[28px] leading-[1.2] text-white md:text-[24px] lg:mb-[20px] lg:text-[40px]'>
            Developed By <br />
            <span className='text-[9vw] font-[700] text-white md:text-[36px] lg:text-[64px]'>
              Fessior Community
            </span>
          </h4>
          <p className='mb-[28px] leading-[24px] text-white lg:mb-[40px]'>
            Fessior Community focuses on developing community projects in
            collaboration with partners and organizations. Our activities
            involve the development of technology products to meet the needs of
            students within and beyond the club, as well as enhancing access to
            real-world projects for university students.
          </p>
          <Link
            className='text-[20px] font-[500] text-white underline'
            href='#'
          >
            Details
          </Link>
        </div>
        <div className='flex max-w-[428px] flex-wrap items-center justify-between md:w-[45%] lg:mx-[20px]'>
          <div className='relative bottom-[20px] mb-[16px] flex aspect-square w-[calc((100%-16px)/2)] flex-col items-center justify-center rounded-[20px] bg-white'>
            <p className='mb-[8px] text-[40px] font-[700] text-primary'>2021</p>
            <p className='font-[500]'>Establishment</p>
          </div>
          <div className='relative top-[20px] mb-[16px] flex aspect-square w-[calc((100%-16px)/2)] flex-col items-center justify-center rounded-[20px] bg-white'>
            <p className='mb-[8px] text-[40px] font-[700] text-primary'>
              3000+
            </p>
            <p className='font-[500]'>Users</p>
          </div>
          <div className='relative bottom-[20px] flex aspect-square w-[calc((100%-16px)/2)] flex-col items-center justify-center rounded-[20px] bg-white'>
            <p className='mb-[8px] text-[40px] font-[700] text-primary'>15+</p>
            <p className='font-[500]'>Projects Developed</p>
          </div>
          <div className='relative top-[20px] flex aspect-square w-[calc((100%-16px)/2)] flex-col items-center justify-center rounded-[20px] bg-white'>
            <p className='mb-[8px] text-[40px] font-[700] text-primary'>10+</p>
            <p className='font-[500]'>External Partners</p>
          </div>
        </div>
      </div>
      {/* ----------PART 4------------- */}
      <div className='flex flex-col px-[20px] lg:px-[calc(160px-(1920px-100vw)/3)]'>
        <h3 className='mb-[40px] mt-[80px] text-[40px] font-[700] text-primary lg:mx-[20px]'>
          Our Projects
        </h3>
        {screenSize && (
          <HomeProjects
            projects={projects}
            screenSize={screenSize}
            className='lg:mx-[10px]'
          />
        )}
      </div>
    </div>
  );
}
