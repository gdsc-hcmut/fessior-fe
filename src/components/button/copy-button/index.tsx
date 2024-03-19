import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type CopyButtonProps = {
  onClick: () => void;
};

export default function CopyButton(props: CopyButtonProps) {
  const { onClick } = props;

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied)
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
  }, [isCopied]);

  const copyButtonClass = clsx(
    'border-[1px] border-primary transition-all rounded-[8px] px-[8px] py-[8px]',
    isCopied ? 'bg-primary' : 'hover:bg-primary-white bg-white',
  );

  return (
    <button
      onClick={() => {
        if (!isCopied) onClick();
        setIsCopied(true);
      }}
      className={copyButtonClass}
    >
      <Image
        src={
          isCopied
            ? '/icons/shorten/inactive/tick.svg'
            : '/icons/shorten/active/content_copy.svg'
        }
        alt='copy'
        height={0}
        width={0}
        className='h-auto w-[25px]'
      />
    </button>
  );
}
