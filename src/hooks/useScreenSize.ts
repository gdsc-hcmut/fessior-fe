import { useState, useEffect } from 'react';

import useEventListener from './useEventListener';

import { ScreenSize } from '@/types';

export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState<ScreenSize | null>(null);
  /* eslint-disable-next-line */
  const [loaded, setLoaded] = useState(false);

  const setSize = () => {
    if (window.matchMedia('(max-width: 759px)').matches) {
      setScreenSize(ScreenSize.SM);
    } else if (window.matchMedia('(max-width: 959px)').matches) {
      setScreenSize(ScreenSize.MD);
    } else {
      setScreenSize(ScreenSize.LG);
    }
    setLoaded(true);
  };

  useEventListener('resize', setSize);

  useEffect(setSize, []);

  return { screenSize, loaded };
}
