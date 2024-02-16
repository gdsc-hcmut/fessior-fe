import { useLayoutEffect, useState } from 'react';

export const useIsOverflow = (
  ref: React.MutableRefObject<HTMLElement | null>,
) => {
  const [isOverflow, setIsOverflow] = useState<boolean>(false);

  useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      if (!current) {
        return;
      }
      const hasOverflow = current.scrollHeight > current.clientHeight;

      setIsOverflow(hasOverflow);
    };

    if (current) {
      trigger();
    }
  }, [ref]);

  return isOverflow;
};
