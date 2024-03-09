import { clsx } from 'clsx';
import { ReactNode } from 'react';

type ButtonProps = {
  children: string | ReactNode;
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
      ? 'bg-primary text-white hover:bg-primary-darken active:bg-primary'
      : 'border-[1px] border-primary bg-white text-primary hover:bg-primary hover:text-white active:bg-primary-darken',
    'rounded-[8px] px-[16px] py-[8px] transition-all',
    className,
  );

  return (
    <button disabled={disabled} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}
