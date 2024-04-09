import { useRouter } from 'next/navigation';

import AuthType from '@/types/auth-type-enum';
import { detectOS } from '@/utils/common';

import { useQueryParams } from './useQueryParams';

export function useAuthRouter() {
  const router = useRouter();
  const queryParams = useQueryParams();
  const isMobile = !['windows', 'other'].includes(detectOS());

  if (isMobile) {
    return (authType?: AuthType, isDirectedFromLogin?: boolean) => {
      if (authType === AuthType.BACK) router.back();
      router.push(
        authType
          ? `/auth/${authType}${isDirectedFromLogin ? '?from_login=true' : ''}`
          : '/',
      );
    };
  } else {
    return (
      authType?: AuthType,
      isDirectedFromLogin?: boolean,
      newPath?: string,
    ) => {
      if (authType === AuthType.BACK) router.back();
      authType
        ? queryParams.setItem(
            {
              auth: authType,
              from_login: isDirectedFromLogin ? 'true' : undefined,
            },
            newPath,
          )
        : queryParams.removeItem(['auth', 'from_login'], newPath);
    };
  }
}
