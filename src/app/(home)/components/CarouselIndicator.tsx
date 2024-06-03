import { clsx } from 'clsx';
import { useCallback } from 'react';

type CarouselIndicatorProps = {
  total: number;
  activeIndex: number;
  onClick: (index: number) => void;
  className?: string;
};

export default function CarouselIndicator({ total, activeIndex, className, onClick }: CarouselIndicatorProps) {
  const getIndicatorClass = useCallback(
    (isActive: boolean) => clsx(isActive ? 'w-20 rounded-3xl' : 'w-2 rounded-full', 'me-1.5 h-2 bg-primary'),
    [],
  );

  return (
    <div className={clsx('flex', className)}>
      {[...Array(total)].map((_, index) => {
        return (
          <div onClick={() => onClick(index)} key={index} className={getIndicatorClass(index === activeIndex)}></div>
        );
      })}
    </div>
  );
}
