import { clsx } from 'clsx';
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
  width?: 'fit' | 'full';
  type?: 'positive' | 'neutral' | 'neutral-positive';
  setIsHovering?: (isHovering: boolean) => void;
  tabIndex?: number;
};

export default function Button(props: ButtonProps) {
  const {
    children,
    disabled,
    onClick,
    className,
    width = 'fit',
    type = 'positive',
    setIsHovering,
    tabIndex = 0,
  } = props;

  const buttonClass = clsx(
    width === 'full' && 'w-[100%]',
    disabled
      ? 'bg-royal-300 text-white'
      : type === 'positive'
      ? 'bg-primary text-white hover:bg-primary-darken'
      : type === 'neutral'
      ? 'border-[1px] border-primary bg-white text-primary hover:bg-primary-white'
      : type === 'neutral-positive' &&
        'border-[1px] border-primary bg-white text-primary hover:bg-primary hover:text-white',
    'rounded-[8px] px-[16px] py-[8px] transition-all',
    className,
  );

  return (
    <button
      tabIndex={tabIndex}
      onMouseEnter={() => {
        if (setIsHovering) setIsHovering(true);
      }}
      onMouseLeave={() => {
        if (setIsHovering) setIsHovering(false);
      }}
      disabled={disabled}
      onClick={onClick}
      className={buttonClass}
    >
      {children}
    </button>
  );
}
