import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Project } from '@/services/project.service';

import HomeAvailableToolIndicator from '../home-available-tool-indicator';

type HomeProjectItemProps = {
  name: string;
  desc: string;
  imgSrc: string;
  imgAlt: string;
  detailLink: string;
  className?: string;
};

export function HomeProjectItem(props: HomeProjectItemProps) {
  const { name, desc, imgSrc, imgAlt, detailLink, className } = props;

  return (
    <div
      className={clsx(
        className,
        'flex min-h-[450px] flex-col rounded-[20px] shadow-[0px_18.83px_47.08px_0px_rgba(47,50,125,0.10)]',
      )}
    >
      <Image
        src={imgSrc}
        alt={imgAlt}
        width={0}
        height={0}
        className='w-[100%]'
      />
      <div className='flex flex-grow flex-col p-[20px]'>
        <div className='flex-grow'>
          <h6 className='mb-[12px] text-[28px] font-[500]'>{name}</h6>
          <p className='mb-[32px] tracking-[0.32px]'>{desc}</p>
        </div>
        <Link
          className='text-[20px] text-[#4285F4] underline'
          href={detailLink}
        >
          Details
        </Link>
      </div>
    </div>
  );
}

type HomeProjectsProps = {
  projects: Project[];
  screenSize: 'sm' | 'md' | 'lg';
  className?: string;
};

export default function HomeProjects(props: HomeProjectsProps) {
  const { projects, screenSize, className } = props;

  const [pageActive, setPageActive] = useState(0);
  const [visibleProjects, setVisibleProjects] = useState(projects);
  const visibleNumber = (() => {
    if (screenSize === 'sm') return 1;
    else if (screenSize === 'md') return 2;
    else return 4;
  })();

  useEffect(() => {
    setVisibleProjects(
      projects.slice(
        pageActive * visibleNumber,
        (pageActive + 1) * visibleNumber,
      ),
    );
  }, [pageActive, visibleNumber, projects]);

  return (
    <div className={clsx('flex flex-col', className)}>
      <div className='mb-[32px] flex'>
        {visibleProjects.map((project) => (
          <HomeProjectItem
            key={project.name}
            {...project}
            className='md:mx-[10px] md:w-[50%] lg:w-[25%]'
          />
        ))}
      </div>
      <HomeAvailableToolIndicator
        total={projects.length / visibleNumber}
        activeIndex={pageActive}
        className='mb-[80px] self-center'
        onClick={(page) => {
          setPageActive(page);
        }}
      />
    </div>
  );
}
