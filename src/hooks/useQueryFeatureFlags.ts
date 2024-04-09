import { useQuery } from '@tanstack/react-query';

import { getFeatureFlags } from '@/libs/api/feature-flags';

export default function useQueryFeatureFlags() {
  return useQuery({
    queryKey: ['feature-flags'],
    queryFn: () => getFeatureFlags(),
    refetchOnWindowFocus: true,
  });
}
