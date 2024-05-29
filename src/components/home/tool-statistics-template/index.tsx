import { ReactNode } from 'react';

type ToolStatisticsTemplateProps = {
  statistics: ReactNode[];
};

export default function ToolStatisticsTemplate(
  props: ToolStatisticsTemplateProps,
) {
  const { statistics } = props;

  return (
    <div className='md:mx-[20px] md:min-w-[245px]'>
      {statistics.map((statistic, index) => (
        <p
          key={index}
          className='text-[28px] text-white md:text-[24px] xl:text-[32px]'
        >
          {statistic}
        </p>
      ))}
    </div>
  );
}
