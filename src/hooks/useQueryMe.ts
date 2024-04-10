import { useQuery } from '@tanstack/react-query';

import { meService } from '@/services';

export default function useQueryMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => meService.getMe(),
    refetchOnWindowFocus: true,
  });
}
