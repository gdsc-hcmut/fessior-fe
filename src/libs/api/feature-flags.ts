import api from './shared/client';
import { FeatureFlagsResponse } from './types/feature-flags-response';

export function getFeatureFlags(): Promise<FeatureFlagsResponse> {
  return api
    .get('v1/api/me/feature-flags')
    .then((res) => {
      return res.data.payload;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
}
