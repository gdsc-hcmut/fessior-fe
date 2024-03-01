import { create } from 'zustand';

import { MyUrl } from '@/types/url-type';

type UrlModalStore = {
  isShow: {
    delete: boolean;
    edit: boolean;
    category: boolean;
  };
  setShowEditModal: (value: boolean) => void;
  setShowDeleteModal: (value: boolean) => void;
  setShowCategoryModal: (value: boolean) => void;
  editedUrl: MyUrl;
  setEditedUrl: (url: MyUrl) => void;
  deleteUrl: string;
  setDeleteUrl: (urlId: string) => void;
};

export const useUrlModalStore = create<UrlModalStore>((set) => ({
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
  deleteUrl: '',
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
    set((state) => ({
      editedUrl: url,
    })),
  setDeleteUrl: (urlId) =>
    set((state) => ({
      deleteUrl: urlId,
    })),
}));
