import { useQuery } from '@tanstack/react-query';

import meService from '@/libs/api/me';

export function useQueryMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => meService.getMe(),
    refetchOnWindowFocus: true,
  });
}
