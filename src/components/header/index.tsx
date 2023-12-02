import React from 'react';

import { useQueryFeatureFlags } from '@/hooks/useQueryFeatureFlags';

function Header() {
  const { data: featureFlags } = useQueryFeatureFlags();

  if (featureFlags && featureFlags['NO_ONE_ALLOWED'])
    return <div>HEADER ON</div>;

  return <div>HEADER OFF</div>;
}

export default Header;
