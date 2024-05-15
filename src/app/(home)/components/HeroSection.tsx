import HomeTools from './HomeTools';

export default function HeroSection() {
  return (
    <div className="xl:min-h-none mb-[80px] h-screen min-h-[800px] bg-[url('/images/home/background_1.png')] bg-cover bg-fixed xl:mb-0">
      <div className='relative h-[100%] bg-primary/[0.7] px-[20px] pt-[160px] xl:flex xl:flex-row xl:items-center xl:justify-between xl:px-[calc(160px-(1920px-100vw)/3)] xl:pt-0'>
        <div className='mb-[60px] text-white xl:mx-[20px] xl:mb-0 xl:max-w-[560px]'>
          <div data-aos='fade-down' data-aos-duration='1000'>
            <h2 className='text-[32px] leading-[1.2] md:text-[28px] xl:text-[40px]'>Welcome to</h2>
            <h1 className='mb-[20px] text-[52px] font-[700] leading-[1.2] md:mb-[20px] md:text-[48px] xl:text-[64px]'>
              Fessior Tools
            </h1>
          </div>
          <p
            data-aos='fade-up'
            data-aos-duration='1000'
            className='leading-[24px] md:max-w-[60%] xl:mt-[20px] xl:max-w-none xl:text-[20px]'
          >
            Discover a world of community-driven tools that simplify your daily tasks. Fessior Tools is your one-stop
            destination for essential utilities. Join our community and enhance your everyday life with the power of
            innovation.
          </p>
        </div>
        <HomeTools />
        <div className='absolute bottom-[0] left-[0] z-[1] w-[100%]'>
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
                <path id='gentle-wave' d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z' />
              </defs>
              <g className='parallax'>
                <use xlinkHref='#gentle-wave' x='48' y='0' fill='rgba(255,255,255,0.7)' />
                <use xlinkHref='#gentle-wave' x='48' y='3' fill='rgba(255,255,255,0.5)' />
                <use xlinkHref='#gentle-wave' x='48' y='5' fill='rgba(255,255,255,0.3)' />
                <use xlinkHref='#gentle-wave' x='48' y='7' fill='#fff' />
              </g>
            </svg>
          </div>
          {/* <!--Waves end--> */}
        </div>
      </div>
    </div>
  );
}
