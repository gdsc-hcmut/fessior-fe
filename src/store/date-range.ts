import { create } from 'zustand';

type DateRangeOptionStore = {
  isSync: boolean;
  dateRange: [Date | null, Date | null];
  setIsSync: (value: boolean) => void;
  setDateRange: (value: [Date | null, Date | null]) => void;
};

export const useDateRangeStore = create<DateRangeOptionStore>((set) => ({
  isSync: false,
  dateRange: [null, null],
  setIsSync: (value) => set(() => ({ isSync: value })),
  setDateRange: (value) => set(() => ({ dateRange: value })),
}));
