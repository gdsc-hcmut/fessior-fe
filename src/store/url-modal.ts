import { create } from 'zustand';

import { MyUrl, MyUrlv1 } from '@/types/url-type';

type UrlModalStore = {
  isShow: {
    delete: boolean;
    edit: boolean;
    category: boolean;
    enable: boolean;
  };
  setShowEditModal: (value: boolean) => void;
  setShowDeleteModal: (value: boolean) => void;
  setShowCategoryModal: (value: boolean) => void;
  setShowEnableModal: (value: boolean) => void;
  editedUrl: MyUrlv1;
  setEditedUrl: (url: MyUrlv1) => void;
  deleteUrl: string;
  setDeleteUrl: (urlId: string) => void;
  demoEnable: boolean;
  setDemoEnable: (value: boolean) => void;
};

export const useUrlModalStore = create<UrlModalStore>((set) => ({
  isShow: {
    delete: false,
    edit: false,
    category: false,
    enable: false,
  },
  editedUrl: {
    _id: '',
    originalUrl: '',
    slug: '',
    domain: '',
    organizationId: '',
    createdBy: '',
    updatedBy: '',
    createdAt: '',
    updatedAt: '',
    isActive: false,
    clickCount: 0,
    categories: [],
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
  setShowEnableModal: (value) =>
    set((state) => ({
      isShow: {
        ...state.isShow,
        enable: value,
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
  demoEnable: true,
  setDemoEnable: (value) =>
    set((state) => ({
      demoEnable: value,
    })),
}));
