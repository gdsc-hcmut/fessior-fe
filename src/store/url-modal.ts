import { create } from 'zustand';

type UrlModalStore = {
  isShow: {
    delete: boolean;
    edit: boolean;
  };
  setShowEditModal: (value: boolean) => void;
  setShowDeleteModal: (value: boolean) => void;
};

export const useUrlModalStore = create<UrlModalStore>((set) => ({
  isShow: {
    delete: false,
    edit: false,
  },
  setShowEditModal: (value) =>
    set((state) => ({
      isShow: {
        ...state.isShow,
        edit: value,
      },
    })),
  setShowDeleteModal: (value) =>
    set((state) => ({
      isShow: {
        ...state.isShow,
        delete: value,
      },
    })),
}));
