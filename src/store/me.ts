import { create } from 'zustand';

type UserProfileStore = {
  curOrganizationId: string;
  setCurOrganizationId: (value: string) => void;
};

export const useUserProfileStore = create<UserProfileStore>((set) => ({
  curOrganizationId: '',
  setCurOrganizationId: (value) => set(() => ({ curOrganizationId: value })),
}));
