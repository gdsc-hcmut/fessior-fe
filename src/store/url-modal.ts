import { create } from 'zustand';

type UrlModalStore = {
  isShow: {
    delete: boolean;
    edit: boolean;
    category: boolean;
  };
  setShowEditModal: (value: boolean) => void;
  setShowDeleteModal: (value: boolean) => void;
  setShowCategoryModal: (value: boolean) => void;
};

export const useUrlModalStore = create<UrlModalStore>((set) => ({
  isShow: {
    delete: false,
    edit: false,
    category: false,
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
  setShowCategoryModal: (value) =>
    set((state) => ({
      isShow: {
        ...state.isShow,
        category: value,
      },
    })),
}));
