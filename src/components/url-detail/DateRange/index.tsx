import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

export default DateRange;
