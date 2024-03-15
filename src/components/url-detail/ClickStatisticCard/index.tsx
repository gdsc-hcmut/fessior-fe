import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

import { PieChartData } from '@/types/url-type';

import DateRange from '../DateRange';

const demoSocialMedia = [
  {
    name: 'Facebook',
    clicks: 23,
    color: '#4285f4',
  },
  {
    name: 'Messenger',
    clicks: 123,
    color: '#0F9D58',
  },
  {
    name: 'Youtube',
    clicks: 45,
    color: '#db4437',
  },
  {
    name: 'Instagram',
    clicks: 34,
    color: '#fbbc04',
  },
  {
    name: 'X',
    clicks: 56,
    color: '#F28500',
  },
];
const demoDevice = [
  {
    name: 'Android',
    clicks: 23,
    color: '#4285f4',
  },
  {
    name: 'iOS',
    clicks: 123,
    color: '#0F9D58',
  },
  {
    name: 'Windows',
    clicks: 45,
    color: '#db4437',
  },
  {
    name: 'Mac',
    clicks: 34,
    color: '#fbbc04',
  },
  {
    name: 'Linux',
    clicks: 56,
    color: '#F28500',
  },
];
const piechartData = [
  {
    name: 'Group A',
    value: 240,
  },
  {
    name: 'Group B',
    value: 45,
  },
  {
    name: 'Group C',
    value: 139,
  },
  {
    name: 'Group D',
    value: 98,
  },
  {
    name: 'Group E',
    value: 44,
  },
];
type PiechartProps = {
  data: PieChartData[];
};

function ShowPieChart(props: PiechartProps) {
  const { data } = props;

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart>
        <Pie
          data={data}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          innerRadius={40}
          outerRadius={60}
          fill='#0B2878'
          className='text-base'
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

function ClickStatisticCard() {
  const [isDeviceClicks, setIsDeviceClicks] = useState(true);
  const [socialMeidaList, setSocialMediaList] = useState(demoSocialMedia);
  const [deviceList, setDeviceList] = useState(demoDevice);
  const [searchText, setSearchText] = useState('');

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
    <div className='relative z-[5] flex w-full flex-col items-center justify-between rounded-lg bg-white px-5 pb-5 shadow-[0_2px_4px_0_rgba(11,40,120,0.25)]'>
      <div className='mb-6 flex space-x-6 self-start'>
        <button
          onClick={() => setIsDeviceClicks(true)}
          className={clsx(
            'pt-5 font-semibold',
            isDeviceClicks && 'border-t-[1px] border-primary text-primary',
          )}
        >
          Clicks from Devices
        </button>
        <button
          onClick={() => setIsDeviceClicks(false)}
          className={clsx(
            'pt-5 font-semibold',
            !isDeviceClicks && 'border-t-[1px] border-primary text-primary',
          )}
        >
          Clicks from Social Media
        </button>
      </div>
      <div className='flex h-[180px] w-full items-center justify-center'>
        <ShowPieChart data={piechartData} />
      </div>
      <div className='mt-5 flex items-center space-x-3'>
        <p className='font-semibold text-primary'>231 Clicks</p>
        <DateRange />
      </div>
      <div className='mt-4 flex w-full flex-col'>
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
            className='w-full py-2 text-xs outline-none'
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
  );
}

export default ClickStatisticCard;
