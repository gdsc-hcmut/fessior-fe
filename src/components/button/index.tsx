import { clsx } from 'clsx';
import Image from 'next/image';

type ButtonProps = {
  children: string;
  disabled?: boolean;
  image?: string;
  imageAlt?: string;
  imageSize?: number;
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
    image,
    imageAlt,
    imageSize,
    className,
    width = 'fit',
    type = 'positive',
  } = props;

  const buttonClass = clsx(
    width === 'full' && 'w-[100%]',
    disabled
      ? 'bg-disabled'
      : type === 'positive'
      ? 'bg-primary text-white'
      : 'border-[1px] border-primary bg-white text-primary hover:bg-primary hover:text-white',
    'rounded-[8px] px-[16px] py-[8px] transition-all',
    className,
  );
  if (image && imageAlt && imageSize) {
    return (
      <button disabled={disabled} onClick={onClick} className={buttonClass}>
        <Image
          src={image}
          alt={imageAlt}
          width={imageSize}
          height={imageSize}
          className='pr-1'
        />
        {children}
      </button>
    );
  } else
    return (
      <button disabled={disabled} onClick={onClick} className={buttonClass}>
        {children}
      </button>
    );
}
