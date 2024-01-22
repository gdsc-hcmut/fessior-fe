'use client';

import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef } from 'react';

import Button from '@/components/button';
import useScreenSize from '@/hooks/useScreenSize';
import { tools } from '@/services/tool.service';
import Icon from '@/types/icon-enum';
import { getIcon } from '@/utils/common';

type HomeAvailableToolItemProps = {
  index: number;
  name: string;
  iconFilenames: string;
  onClick: (index: number) => void;
  active?: boolean;
  className?: string;
};

type HomeAvailableToolIndicatorProps = {
  total: number;
  activeIndex: number;
  onClick: (index: number) => void;
  className?: string;
};

export function HomeAvailableToolIndicator(
  props: HomeAvailableToolIndicatorProps,
) {
  const { total, activeIndex, className, onClick } = props;
  const getIndicatorClass = (index: number) =>
    clsx(
      activeIndex === index
        ? 'w-[80px] rounded-[20px]'
        : 'w-[8px] rounded-full',
      'me-[6px] h-[8px] bg-primary',
    );
  return (
    <div className={clsx('flex', className)}>
      {[...Array(total)].map((_, index) => {
        return (
          <div
            onClick={() => onClick(index)}
            key={index}
            className={getIndicatorClass(index)}
          ></div>
        );
      })}
    </div>
  );
}

export function HomeAvailableToolItem(props: HomeAvailableToolItemProps) {
  const { name, index, iconFilenames, className, onClick, active } = props;
  const ToolItemClass = clsx(
    'mb-[16px] h-[60px] items-center justify-between rounded-[8px] px-[16px] hover:cursor-pointer hover:shadow-[0px_4px_47.08px_0px_rgba(11,40,120,0.10)] xl:flex',
    active
      ? 'flex shadow-[0px_4px_47.08px_0px_rgba(11,40,120,0.10)]'
      : 'hidden',
    className,
  );
  const nameClass = clsx(
    'text-[20px] font-[700]',
    active ? 'text-primary' : 'text-royal-300',
  );
  const activeBulletClass = clsx(
    'h-[16px] w-[16px] rounded-full bg-primary',
    active || 'hidden',
  );
  return (
    <div onClick={() => onClick(index)} className={ToolItemClass}>
      <div className='flex items-center'>
        <div className='flex min-w-[60px] items-center justify-between'>
          <Image
            src={getIcon(
              '/icons/home',
              iconFilenames,
              active ? Icon.ACTIVE : Icon.INACTIVE,
            )}
            alt=''
            width={0}
            height={0}
            className='h-[28px] w-[54px]'
          />
        </div>
        <p className={nameClass}>{name}</p>
      </div>
      <div className={activeBulletClass}></div>
    </div>
  );
}

export function ShortenerInfo() {
  return (
    <div className='flex flex-grow flex-col overflow-hidden rounded-[8px] border-t-[0.5px] shadow-[0px_4px_47.08px_0px_rgba(11,40,120,0.10)] md:flex-row xl:mx-[20px]'>
      <div className='px-[24px] py-[28px] xl:p-[40px]'>
        <h4 className='mb-[12px] text-[32px] leading-[1.2] text-primary md:mb-[8px] xl:mb-0 xl:text-[40px]'>
          Introducing <br />
          <span className='text-[10vw] font-[700] md:text-[48px] xl:text-[60px]'>
            URL Shortener
          </span>
        </h4>
        <Link href='/shorten'>
          <Button
            type='neutral'
            onClick={() => {}}
            className='mb-[20px] mt-[12px] text-[20px] font-[700] leading-5'
          >
            Access Tool
          </Button>
        </Link>
        <p className='mb-[8px] leading-[28px]'>
          <b>URL Shortener</b> is one of the first community projects developed
          by <b>Fessior Community</b> that serves the purpose of simplifying
          complex URLs (links to web pages) into short or branded links to
          enhance the brand identity of GDSC or partner organizations.
        </p>
        <p className='leading-[28px]'>
          In addition to the basic feature of URL shortening, users only need to
          log in with their Google accounts to access{' '}
          <b>advanced management features</b> completely free of charge. These
          features include:
        </p>
        <ul className='list-inside list-disc'>
          <li>
            Shorten URLs with a <b>custom slug</b>.
          </li>
          <li>
            <b>Branded links</b> for partner organizations.
          </li>
          <li>
            Shorten links’ <b>statistics</b>: total clicks, clicks per day, time
            of creation...
          </li>
          <li>
            <b>Manage</b> your list of shortened URLs; filter, edit, delete, and
            tag.
          </li>
        </ul>
      </div>
      <div className="flex aspect-square w-[100%] flex-col items-center justify-center bg-[url('/images/home/side_shortener.svg')] bg-cover md:justify-end md:pb-[36px] xl:aspect-auto xl:h-[100%] xl:w-auto xl:min-w-[400px]">
        <div className='md:mx-[20px] md:min-w-[245px]'>
          <p className='text-[28px] text-white md:text-[24px] xl:text-[32px]'>
            More than <b>700</b> users
          </p>
          <p className='text-[28px] text-white md:text-[24px] xl:text-[32px]'>
            <b>160.000</b> clicks
          </p>
          <p className='text-[28px] text-white md:text-[24px] xl:text-[32px]'>
            <b>3500</b> URLs generated
          </p>
        </div>
      </div>
    </div>
  );
}

export function ComingSoonInfo() {
  return (
    <div className='flex flex-grow flex-col overflow-hidden rounded-[8px] border-t-[0.5px] shadow-[0px_4px_47.08px_0px_rgba(11,40,120,0.10)] md:flex-row xl:mx-[20px] xl:flex-row'>
      <div className='flex flex-grow items-center justify-center p-[40px] xl:p-0'>
        <div className='flex flex-col items-center'>
          <Image
            src='/images/home/coming_soon.svg'
            alt=''
            width={0}
            height={0}
            className='mb-[48px] h-auto w-[50%]'
          />
          <h4 className='text-[36px] font-[700] text-primary md:text-[40px] xl:text-[48px]'>
            Coming Soon!
          </h4>
          <p className='text-[20px] md:text-[24px] xl:text-[28px]'>
            The project is being developed
          </p>
        </div>
      </div>
      <div className="hidden aspect-square w-[30%] flex-col items-center justify-center bg-[url('/images/home/side_coming_soon.svg')] bg-cover md:flex md:justify-end md:pb-[36px] xl:aspect-auto xl:h-[100%]"></div>
    </div>
  );
}

export default function HomeAvailableTools() {
  const [availableToolSelecting, setAvailableToolSelecting] = useState(0);
  const { screenSize, loaded } = useScreenSize();
  const sliderRef: any = useRef(null);

  const toolInfos = [<ShortenerInfo key='shorten' />];

  const handleAvailableToolChange = (index: number) => {
    setAvailableToolSelecting(index);
    sliderRef.current?.slickGoTo(index);
  };

  const getToolInfo = () => {
    return tools[availableToolSelecting].active ? (
      toolInfos[availableToolSelecting]
    ) : (
      <ComingSoonInfo />
    );
  };

  if (!loaded) return;

  return (
    <div className='mb-[80px] flex flex-col px-[20px] xl:mb-[200px] xl:flex-row xl:items-stretch xl:px-[calc(160px-(1920px-100vw)/3)]'>
      {/* ----------LEFT----------- */}
      <div className='overflow-hidden xl:mx-[20px] xl:me-[60px] xl:max-h-[521px] xl:min-w-[287px]'>
        <h5 className='text-[32px] font-[700] leading-[65px] text-primary xl:ms-[16px] xl:text-[28px]'>
          Available Tools
        </h5>
        {tools.map((tool, index) => (
          <HomeAvailableToolItem
            index={index}
            key={tool.name}
            iconFilenames={tool.iconFilenames[0]}
            name={tool.name}
            active={index === availableToolSelecting}
            className='mb-[20px] w-[80%] max-w-[300px] xl:w-auto xl:max-w-none'
            onClick={(index) => handleAvailableToolChange(index)}
          />
        ))}
        <HomeAvailableToolIndicator
          total={tools.length}
          activeIndex={availableToolSelecting}
          className='mb-[40px] xl:hidden'
          onClick={handleAvailableToolChange}
        />
      </div>
      {/* ----------RIGHT----------- */}
      {getToolInfo()}
    </div>
  );
}
