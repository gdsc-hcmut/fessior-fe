'use client';
import { clsx } from 'clsx';
import Image from 'next/image';
import { ReactNode, useState } from 'react';

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  image?: string;
  imageOnHover?: string;
  imageAlt?: string;
  imageSizeWidth?: number;
  imageSizeHeight?: number;
  onClick: () => void;
  className?: string;
  width?: 'fit' | 'full';
  type?: 'positive' | 'neutral' | 'neutral-positive';
  setIsHovering?: (isHovering: boolean) => void;
};

export default function Button(props: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const {
    children,
    disabled,
    onClick,
    image,
    imageOnHover,
    imageAlt,
    imageSizeWidth,
    imageSizeHeight,
    className,
    width = 'fit',
    type = 'positive',
    setIsHovering,
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
      {image &&
      imageAlt &&
      imageSizeWidth &&
      imageSizeHeight &&
      imageOnHover ? (
        <div className='transition-all'>
          <Image
            src={isHovered ? imageOnHover : image}
            alt={imageAlt}
            width={imageSizeWidth}
            height={imageSizeHeight}
            className='pr-2'
          />
        </div>
      ) : null}
      {children}
    </button>
  );
}
