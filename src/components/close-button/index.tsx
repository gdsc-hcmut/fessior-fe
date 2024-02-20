import { clsx } from 'clsx';
import Image from 'next/image';

type CloseButtonProps = {
  onClick: () => void;
  className?: string;
  shape?: 'square' | 'round';
};

export default function CloseButton(props: CloseButtonProps) {
  const { onClick, className, shape = 'round' } = props;

  const closeButtonClass = clsx(
    'aspect-square bg-white p-[8px] hover:cursor-pointer',
    shape === 'round'
      ? 'rounded-full'
      : 'rounded-[8px] border-[1px] border-primary',
    className,
  );

  return (
    <button onClick={onClick} className={closeButtonClass}>
      <Image
        src='/icons/auth/close_royal.svg'
        alt='close'
        width={0}
        height={0}
        className='aspect-square w-[100%]'
      />
    </button>
  );
}
