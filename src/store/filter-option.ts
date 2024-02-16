import { create } from 'zustand';

type FilterOptionStore = {
  filterDomain: string[];
  filterCategory: string[];
  setFilterDomain: (value: string[]) => void;
  setFilterCategory: (value: string[]) => void;
};

export const useFilterOptionStore = create<FilterOptionStore>((set) => ({
  filterCategory: [],
  filterDomain: [],
  setFilterDomain: (value) => set(() => ({ filterDomain: value })),
  setFilterCategory: (value) => set(() => ({ filterCategory: value })),
}));
