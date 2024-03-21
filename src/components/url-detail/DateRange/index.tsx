import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type DateRangeProps = {
  dateRange: [Date | null, Date | null];
  setDateRange: (value: [Date | null, Date | null]) => void;
};

function DateRange(props: DateRangeProps) {
  const { dateRange, setDateRange } = props;
  const [startDate, endDate] = dateRange;

  const handleDateChange = (update: [Date | null, Date | null]) => {
    setDateRange(update);
  };
  return (
    <DatePicker
      className='rounded-lg border-[1px] border-[#7E7E7E] px-2 py-1 text-xs 2xl:text-base'
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={handleDateChange}
      clearButtonClassName='after:!bg-primary'
      isClearable={true}
    />
  );
}

export default DateRange;
