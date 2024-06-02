import { ReactNode } from 'react';

type InfoStatisticsTemplateProps = {
  statistics: ReactNode[];
};

export default function InfoStatisticsTemplate(props: InfoStatisticsTemplateProps) {
  const { statistics } = props;

  return (
    <div className='md:mx-5 md:min-w-[245px]'>
      {statistics.map((statistic, index) => (
        <p key={index} className='text-3xl text-white md:text-2xl xl:text-4xl'>
          {statistic}
        </p>
      ))}
    </div>
  );
}
