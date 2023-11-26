import { create } from 'zustand';

/*
 * template for creating a new store
 */

type StoreType = {
  store: number | null;
  setStore: (value: number | null) => void;
};

export const useStore = create<StoreType>((set) => ({
  store: null,
  setStore: (value) => set(() => ({ store: value })),
}));
