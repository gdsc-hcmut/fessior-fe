import { create } from 'zustand';

import { MyUrl } from '@/types/url-type';

type UrlModalState = {
  isShow: {
    delete: boolean;
    edit: boolean;
    category: boolean;
  };
  editedUrl: MyUrl;
};

type UrlModalStore = {
  setShowEditModal: (value: boolean) => void;
  setShowDeleteModal: (value: boolean) => void;
  setShowCategoryModal: (value: boolean) => void;
  setEditedUrl: (url: MyUrl) => void;
} & UrlModalState;

export const initialState: UrlModalState = {
  isShow: {
    delete: false,
    edit: false,
    category: false,
  },
  editedUrl: {
    originalUrl: '',
    slug: '',
    domain: '',
    totalClicks: 0,
    enable: false,
    createdAt: '',
    category: [],
  },
};

export const useUrlModalStore = create<UrlModalStore>((set) => ({
  ...initialState,
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
  setEditedUrl: (url) =>
    set((_state) => ({
      editedUrl: url,
    })),
}));
