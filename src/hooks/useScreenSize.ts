import { useState, useEffect } from 'react';

import useEventListener from '@/hooks/useEventListener';
import ScreenSize from '@/types/screen-size-enum';

export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState<ScreenSize | null>(null);
  const [loaded, setLoaded] = useState(false);

  const setSize = () => {
    if (window.innerWidth < 768) {
      setScreenSize(ScreenSize.SM);
    } else if (window.innerWidth < 1200) {
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
