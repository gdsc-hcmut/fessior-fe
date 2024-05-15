import CountUp from 'react-countup';

export default function Statistics() {
  return (
    <div className="flex flex-col items-center justify-center bg-[url('/images/home/background_2.png')] bg-cover bg-fixed px-[20px] pb-[60px] pt-[36px] md:flex-row md:justify-between md:pb-[36px] xl:h-[720px] xl:flex-row xl:justify-between xl:px-[calc(160px-(1920px-100vw)/3)]">
      <div
        data-aos='fade-down'
        data-aos-delay='200'
        className='mb-[60px] md:mb-0 md:w-[45%] xl:mx-[20px] xl:w-auto xl:max-w-[600px]'
      >
        <h4 className='mb-[16px] text-[28px] leading-[1.2] text-white md:text-[24px] xl:mb-[20px] xl:text-[40px]'>
          Developed By <br />
          <span className='text-[9vw] font-[700] text-white md:text-[36px] xl:text-[64px]'>Fessior Community</span>
        </h4>
        <p className='mb-[28px] leading-[24px] text-white xl:mb-[40px]'>
          Fessior Community focuses on developing community projects in collaboration with partners and organizations.
          Our activities involve the development of technology products to meet the needs of students within and beyond
          the club, as well as enhancing access to real-world projects for university students.
        </p>
      </div>
      <div className='flex max-w-[428px] flex-wrap items-center justify-between md:w-[45%] xl:mx-[20px]'>
        <div className='relative bottom-[20px] mb-[16px] flex aspect-square w-[calc((100%-16px)/2)] flex-col items-center justify-center rounded-[20px] bg-white'>
          <p className='mb-[8px] text-[40px] font-[700] text-primary'>
            <CountUp start={2001} end={2021} useGrouping={false} duration={1} enableScrollSpy useEasing={false}>
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          </p>
          <p className='font-[500]'>Establishment</p>
        </div>
        <div className='relative top-[20px] mb-[16px] flex aspect-square w-[calc((100%-16px)/2)] flex-col items-center justify-center rounded-[20px] bg-white'>
          <p className='mb-[8px] text-[40px] font-[700] text-primary'>
            <CountUp start={2990} end={3000} duration={1} enableScrollSpy useEasing={false} suffix='+'>
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          </p>
          <p className='font-[500]'>Users</p>
        </div>
        <div className='relative bottom-[20px] flex aspect-square w-[calc((100%-16px)/2)] flex-col items-center justify-center rounded-[20px] bg-white'>
          <p className='mb-[8px] text-[40px] font-[700] text-primary'>
            <CountUp start={5} end={15} duration={1} enableScrollSpy useEasing={false} suffix='+'>
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          </p>
          <p className='font-[500]'>Projects Developed</p>
        </div>
        <div className='relative top-[20px] flex aspect-square w-[calc((100%-16px)/2)] flex-col items-center justify-center rounded-[20px] bg-white'>
          <p className='mb-[8px] text-[40px] font-[700] text-primary'>
            <CountUp end={10} duration={1} enableScrollSpy useEasing={false} suffix='+'>
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          </p>
          <p className='font-[500]'>External Partners</p>
        </div>
      </div>
    </div>
  );
}
