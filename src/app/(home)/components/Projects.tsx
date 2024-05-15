import ProjectCarousel from './ProjectCarousel';

export default function Projects() {
  return (
    <div className='flex flex-col lg:px-[20px] xl:px-[calc(160px-(1920px-100vw)/3)]'>
      <h3
        data-aos='fade-down'
        data-aos-delay='100'
        className='mb-[20px] mt-[80px] px-[20px] text-[40px] font-[700] text-primary lg:px-0 xl:mx-[20px]'
      >
        Our Projects
      </h3>
      <ProjectCarousel className='xl:mx-[10px]' />
    </div>
  );
}
