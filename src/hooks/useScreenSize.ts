import { useState, useEffect } from 'react';

import useEventListener from './useEventListener';

export default function useScreenSize() {
  const [screenSize, setScreenSize] = useState<'sm' | 'md' | 'lg' | null>(null);
  const [loaded, setLoaded] = useState(false);

  const setSize = () => {
    if (window.innerWidth <= 768) {
      setScreenSize('sm');
    } else if (window.innerWidth <= 1300) {
      setScreenSize('md');
    } else {
      setScreenSize('lg');
    }
    setLoaded(true);
  };

  useEventListener('resize', setSize);

  useEffect(setSize, []);

  return { screenSize, loaded };
}
