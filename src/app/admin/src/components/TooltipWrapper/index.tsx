import clsx from 'clsx';
import { ReactNode } from 'react';

import Position from '../../types/position';

type TooltipWrapperProps = {
  children: ReactNode;
  tooltipText: string;
  isDisabled?: boolean;
  className?: string;
  position?: Position;
};

export default function TooltipWrapper(props: TooltipWrapperProps) {
  const {
    children,
    tooltipText,
    isDisabled,
    className,
    position = Position.BOTTOM,
  } = props;

  const wrapperClass = clsx('relative group', className);
  const tooltipClass = clsx(
    'absolute z-[1] ms-[4px] hidden max-w-[800px] whitespace-nowrap rounded-[8px] bg-black p-[8px] text-white group-hover:block',
    position === Position.TOP && 'left-[50%] bottom-[120%] translate-x-[-50%]',
    position === Position.BOTTOM && 'left-[50%] top-[120%] translate-x-[-50%]',
    position === Position.LEFT && 'top-[50%] right-[120%] translate-y-[-50%]',
    position === Position.RIGHT && 'top-[50%] left-[120%] translate-y-[-50%]',
  );

  if (isDisabled) return children;

  return (
    <div className={wrapperClass}>
      {children}
      <p className={tooltipClass}>{tooltipText}</p>
    </div>
  );
}
