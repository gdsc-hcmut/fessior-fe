import { clsx } from 'clsx';

type HomeAvailableToolIndicatorProps = {
  total: number;
  activeIndex: number;
  onClick: (index: number) => void;
  className?: string;
};

export default function HomeAvailableToolIndicator(
  props: HomeAvailableToolIndicatorProps,
) {
  const { total, activeIndex, className, onClick } = props;
  return (
    <div className={clsx('flex', className)}>
      {[...Array(total)].map((_, index) => {
        return (
          <div
            onClick={() => onClick(index)}
            key={index}
            className={clsx(
              activeIndex === index
                ? 'w-[80px] rounded-[20px]'
                : 'w-[8px] rounded-full',
              'me-[6px] h-[8px] bg-primary',
            )}
          ></div>
        );
      })}
    </div>
  );
}
