import { ReactNode } from 'react';

type ToolStatisticsProps = {
  statistics: ReactNode[];
};

export default function ToolStatistics(props: ToolStatisticsProps) {
  const { statistics } = props;

  return statistics.map((statistic, index) => (
    <p
      key={index}
      className='text-[28px] text-white md:text-[24px] xl:text-[32px]'
    >
      {statistic}
    </p>
  ));
}
