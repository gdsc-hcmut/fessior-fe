import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { ChartData } from '@/types/url-type';

import DateRange from '../DateRange';

type RenderLineChartProps = {
  data: ChartData[];
};

const demoData = [
  { dateString: '2024-03-01', clicks: 5, count: 1 },
  { dateString: '2024-03-02', clicks: 7, count: 1 },
  { dateString: '2024-03-03', clicks: 3, count: 1 },
  { dateString: '2024-03-04', clicks: 8, count: 1 },
  { dateString: '2024-03-05', clicks: 2, count: 1 },
  { dateString: '2024-03-06', clicks: 6, count: 1 },
  { dateString: '2024-03-07', clicks: 4, count: 1 },
  { dateString: '2024-03-08', clicks: 9, count: 1 },
  { dateString: '2024-03-09', clicks: 1, count: 1 },
];

function RenderLineChart(props: RenderLineChartProps) {
  const { data } = props;

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='dateString' />
        <YAxis type='number' domain={[0, 10]} />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='clicks'
          stroke='#0B2878'
          activeDot={{ r: 8 }}
        />
        {/* <Line type='monotone' dataKey='uv' stroke='#82ca9d' /> */}
      </LineChart>
    </ResponsiveContainer>
  );
}

function GraphCard() {
  //temporary to hide recharts current errors till they are fixed
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  return (
    <div className='flex w-full flex-col justify-between rounded-lg bg-white px-5 py-5 shadow-[0_2px_4px_0_rgba(11,40,120,0.25)]'>
      <div className='flex flex-col space-y-1 xs:flex-row xs:justify-between xs:space-y-0'>
        <p className='font-semibold text-primary'>Engagements over time</p>
        <div className='datepicker'>
          <DateRange />
        </div>
      </div>
      <div className='ml-[-28px] mt-5 h-[200px] w-[80vw] self-center sm:h-[240px]'>
        <RenderLineChart data={demoData} />
      </div>
    </div>
  );
}

export default GraphCard;
