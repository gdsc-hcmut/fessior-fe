import { useRouter } from 'next/navigation';

import { detectOS } from '@/utils/common';

import useQueryParams from './useQueryParams';

export default function useAuthRouter() {
  const router = useRouter();
  const queryParams = useQueryParams();
  const isMobile = !['windows', 'other'].includes(detectOS());

  if (isMobile) {
    return (authType?: string) => {
      if (authType === '') {
        location.reload();
        return;
      }
      router.replace(authType ? `/auth/${authType}` : '/');
    };
  } else {
    return (authType?: string) => {
      if (authType === '') {
        location.reload();
        return;
      }
      authType
        ? queryParams.setItem({ auth: authType })
        : queryParams.removeItem('auth');
    };
  }
}
