import { RefObject } from 'react';

import { useEventListener } from './useEventListener';

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  eventHandler: (event: Event) => void,
) {
  useEventListener('click', (e: Event) => {
    if (ref?.current && !ref.current.contains(e.target as Node)) {
      eventHandler(e);
    }
  });
}
