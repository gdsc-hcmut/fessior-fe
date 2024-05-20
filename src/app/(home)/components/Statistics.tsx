import CountUp from 'react-countup';

export default function Statistics() {
  return (
    <div className="flex flex-col items-center justify-center bg-[url('/images/home/background_2.png')] bg-cover bg-fixed px-5 pb-14 pt-9 md:flex-row md:justify-between md:pb-9 xl:h-[720px] xl:flex-row xl:justify-between xl:px-[calc(160px-(1920px-100vw)/3)]">
      <div
        data-aos='fade-down'
        data-aos-delay='200'
        className='mb-14 md:mb-0 md:w-[45%] xl:mx-5 xl:w-auto xl:max-w-[600px]'
      >
        <h4 className='mb-4 text-3xl text-white md:text-2xl xl:mb-5 xl:text-4xl'>
          Developed By <br />
          <span className='text-[9vw] font-bold text-white md:text-4xl xl:text-6xl'>Fessior Community</span>
        </h4>
        <p className='mb-7 leading-[24px] text-white xl:mb-10'>
          Fessior Community focuses on developing community projects in collaboration with partners and organizations.
          Our activities involve the development of technology products to meet the needs of students within and beyond
          the club, as well as enhancing access to real-world projects for university students.
        </p>
      </div>
      <div className='flex max-w-[428px] flex-wrap items-center justify-between md:w-[45%] xl:mx-5'>
        <div className='relative bottom-5 mb-4 flex aspect-square w-[calc((100%-16px)/2)] flex-col items-center justify-center rounded-3xl bg-white'>
          <p className='mb-2 text-4xl font-bold text-primary'>
            <CountUp start={2001} end={2021} useGrouping={false} duration={1} enableScrollSpy useEasing={false}>
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          </p>
          <p className='font-medium'>Establishment</p>
        </div>
        <div className='relative top-5 mb-4 flex aspect-square w-[calc((100%-16px)/2)] flex-col items-center justify-center rounded-3xl bg-white'>
          <p className='mb-[8px] text-[40px] font-[700] text-primary'>
            <CountUp start={2990} end={3000} duration={1} enableScrollSpy useEasing={false} suffix='+'>
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          </p>
          <p className='font-medium'>Users</p>
        </div>
        <div className='relative bottom-5 flex aspect-square w-[calc((100%-16px)/2)] flex-col items-center justify-center rounded-3xl bg-white'>
          <p className='mb-[8px] text-[40px] font-[700] text-primary'>
            <CountUp start={5} end={15} duration={1} enableScrollSpy useEasing={false} suffix='+'>
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          </p>
          <p className='font-medium'>Projects Developed</p>
        </div>
        <div className='relative top-5 flex aspect-square w-[calc((100%-16px)/2)] flex-col items-center justify-center rounded-3xl bg-white'>
          <p className='mb-[8px] text-[40px] font-[700] text-primary'>
            <CountUp end={10} duration={1} enableScrollSpy useEasing={false} suffix='+'>
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          </p>
          <p className='font-medium'>External Partners</p>
        </div>
      </div>
    </div>
  );
}
