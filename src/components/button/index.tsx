import { clsx } from 'clsx';

type ButtonProps = {
  children: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  width?: 'fit' | 'full';
};

export default function Button(props: ButtonProps) {
  const { children, disabled, onClick, className, width = 'fit' } = props;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        width === 'full' && 'w-[100%]',
        disabled ? 'bg-disabled' : 'bg-primary',
        'mt-[12px] rounded-[8px] px-[16px] py-[8px] text-white md:ms-[12px] md:mt-[34px]',
        className,
      )}
    >
      {children}
    </button>
  );
}
