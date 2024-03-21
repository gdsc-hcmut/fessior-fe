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

import { useDateRangeStore } from '@/store/date-range';
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

  const { isSync, setIsSync, dateRange, setDateRange } = useDateRangeStore();
  const [curDateRange, setCurDateRange] = useState<[Date | null, Date | null]>([
    new Date(), // Today
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
  ]);
  const handleChangeDateRange = (update: [Date | null, Date | null]) => {
    setCurDateRange(update);
    if (isSync) setDateRange(update);
  };

  return (
    <div className='flex w-full flex-col justify-between rounded-lg bg-white px-5 py-5 shadow-[0_2px_4px_0_rgba(11,40,120,0.25)] xl:w-[44%] 2xl:w-[54%] 3xl:w-[60%]'>
      <div className='flex flex-col space-y-1 xs:flex-row xs:justify-between xs:space-y-0'>
        <p className='font-semibold text-primary xl:text-xl'>
          Engagements over time
        </p>
        <div className='datepicker'>
          <DateRange
            dateRange={isSync ? dateRange : curDateRange}
            setDateRange={handleChangeDateRange}
          />
        </div>
      </div>
      <div className='mt-1 flex items-center space-x-1 sm:mt-0'>
        <label className='inline-flex cursor-pointer items-center'>
          <input
            type='checkbox'
            value=''
            className='peer sr-only'
            checked={isSync}
            onChange={() => setIsSync(!isSync)}
          />
          <div className="peer relative h-4 w-8 rounded-full bg-white pl-1 text-white after:absolute after:start-[4px] after:top-[2px] after:h-3 after:w-3 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#0F9D58] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 rtl:peer-checked:after:-translate-x-full dark:bg-[#db4437]" />
        </label>
        <p className='font-medium'>Apply filter to both charts</p>
      </div>
      <div className='ml-[-48px] mt-5 h-[200px] w-[80vw] self-center sm:h-[240px] tablet:ml-[-28px] lg:w-[60vw] xl:w-[32vw] 3xl:mt-8 3xl:h-[300px] 3xl:w-[36vw]'>
        <RenderLineChart data={demoData} />
      </div>
    </div>
  );
}

export default GraphCard;
