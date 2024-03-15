import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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

function DateRange() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(), // Today
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
  ]);
  const [startDate, endDate] = dateRange;

  const handleDateChange = (update: [Date | null, Date | null]) => {
    setDateRange(update);
  };
  return (
    <DatePicker
      className='rounded-lg border-[1px] border-[#7E7E7E] px-2 py-1 text-xs'
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={handleDateChange}
      clearButtonClassName='after:!bg-primary'
      isClearable={true}
    />
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
      <div className='mt-5 h-[200px] w-[70vw] self-center sm:h-[240px]'>
        <RenderLineChart data={demoData} />
      </div>
    </div>
  );
}

export default GraphCard;
