import ProjectCarousel from './ProjectCarousel';

export default function Projects() {
  return (
    <div className='flex flex-col lg:px-5 xl:px-[calc(160px-(1920px-100vw)/3)]'>
      <h3
        data-aos='fade-down'
        data-aos-delay='100'
        className='mb-5 mt-20 px-5 text-4xl font-bold text-primary lg:px-0 xl:mx-5'
      >
        Our Projects
      </h3>
      <ProjectCarousel className='xl:mx-2.5' />
    </div>
  );
}
