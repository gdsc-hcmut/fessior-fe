import { clsx } from 'clsx';
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
  width?: 'fit' | 'full';
  type?: 'positive' | 'neutral';
};

export default function Button(props: ButtonProps) {
  const {
    children,
    disabled,
    onClick,
    className,
    width = 'fit',
    type = 'positive',
  } = props;

  const buttonClass = clsx(
    width === 'full' && 'w-[100%]',
    disabled
      ? 'bg-royal-300 text-white'
      : type === 'positive'
      ? 'bg-primary text-white'
      : 'border-[1px] border-primary bg-white text-primary hover:bg-primary hover:text-white',
    'rounded-[8px] px-[16px] py-[8px] transition-all',
    className,
  );

  return (
    <button disabled={disabled} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}
