import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import useScreenSize from '@/hooks/useScreenSize';
import { useDateRangeStore } from '@/store/date-range';
import ScreenSize from '@/types/screen-size-enum';
import { PieChartData } from '@/types/url-type';

import DateRange from '../DateRange';

const demoSocialMedia = [
  {
    name: 'Facebook',
    clicks: 24,
    color: '#4267B2',
  },
  {
    name: 'Messenger',
    clicks: 451,
    color: '#A334FA',
  },
  {
    name: 'Youtube',
    clicks: 44,
    color: '#FF0000',
  },
  {
    name: 'Instagram',
    clicks: 58,
    color: '#E1306C',
  },
  {
    name: 'Discord',
    clicks: 44,
    color: '#7289da',
  },
];
const demoDevice = [
  {
    name: 'Android',
    clicks: 240,
    color: '#78C257',
  },
  {
    name: 'iOS',
    clicks: 45,
    color: '#555555',
  },
  {
    name: 'Windows',
    clicks: 139,
    color: '#00A1F1',
  },
  {
    name: 'Mac',
    clicks: 98,
    color: '#A2AAAD',
  },
  {
    name: 'Linux',
    clicks: 44,
    color: '#ffcc33',
  },
];
const piechartData1 = [
  {
    name: 'Android',
    value: 240,
    color: '#78C257',
  },
  {
    name: 'iOS',
    value: 45,
    color: '#555555',
  },
  {
    name: 'Windows',
    value: 139,
    color: '#00A1F1',
  },
  {
    name: 'Mac',
    value: 98,
    color: '#A2AAAD',
  },
  {
    name: 'Linux',
    value: 44,
    color: '#ffcc33',
  },
];
const piechartData2 = [
  {
    name: 'Facebook',
    value: 24,
    color: '#4267B2',
  },
  {
    name: 'Messenger',
    value: 451,
    color: '#A334FA',
  },
  {
    name: 'Youtube',
    value: 44,
    color: '#FF0000',
  },
  {
    name: 'Instagram',
    value: 58,
    color: '#E1306C',
  },
  {
    name: 'Discord',
    value: 44,
    color: '#7289da',
  },
];

type PiechartProps = {
  data: PieChartData[];
};

function ShowPieChart(props: PiechartProps) {
  const { data } = props;
  const { screenSize } = useScreenSize();
  const innerRadius =
    screenSize === ScreenSize.SM ? 44 : screenSize === ScreenSize.MD ? 68 : 68;
  const outerRadius =
    screenSize === ScreenSize.SM ? 60 : screenSize === ScreenSize.MD ? 88 : 88;

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart>
        <Pie
          data={data}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill='#0B2878'
          className='text-base'
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

function ClickStatisticCard() {
  const [isDeviceClicks, setIsDeviceClicks] = useState(true);
  const [socialMeidaList, setSocialMediaList] = useState(demoSocialMedia);
  const [deviceList, setDeviceList] = useState(demoDevice);
  const [searchText, setSearchText] = useState('');

  const { isSync, dateRange, setDateRange } = useDateRangeStore();
  const [curDateRange, setCurDateRange] = useState<[Date | null, Date | null]>([
    new Date(), // Today
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
  ]);

  const handleChangeDateRange = (update: [Date | null, Date | null]) => {
    setCurDateRange(update);
    setDateRange(update);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (isDeviceClicks) {
      setDeviceList(
        demoDevice.filter((device) =>
          device.name.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    } else {
      setSocialMediaList(
        demoSocialMedia.filter((socialMedia) =>
          socialMedia.name.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    }
  };

  return (
    <div className='relative z-[5] flex w-full flex-col items-center justify-between rounded-lg bg-white px-5 pb-5 shadow-[0_2px_4px_0_rgba(11,40,120,0.25)] xl:w-[56%] 3xl:justify-start'>
      <div className='flex w-full items-center justify-between 3xl:mb-7'>
        <div className='mb-6 flex space-x-6 self-start'>
          <button
            onClick={() => setIsDeviceClicks(true)}
            className={clsx(
              'pt-5 font-semibold',
              isDeviceClicks && 'border-t-[1px] border-primary text-primary',
            )}
          >
            <p className='hidden xs:block xl:hidden 3xl:block 3xl:text-xl'>
              Clicks from Devices
            </p>
            <p className='xs:hidden xl:block 2xl:text-xl 3xl:hidden'>Devices</p>
          </button>
          <button
            onClick={() => setIsDeviceClicks(false)}
            className={clsx(
              'pt-5 font-semibold',
              !isDeviceClicks && 'border-t-[1px] border-primary text-primary',
            )}
          >
            <p className='hidden xs:block xl:hidden 3xl:block 3xl:text-xl'>
              Clicks from Social Media
            </p>
            <p className='xs:hidden xl:block 2xl:text-xl 3xl:hidden'>
              Social Media
            </p>
          </button>
        </div>
        <div className='hidden md:block'>
          <DateRange
            dateRange={isSync && dateRange[0] ? dateRange : curDateRange}
            setDateRange={handleChangeDateRange}
          />
        </div>
      </div>
      <div className='flex w-full flex-col md:flex-row'>
        <div className='flex w-full flex-col items-center'>
          <div className='flex h-[180px] w-full items-center justify-center tablet:h-[240px]'>
            <ShowPieChart
              data={isDeviceClicks ? piechartData1 : piechartData2}
            />
          </div>
          <div className='mt-5 flex flex-col items-center space-y-1 xs:flex-row xs:space-x-3 xs:space-y-0 md:mt-0'>
            <p className='font-semibold text-primary'>
              {isDeviceClicks
                ? deviceList.reduce((acc, curr) => acc + curr.clicks, 0)
                : socialMeidaList.reduce(
                    (acc, curr) => acc + curr.clicks,
                    0,
                  )}{' '}
              Clicks
            </p>
            <div className='md:hidden'>
              <DateRange
                dateRange={isSync && dateRange[0] ? dateRange : curDateRange}
                setDateRange={handleChangeDateRange}
              />
            </div>
          </div>
        </div>
        <div className='mt-4 flex w-full flex-col self-center sm:max-w-[400px] md:w-full 2xl:max-w-[280px]'>
          <p className='mb-2 font-medium text-primary'>
            {isDeviceClicks ? 'Devices' : 'Social Media'}
          </p>
          <div className='flex w-full items-center space-x-1 rounded-lg border-[0.5px] border-[#7e7e7e] pl-2'>
            <Image
              src='/icons/url/search.svg'
              alt='Twitter icon'
              width={0}
              height={0}
              className='h-4 w-auto'
            />
            <input
              type='text'
              className='w-full rounded-e-lg py-2 text-xs outline-none'
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder='Search'
            />
          </div>
          <div className='mt-3 flex min-h-[168px] flex-col space-y-3'>
            {!isDeviceClicks &&
              socialMeidaList.map((socialMedia, index) => (
                <div
                  key={index}
                  className='flex w-full items-center justify-between px-2'
                >
                  <div className='flex items-center space-x-1'>
                    <div
                      className='h-5 w-5 rounded-full'
                      style={{ backgroundColor: socialMedia.color }}
                    />
                    <p className='font-medium'>{socialMedia.name}</p>
                  </div>
                  <p className='font-medium text-[#999999]'>
                    {socialMedia.clicks} Clicks
                  </p>
                </div>
              ))}
            {isDeviceClicks &&
              deviceList.map((device, index) => (
                <div
                  key={index}
                  className='flex w-full items-center justify-between px-2'
                >
                  <div className='flex items-center space-x-1'>
                    <div
                      className='h-5 w-5 rounded-full'
                      style={{ backgroundColor: device.color }}
                    />
                    <p className='font-medium'>{device.name}</p>
                  </div>
                  <p className='font-medium text-[#999999]'>
                    {device.clicks} Clicks
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClickStatisticCard;
